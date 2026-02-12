export interface PolicyReviewData {
  step1?: {
    name: string;
    dateOfBirth: string;
  };

  step2?: {
    policyPurchaseDate: string;
  };

  step3?: {
    selectedPolicy: string;
  };

  step4?: {
  basicSumAssured?: string;
  policyTerm?: string;
  premiumPayingTerm?: string;
  premiumAmount?: string;
  premiumFrequency?: string;
  premiumType?: string;   // ✅ ADD THIS
};

}
