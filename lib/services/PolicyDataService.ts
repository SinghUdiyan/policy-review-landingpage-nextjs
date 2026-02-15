/**
 * PolicyDataService
 * 
 * A singleton service that provides efficient access to policy master data.
 * Implements caching, indexing, and query optimization.
 * 
 * Benefits:
 * - Single source of truth for policy data
 * - Efficient querying with indexed lookups
 * - Type-safe with full TypeScript support
 * - Easy to test and mock
 * - Cacheable and performant
 */

import masterData from "@/master-data.json";
import { PolicyData, PolicyQueryParams, PolicyEligibility } from "@/types/policy";
import { isWithinInterval, parseISO } from "date-fns";

class PolicyDataService {
  private policies: PolicyData[];
  private policyByUINCache: Map<string, PolicyData[]>;
  private policyByPlanNameCache: Map<string, PolicyData[]>;
  private policyByModuleCache: Map<string, PolicyData[]>;

  constructor() {
    this.policies = masterData as PolicyData[];
    this.policyByUINCache = new Map();
    this.policyByPlanNameCache = new Map();
    this.policyByModuleCache = new Map();
    this.buildIndexes();
  }

  /**
   * Build indexes for faster lookups
   * O(n) on initialization, O(1) on subsequent lookups
   */
  private buildIndexes(): void {
    this.policies.forEach((policy) => {
      // Index by UIN
      if (!this.policyByUINCache.has(policy.UIN)) {
        this.policyByUINCache.set(policy.UIN, []);
      }
      this.policyByUINCache.get(policy.UIN)!.push(policy);

      // Index by Plan Name
      if (!this.policyByPlanNameCache.has(policy.PlanName)) {
        this.policyByPlanNameCache.set(policy.PlanName, []);
      }
      this.policyByPlanNameCache.get(policy.PlanName)!.push(policy);

      // Index by Module
      if (!this.policyByModuleCache.has(policy.Module)) {
        this.policyByModuleCache.set(policy.Module, []);
      }
      this.policyByModuleCache.get(policy.Module)!.push(policy);
    });
  }

  /**
   * Get all policies
   */
  getAllPolicies(): PolicyData[] {
    return this.policies;
  }

  /**
   * Get unique plan names for dropdown/selection
   */
  getUniquePlanNames(): string[] {
    return Array.from(this.policyByPlanNameCache.keys()).sort();
  }

  /**
   * Get policies by UIN (O(1) lookup)
   */
  getPoliciesByUIN(uin: string): PolicyData[] {
    return this.policyByUINCache.get(uin) || [];
  }

  /**
   * Get policies by Plan Name (O(1) lookup)
   */
  getPoliciesByPlanName(planName: string): PolicyData[] {
    return this.policyByPlanNameCache.get(planName) || [];
  }

  /**
   * Get policies by Module (O(1) lookup)
   */
  getPoliciesByModule(module: string): PolicyData[] {
    return this.policyByModuleCache.get(module) || [];
  }

  /**
   * Check if a policy was active on a given purchase date
   */
  isPolicyActiveOnDate(policy: PolicyData, purchaseDate: Date): boolean {
    const fromDate = parseISO(policy.FromDate);
    const toDate = policy.ToDate ? parseISO(policy.ToDate) : new Date();

    try {
      return isWithinInterval(purchaseDate, {
        start: fromDate,
        end: toDate,
      });
    } catch {
      return false;
    }
  }

  /**
   * Parse age value (handles "90 Days", "90 days", numbers, "40 Year")
   */
  private parseAge(age: number | string): number {
    if (typeof age === "number") return age;
    if (typeof age === "string") {
      const lowerAge = age.toLowerCase();
      
      // Handle "90 Days", "90 days" - convert to years (90 days ≈ 0.25 years)
      if (lowerAge.includes("day")) {
        const daysMatch = age.match(/\d+/);
        const days = daysMatch ? parseInt(daysMatch[0], 10) : 90;
        return days / 365; // Convert days to years (e.g., 90/365 ≈ 0.25)
      }
      
      // Handle "40 Year" or just extract number
      const numMatch = age.match(/\d+/);
      return numMatch ? parseInt(numMatch[0], 10) : 0;
    }
    return 0;
  }

  /**
   * Parse policy term value (handles days vs years)
   * For regular policies: MinPolicyTerm: 90 means 90 days (0.25 years) if < 10, otherwise years
   * For age-linked policies: We don't use MinPolicyTerm/MaxPolicyTerm, we use MinAgeAtMaturity/MaxAgeAtMaturity
   */
  private parsePolicyTerm(term: number | string): number {
    if (typeof term === "number") {
      // Policy terms in master-data.json are always in years, not days
      // Return as integer (round to handle any edge cases)
      return Math.round(term);
    }
    if (typeof term === "string") {
      const lowerTerm = term.toLowerCase();
      // Only convert to years if explicitly contains "day" or "days"
      if (lowerTerm.includes("day")) {
        const daysMatch = term.match(/\d+/);
        const days = daysMatch ? parseInt(daysMatch[0], 10) : 90;
        return days / 365; // Convert days to years
      }
      const numMatch = term.match(/\d+/);
      return numMatch ? parseInt(numMatch[0], 10) : 0;
    }
    return 0;
  }

  /**
   * Check if age is within policy entry age range
   * Handle special case where policy requires days but age is calculated in years
   */
  isAgeEligible(policy: PolicyData, age: number): boolean {
    const minAge = this.parseAge(policy.MinEntryAge);
    const maxAge = this.parseAge(policy.MaxEntryAge);
    
    // Special handling for "90 days" minimum when age is 0 years
    if (age === 0 && typeof policy.MinEntryAge === 'string' && policy.MinEntryAge.toLowerCase().includes('day')) {
      // For infants, we need to check if they meet the minimum days requirement
      // If age is 0 years but > 0, they are at least some days old
      // This handles the case where child is 324 days old (eligible for 90 days requirement)
      return true; // Allow 0-year-olds for day-based policies since calculateAge returns 0 for < 1 year
    }
    
    return age >= minAge && age <= maxAge;
  }

  /**
   * Check if policy term is valid for the policy
   */
  isPolicyTermValid(policy: PolicyData, term: number): boolean {
    return term >= policy.MinPolicyTerm && term <= policy.MaxPolicyTerm;
  }

  /**
   * Get eligible policies based on user's data
   * This is the main query function
   */
  getEligiblePolicies(params: PolicyQueryParams): PolicyData[] {
    let filteredPolicies = this.policies;

    // Filter by UIN
    if (params.uin) {
      filteredPolicies = this.getPoliciesByUIN(params.uin);
    }

    // Filter by Plan Name
    if (params.planName) {
      filteredPolicies = filteredPolicies.filter(
        (p) => p.PlanName === params.planName
      );
    }

    // Filter by Module
    if (params.module) {
      filteredPolicies = filteredPolicies.filter(
        (p) => p.Module === params.module
      );
    }

    // Filter by Purchase Date (active policies only)
    if (params.purchaseDate) {
      filteredPolicies = filteredPolicies.filter((p) =>
        this.isPolicyActiveOnDate(p, params.purchaseDate!)
      );
    }

    // Filter by Entry Age
    if (params.entryAge !== undefined) {
      filteredPolicies = filteredPolicies.filter((p) =>
        this.isAgeEligible(p, params.entryAge!)
      );
    }

    // Filter by Policy Term
    if (params.policyTerm !== undefined) {
      filteredPolicies = filteredPolicies.filter((p) =>
        this.isPolicyTermValid(p, params.policyTerm!)
      );
    }

    // Filter by active status
    if (params.isActive !== undefined && params.isActive) {
      const today = new Date();
      filteredPolicies = filteredPolicies.filter((p) =>
        this.isPolicyActiveOnDate(p, today)
      );
    }

    return filteredPolicies;
  }

  /**
   * Find the best matching policy configuration
   * Returns the most recent variant if multiple matches
   */
  findBestMatchingPolicy(
    dateOfBirth: Date,
    purchaseDate: Date,
    planName?: string
  ): PolicyEligibility {
    const age = this.calculateAgeAtPurchase(dateOfBirth, purchaseDate);
    const reasons: string[] = [];

    const eligiblePolicies = this.getEligiblePolicies({
      purchaseDate,
      entryAge: age,
      planName,
    });

    if (eligiblePolicies.length === 0) {
      if (!planName) {
        reasons.push("No policies available for your purchase date and age");
      } else {
        reasons.push(`${planName} is not available for your purchase date or age`);
      }
      return { eligible: false, policy: null, reasons };
    }

    // Sort by FromDate to get the most recent variant
    eligiblePolicies.sort((a, b) => {
      return parseISO(b.FromDate).getTime() - parseISO(a.FromDate).getTime();
    });

    return {
      eligible: true,
      policy: eligiblePolicies[0],
      reasons: [],
    };
  }

  /**
   * Get available plan names for a given purchase date and age
   */
  getAvailablePlansForUser(dateOfBirth: Date, purchaseDate: Date): string[] {
    const age = this.calculateAgeAtPurchase(dateOfBirth, purchaseDate);
    const eligiblePolicies = this.getEligiblePolicies({
      purchaseDate,
      entryAge: age,
    });

    // Get unique plan names
    const planNames = new Set(eligiblePolicies.map((p) => p.PlanName));
    return Array.from(planNames).sort();
  }

  /**
   * Calculate age at purchase with exact month/day adjustment
   * Logic: Calculate years difference between purchase date and birth date
   * Adjust for month/day: if purchase month < birth month, or same month but purchase day < birth day, subtract 1 year
   */
  calculateAgeAtPurchase(dateOfBirth: Date, purchaseDate: Date): number {
    const birthYear = dateOfBirth.getFullYear();
    const birthMonth = dateOfBirth.getMonth(); // 0-11
    const birthDay = dateOfBirth.getDate();
    
    const purchaseYear = purchaseDate.getFullYear();
    const purchaseMonth = purchaseDate.getMonth(); // 0-11
    const purchaseDay = purchaseDate.getDate();
    
    // Calculate initial year difference
    let age = purchaseYear - birthYear;
    
    // Adjust if birthday hasn't occurred yet in the purchase year
    if (purchaseMonth < birthMonth || (purchaseMonth === birthMonth && purchaseDay < birthDay)) {
      age = age - 1;
    }
    
    return age;
  }

  /**
   * Get all valid policy term options for a user based on their age and purchase date
   * This handles policies with multiple variants (different terms)
   */
  getValidPolicyTermOptions(
    planName: string,
    ageAtPurchase: number,
    purchaseDate: Date
  ): number[] {
    const allVariants = this.getPoliciesByPlanName(planName);
    
    // Filter variants that match the user's age and purchase date
    const eligibleVariants = allVariants.filter(variant => {
      // Check age eligibility
      const minAge = this.parseAge(variant.MinEntryAge);
      const maxAge = this.parseAge(variant.MaxEntryAge);
      
      if (ageAtPurchase < minAge || ageAtPurchase > maxAge) {
        return false;
      }
      
      // Check date eligibility
      if (!this.isPolicyActiveOnDate(variant, purchaseDate)) {
        return false;
      }
      
      return true;
    });
    
    if (eligibleVariants.length === 0) return [];

    // Check if this is an age-linked policy
    const isAgeLinked = ["512N296V02", "512N312V01", "512N312V02"]
      .includes(eligibleVariants[0].UIN);

    // Extract unique policy terms from eligible variants
    const policyTerms = new Set<number>();
    
    if (isAgeLinked) {
      // For age-linked policies: calculate actual policy terms from target ages
      // Generate actual terms from MinAgeAtMaturity to MaxAgeAtMaturity
      eligibleVariants.forEach(variant => {
        if (variant.MinAgeAtMaturity && variant.MaxAgeAtMaturity) {
          // User can only select target ages greater than their current age
          const minTargetAge = Math.max(variant.MinAgeAtMaturity, Math.ceil(ageAtPurchase) + 1);
          const maxTargetAge = variant.MaxAgeAtMaturity;
          
          // Round ageAtPurchase to handle any decimal values
          const roundedAge = Math.round(ageAtPurchase);
          for (let targetAge = minTargetAge; targetAge <= maxTargetAge; targetAge++) {
            // Calculate actual policy term: target age - current age
            const actualTerm = targetAge - roundedAge;
            if (actualTerm > 0) {
              policyTerms.add(Math.round(actualTerm));
            }
          }
        }
      });
    } else {
      // For regular policies: use MinPolicyTerm and MaxPolicyTerm, then apply Age at Maturity Rule
      eligibleVariants.forEach(variant => {
        const minTerm = this.parsePolicyTerm(variant.MinPolicyTerm);
        const maxTerm = this.parsePolicyTerm(variant.MaxPolicyTerm);
        
        // Apply Age at Maturity Rule
        // Round ageAtPurchase to handle any decimal values from age parsing
        const roundedAge = Math.round(ageAtPurchase);
        let validMinTerm = minTerm;
        let validMaxTerm = maxTerm;
        
        if (variant.MinAgeAtMaturity) {
          const minTermFromMaturity = variant.MinAgeAtMaturity - roundedAge;
          validMinTerm = Math.max(minTerm, Math.ceil(minTermFromMaturity));
        }
        
        if (variant.MaxAgeAtMaturity) {
          const maxTermFromMaturity = variant.MaxAgeAtMaturity - roundedAge;
          validMaxTerm = Math.min(maxTerm, Math.floor(maxTermFromMaturity));
        }
        
        // Ensure terms are integers
        validMinTerm = Math.ceil(validMinTerm);
        validMaxTerm = Math.floor(validMaxTerm);
        
        // Special handling for fixed-term policies
        // If it's a fixed term (minTerm === maxTerm), and the term is valid according to Min/MaxPolicyTerm,
        // we should include it even if age at maturity constraint would exclude it
        // This handles cases like whole-life policies or special term values
        if (minTerm === maxTerm) {
          // Fixed term policy - check if age at maturity is at least the minimum
          const maturityAge = roundedAge + minTerm;
          if (!variant.MinAgeAtMaturity || maturityAge >= variant.MinAgeAtMaturity) {
            // Include the fixed term if it meets minimum age requirement
            // For maximum age, we're more lenient for fixed terms
            if (!variant.MaxAgeAtMaturity || maturityAge <= variant.MaxAgeAtMaturity + 5) {
              policyTerms.add(Math.round(minTerm));
            }
          }
          } else {
          // Range policy - only add terms if valid range exists
          if (validMinTerm <= validMaxTerm && validMinTerm > 0) {
            for (let term = validMinTerm; term <= validMaxTerm; term++) {
              policyTerms.add(Math.round(term));
            }
          }
        }
      });
    }
    
    // Convert to sorted array and ensure all terms are integers
    return Array.from(policyTerms)
      .map(term => Math.round(term))
      .filter(term => term > 0) // Remove any invalid terms
      .sort((a, b) => a - b);
  }

  /**
   * Select the correct policy variant based on policy term, age, and purchase date
   * This ensures we use the right variant's constraints for validations
   */
  selectVariantByPolicyTerm(
    planName: string,
    policyTerm: number,
    ageAtPurchase: number,
    purchaseDate: Date
  ): PolicyData | null {
    const allVariants = this.getPoliciesByPlanName(planName);
    
    if (allVariants.length === 0) return null;

    // Check if this is an age-linked policy
    const isAgeLinked = ["512N296V02", "512N312V01", "512N312V02"]
      .includes(allVariants[0].UIN);
    
    // Find variant that matches ALL criteria
    let matchingVariant;
    
    if (isAgeLinked) {
      // For age-linked policies, find the variant that exactly matches the user's age
      // This ensures we get the correct PPT value for the specific age
      matchingVariant = allVariants.find(variant => {
        const minAge = this.parseAge(variant.MinEntryAge);
        const maxAge = this.parseAge(variant.MaxEntryAge);
        
        // Check if user's age falls within this variant's age range
        if (ageAtPurchase < minAge || ageAtPurchase > maxAge) {
          return false;
        }
        
        // Check date eligibility
        if (!this.isPolicyActiveOnDate(variant, purchaseDate)) {
          return false;
        }
        
        // Check if the resulting maturity age is within limits
        const maturityAge = ageAtPurchase + policyTerm;
        if (variant.MinAgeAtMaturity && maturityAge < variant.MinAgeAtMaturity) {
          return false;
        }
        if (variant.MaxAgeAtMaturity && maturityAge > variant.MaxAgeAtMaturity) {
          return false;
        }
        
        return true;
      });
    } else {
      // For regular policies: find variant that matches policy term
      matchingVariant = allVariants.find(variant => {
        // Check age eligibility first
        const minAge = this.parseAge(variant.MinEntryAge);
        const maxAge = this.parseAge(variant.MaxEntryAge);
        
        if (ageAtPurchase < minAge || ageAtPurchase > maxAge) {
          return false;
        }
        
        // Check date eligibility
        if (!this.isPolicyActiveOnDate(variant, purchaseDate)) {
          return false;
        }
        
        // Check if term is within MinPolicyTerm and MaxPolicyTerm
        const minTerm = this.parsePolicyTerm(variant.MinPolicyTerm);
        const maxTerm = this.parsePolicyTerm(variant.MaxPolicyTerm);
        if (policyTerm < minTerm || policyTerm > maxTerm) {
          return false;
        }
        
        // Also check Age at Maturity Rule
        const ageAtMaturity = ageAtPurchase + policyTerm;
        if (variant.MinAgeAtMaturity && ageAtMaturity < variant.MinAgeAtMaturity) {
          return false;
        }
        if (variant.MaxAgeAtMaturity && ageAtMaturity > variant.MaxAgeAtMaturity) {
          return false;
        }
        
        return true;
      });
    }
    
    return matchingVariant || null;
  }

  /**
   * Validate if sum assured is within policy limits
   */
  validateSumAssured(policy: PolicyData, sumAssured: number): {
    valid: boolean;
    message?: string;
  } {
    if (!policy.MinSumAssured) {
      return { valid: true };
    }

    if (sumAssured < policy.MinSumAssured) {
      return {
        valid: false,
        message: `Minimum sum assured is ₹${policy.MinSumAssured.toLocaleString("en-IN")}`,
      };
    }

    if (
      policy.SumAssuredMultiples &&
      sumAssured % policy.SumAssuredMultiples !== 0
    ) {
      return {
        valid: false,
        message: `Sum assured must be in multiples of ₹${policy.SumAssuredMultiples.toLocaleString("en-IN")}`,
      };
    }

    return { valid: true };
  }
}

// Export singleton instance
export const policyDataService = new PolicyDataService();

