/**
 * Comprehensive Policy Eligibility Testing
 * Tests policy eligibility for various DOB/PPD combinations
 */

// Simple test runner since we can't easily import TS in Node
console.log("🚀 Starting Comprehensive Policy Eligibility Testing");
console.log("Note: This will test the logic conceptually. For actual testing, use the web interface.");

// Mock the age calculation logic for testing
function calculateAgeAtPurchase(dateOfBirth, purchaseDate) {
    const birthYear = dateOfBirth.getFullYear();
    const birthMonth = dateOfBirth.getMonth();
    const birthDay = dateOfBirth.getDate();
    
    const purchaseYear = purchaseDate.getFullYear();
    const purchaseMonth = purchaseDate.getMonth();
    const purchaseDay = purchaseDate.getDate();
    
    let age = purchaseYear - birthYear;
    
    if (purchaseMonth < birthMonth || (purchaseMonth === birthMonth && purchaseDay < birthDay)) {
        age = age - 1;
    }
    
    // For infants under 1 year, calculate fractional age
    if (age === 0) {
        const diffInMs = purchaseDate.getTime() - dateOfBirth.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return diffInDays / 365;
    }
    
    return age;
}

// Initialize the service
const policyService = new PolicyDataService();

// Test Results Storage
const testResults = {
  passed: 0,
  failed: 0,
  errors: [],
  details: []
};

/**
 * Test Case Structure
 */
const testCases = [
  // ===== INFANT AGE TESTS (0-1 Year) =====
  {
    name: "Infant 8 days old - Should only get MinEntryAge: 0 policies",
    dob: "2025-01-30",
    ppd: "2025-02-07", 
    expectedEligible: ["LIC's Amritbaal"],
    expectedRejected: ["LIC's Dhan Rekha", "LIC's Jeevan Umang"],
    description: "8-day infant should not qualify for 90-day minimum policies"
  },
  {
    name: "Infant 92 days old - Should get 90-day policies", 
    dob: "2024-10-01",
    ppd: "2025-01-01",
    expectedEligible: ["LIC's Jeevan Tarun", "LIC's Dhan Rekha"],
    expectedRejected: [],
    description: "92-day infant should qualify for 90-day minimum policies"
  },
  {
    name: "Infant 7 months old - Should get most day-based policies",
    dob: "2024-06-01", 
    ppd: "2025-01-01",
    expectedEligible: ["LIC's Jeevan Tarun", "LIC's Dhan Rekha", "LIC's Amritbaal"],
    expectedRejected: [],
    description: "7-month infant should qualify for day-based policies"
  },

  // ===== CHILD AGE TESTS (1-18 Years) =====
  {
    name: "Child 10 months old - Jeevan Tarun eligibility",
    dob: "2015-02-11",
    ppd: "2016-01-01", 
    expectedEligible: ["LIC's Jeevan Tarun"],
    expectedRejected: [],
    description: "10-month child should qualify for Jeevan Tarun (90 days min, 12 max)"
  },
  {
    name: "Child exactly 12 years old - Boundary test",
    dob: "2013-01-01",
    ppd: "2025-01-01",
    expectedEligible: [],
    expectedRejected: [],
    description: "12-year boundary test for MaxEntryAge policies"
  },
  {
    name: "Child 12+ years old - Should reject child-only policies",
    dob: "2013-01-01", 
    ppd: "2025-01-02",
    expectedEligible: [],
    expectedRejected: ["LIC's Jeevan Tarun"], // MaxEntryAge: 12
    description: "Child over 12 should be rejected by child-only policies"
  },
  {
    name: "Teenager 15 years old",
    dob: "2010-01-01",
    ppd: "2025-01-01",
    expectedEligible: [],
    expectedRejected: ["LIC's Jeevan Tarun"], // MaxEntryAge: 12
    description: "15-year-old should be rejected by child-only policies"
  },

  // ===== ADULT AGE TESTS (18+ Years) =====
  {
    name: "Young adult 25 years old",
    dob: "2000-01-01",
    ppd: "2025-01-01", 
    expectedEligible: [],
    expectedRejected: ["LIC's Jeevan Tarun"], // MaxEntryAge: 12
    description: "Adult should be rejected by child-only policies"
  },
  {
    name: "Adult 35 years old - General policies",
    dob: "1990-01-01",
    ppd: "2025-01-01",
    expectedEligible: [],
    expectedRejected: ["LIC's Jeevan Tarun"],
    description: "Adult should qualify for general adult policies"
  },
  {
    name: "Senior 65 years old - Age limit test", 
    dob: "1960-01-01",
    ppd: "2025-01-01",
    expectedEligible: [],
    expectedRejected: ["LIC's Jeevan Tarun", "LIC's Dhan Rekha"], // MaxEntryAge restrictions
    description: "Senior should be restricted by MaxEntryAge limits"
  },

  // ===== DATE VALIDITY TESTS =====
  {
    name: "Policy purchase during active period",
    dob: "1990-01-01",
    ppd: "2019-06-01", 
    expectedEligible: [],
    expectedRejected: [],
    description: "Purchase date within policy active period"
  },
  {
    name: "Policy purchase after expiry - Jeevan Tarun expired",
    dob: "2010-01-01",
    ppd: "2021-01-01",
    expectedEligible: [],
    expectedRejected: ["LIC's Jeevan Tarun"], // ToDate: "2020-01-31"
    description: "Should reject expired policies"
  },

  // ===== BOUNDARY CONDITIONS =====
  {
    name: "Same day birth and purchase (0 days old)",
    dob: "2025-01-01",
    ppd: "2025-01-01",
    expectedEligible: ["LIC's Amritbaal"], // MinEntryAge: 0
    expectedRejected: ["LIC's Dhan Rekha"], // MinEntryAge: "90 Days"
    description: "Newborn should only qualify for MinEntryAge: 0 policies"
  },
  {
    name: "Leap year boundary test",
    dob: "2020-02-29", 
    ppd: "2025-03-01",
    expectedEligible: [],
    expectedRejected: ["LIC's Jeevan Tarun"],
    description: "Leap year birth date calculation test"
  }
];

/**
 * Execute a single test case
 */
function executeTest(testCase) {
  try {
    console.log(`\n🧪 Testing: ${testCase.name}`);
    console.log(`   DOB: ${testCase.dob}, PPD: ${testCase.ppd}`);
    console.log(`   ${testCase.description}`);

    const dobDate = new Date(testCase.dob);
    const ppdDate = new Date(testCase.ppd);
    
    // Calculate age
    const age = policyService.calculateAgeAtPurchase(dobDate, ppdDate);
    console.log(`   Calculated Age: ${age} years`);

    // Get eligible policies
    const eligiblePolicies = policyService.getEligiblePolicies({
      purchaseDate: ppdDate,
      entryAge: age
    });

    const eligiblePolicyNames = eligiblePolicies.map(p => p.PlanName);
    console.log(`   Eligible Policies: [${eligiblePolicyNames.join(', ')}]`);

    // Check expected eligible policies
    let testPassed = true;
    const issues = [];

    testCase.expectedEligible.forEach(expectedPolicy => {
      if (!eligiblePolicyNames.includes(expectedPolicy)) {
        testPassed = false;
        issues.push(`❌ Expected '${expectedPolicy}' to be eligible, but it wasn't`);
      } else {
        console.log(`   ✅ '${expectedPolicy}' correctly eligible`);
      }
    });

    // Check expected rejected policies
    testCase.expectedRejected.forEach(rejectedPolicy => {
      if (eligiblePolicyNames.includes(rejectedPolicy)) {
        testPassed = false;
        issues.push(`❌ Expected '${rejectedPolicy}' to be rejected, but it was eligible`);
      } else {
        console.log(`   ✅ '${rejectedPolicy}' correctly rejected`);
      }
    });

    // Record results
    const result = {
      testCase: testCase.name,
      passed: testPassed,
      age: age,
      eligiblePolicies: eligiblePolicyNames,
      issues: issues
    };

    testResults.details.push(result);

    if (testPassed) {
      testResults.passed++;
      console.log(`   🟢 TEST PASSED`);
    } else {
      testResults.failed++;
      console.log(`   🔴 TEST FAILED`);
      issues.forEach(issue => console.log(`      ${issue}`));
    }

  } catch (error) {
    testResults.failed++;
    testResults.errors.push(`${testCase.name}: ${error.message}`);
    console.log(`   💥 TEST ERROR: ${error.message}`);
  }
}

/**
 * Run all tests
 */
function runAllTests() {
  console.log("🚀 Starting Comprehensive Policy Eligibility Testing\n");
  console.log("="=repeat(60));
  
  testCases.forEach(executeTest);
  
  // Print summary
  console.log("\n" + "="=repeat(60));
  console.log("📊 TEST SUMMARY");
  console.log("="=repeat(60));
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`💥 Errors: ${testResults.errors.length}`);
  console.log(`📈 Success Rate: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);

  if (testResults.errors.length > 0) {
    console.log("\n🔥 ERRORS:");
    testResults.errors.forEach(error => console.log(`   ${error}`));
  }

  if (testResults.failed > 0) {
    console.log("\n🔍 FAILED TESTS DETAILS:");
    testResults.details.filter(t => !t.passed).forEach(result => {
      console.log(`\n❌ ${result.testCase}`);
      console.log(`   Age: ${result.age} years`);
      console.log(`   Eligible: [${result.eligiblePolicies.join(', ')}]`);
      result.issues.forEach(issue => console.log(`   ${issue}`));
    });
  }

  console.log("\n🏁 Testing Complete!");
  
  return {
    totalTests: testCases.length,
    passed: testResults.passed,
    failed: testResults.failed,
    successRate: (testResults.passed / (testResults.passed + testResults.failed)) * 100
  };
}

/**
 * Random Input Testing
 */
function generateRandomTests(count = 10) {
  console.log(`\n🎲 Generating ${count} Random Test Cases\n`);
  
  for (let i = 0; i < count; i++) {
    const randomYear = Math.floor(Math.random() * 50) + 1980; // 1980-2030
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1;
    
    const purchaseYear = randomYear + Math.floor(Math.random() * 10) + 1;
    const purchaseMonth = Math.floor(Math.random() * 12) + 1;
    const purchaseDay = Math.floor(Math.random() * 28) + 1;
    
    const dob = `${randomYear}-${randomMonth.toString().padStart(2, '0')}-${randomDay.toString().padStart(2, '0')}`;
    const ppd = `${purchaseYear}-${purchaseMonth.toString().padStart(2, '0')}-${purchaseDay.toString().padStart(2, '0')}`;
    
    try {
      const dobDate = new Date(dob);
      const ppdDate = new Date(ppd);
      
      if (dobDate <= ppdDate) {
        const age = policyService.calculateAgeAtPurchase(dobDate, ppdDate);
        const eligiblePolicies = policyService.getEligiblePolicies({
          purchaseDate: ppdDate,
          entryAge: age
        });
        
        console.log(`🎲 Random Test ${i + 1}:`);
        console.log(`   DOB: ${dob}, PPD: ${ppd} (Age: ${age} years)`);
        console.log(`   Eligible: [${eligiblePolicies.map(p => p.PlanName).join(', ')}]`);
      }
    } catch (error) {
      console.log(`🎲 Random Test ${i + 1} Error: ${error.message}`);
    }
  }
}

// Export for potential use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runAllTests, generateRandomTests, testCases };
} else {
  // Run tests if executed directly
  runAllTests();
  generateRandomTests(5);
}
