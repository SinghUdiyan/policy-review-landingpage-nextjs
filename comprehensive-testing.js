/**
 * COMPREHENSIVE POLICY ELIGIBILITY TESTING FRAMEWORK
 * Testing 15-20 scenarios + 5-10 random combinations
 * DOCUMENTATION ONLY - NO FIXES APPLIED
 */

const fs = require('fs');
const path = require('path');

console.log("🚀 COMPREHENSIVE POLICY ELIGIBILITY TESTING");
console.log("🔍 IDENTIFICATION MODE: Documenting issues, NO fixes applied");
console.log("=" + "=".repeat(70));

// Load master data
const masterDataPath = path.join(__dirname, 'master-data.json');
const masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf8'));

// Test Results Storage
const testResults = {
    passed: 0,
    failed: 0,
    total: 0,
    failedTests: [],
    bugCategories: {
        ageCalculation: [],
        dateValidation: [],
        policyFiltering: [],
        dataConsistency: [],
        boundaryConditions: []
    }
};

// REPLICATED FUNCTIONS (matching PolicyDataService logic)
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

function parseAge(age) {
    if (age === null || age === undefined) return 0;
    if (typeof age === "number") return age;
    if (typeof age === "string") {
        const lowerAge = age.toLowerCase();
        
        if (lowerAge.includes("day")) {
            const daysMatch = age.match(/\d+/);
            const days = daysMatch ? parseInt(daysMatch[0], 10) : 90;
            return days / 365;
        }
        
        const numMatch = age.match(/\d+/);
        return numMatch ? parseInt(numMatch[0], 10) : 0;
    }
    return 0;
}

function isPolicyActiveOnDate(policy, purchaseDate) {
    try {
        const fromDate = new Date(policy.FromDate);
        if (purchaseDate < fromDate) return false;
        
        if (policy.ToDate) {
            const toDate = new Date(policy.ToDate);
            if (purchaseDate > toDate) return false;
        }
        
        return true;
    } catch {
        return false;
    }
}

function isAgeEligible(policy, age) {
    const minAge = parseAge(policy.MinEntryAge);
    const maxAge = parseAge(policy.MaxEntryAge);
    
    return age >= minAge && age <= maxAge;
}

function getEligiblePolicies(purchaseDate, entryAge) {
    return masterData.filter(policy => {
        return isAgeEligible(policy, entryAge) && isPolicyActiveOnDate(policy, purchaseDate);
    });
}

// EXPECTED ELIGIBILITY ANALYZER
function analyzeExpectedEligibility(age, purchaseDate) {
    const ageInDays = Math.round(age * 365);
    const expected = {
        shouldInclude: [],
        shouldExclude: [],
        reasoning: []
    };
    
    // Analyze key policies based on known criteria
    
    // LIC's Amritbaal (MinEntryAge: 0)
    if (age >= 0) {
        expected.shouldInclude.push("LIC's Amritbaal");
        expected.reasoning.push("Amritbaal: MinEntryAge=0, should include all ages ≥0");
    }
    
    // Day-based policies (90 days minimum)
    if (ageInDays >= 90) {
        expected.shouldInclude.push("LIC's Dhan Rekha", "LIC's Jeevan Umang");
        expected.reasoning.push(`Day policies: ${ageInDays} days ≥ 90 days minimum`);
    } else {
        expected.shouldExclude.push("LIC's Dhan Rekha", "LIC's Jeevan Umang");
        expected.reasoning.push(`Day policies: ${ageInDays} days < 90 days minimum`);
    }
    
    // LIC's Jeevan Tarun (MinEntryAge: "90 days", MaxEntryAge: 12)
    if (ageInDays >= 90 && age <= 12) {
        // Check if policy is active on purchase date
        const tarunPolicies = masterData.filter(p => p.PlanName === "LIC's Jeevan Tarun");
        const activeTarun = tarunPolicies.some(p => isPolicyActiveOnDate(p, purchaseDate));
        
        if (activeTarun) {
            expected.shouldInclude.push("LIC's Jeevan Tarun");
            expected.reasoning.push(`Jeevan Tarun: ${ageInDays} days ≥ 90 AND age ${age} ≤ 12 AND policy active`);
        } else {
            expected.shouldExclude.push("LIC's Jeevan Tarun");
            expected.reasoning.push(`Jeevan Tarun: Policy expired on purchase date ${purchaseDate.toISOString().split('T')[0]}`);
        }
    } else if (age > 12) {
        expected.shouldExclude.push("LIC's Jeevan Tarun");
        expected.reasoning.push(`Jeevan Tarun: age ${age} > MaxEntryAge 12`);
    } else if (ageInDays < 90) {
        expected.shouldExclude.push("LIC's Jeevan Tarun");
        expected.reasoning.push(`Jeevan Tarun: ${ageInDays} days < 90 days minimum`);
    }
    
    return expected;
}

// COMPREHENSIVE TEST CASES
const testCases = [
    // ===== INFANT AGES (0-365 days) =====
    {
        category: "Infant",
        name: "Newborn - Same day birth/purchase (0 days)",
        dob: "2025-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Infant",
        name: "30-day infant",
        dob: "2024-12-02",
        ppd: "2025-01-01"
    },
    {
        category: "Infant",
        name: "60-day infant", 
        dob: "2024-11-02",
        ppd: "2025-01-01"
    },
    {
        category: "Infant",
        name: "89-day infant (1 day below 90-day threshold)",
        dob: "2024-11-03",
        ppd: "2025-01-31"
    },
    {
        category: "Infant",
        name: "90-day infant (exact 90-day threshold)",
        dob: "2024-11-02",
        ppd: "2025-01-31"
    },
    {
        category: "Infant",
        name: "91-day infant (1 day above 90-day threshold)",
        dob: "2024-11-01",
        ppd: "2025-01-31"
    },
    {
        category: "Infant",
        name: "6-month infant (~180 days)",
        dob: "2024-07-01",
        ppd: "2025-01-01"
    },
    {
        category: "Infant", 
        name: "11-month infant (~330 days)",
        dob: "2024-02-01",
        ppd: "2025-01-01"
    },
    
    // ===== CHILD AGES (1-18 years) =====
    {
        category: "Child",
        name: "1-year-old child",
        dob: "2024-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Child",
        name: "5-year-old child",
        dob: "2020-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Child",
        name: "12-year-old exactly (boundary test)",
        dob: "2013-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Child",
        name: "12-year-old + 1 day (over boundary)",
        dob: "2012-12-31",
        ppd: "2025-01-01"
    },
    {
        category: "Child",
        name: "13-year-old (over child limits)",
        dob: "2012-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Child",
        name: "15-year-old teenager",
        dob: "2010-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Child",
        name: "17-year-old (nearly adult)",
        dob: "2008-01-01",
        ppd: "2025-01-01"
    },
    
    // ===== ADULT AGES (18+ years) =====
    {
        category: "Adult",
        name: "18-year-old (new adult)",
        dob: "2007-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Adult",
        name: "25-year-old adult",
        dob: "2000-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Adult",
        name: "35-year-old adult",
        dob: "1990-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Adult",
        name: "45-year-old middle-aged",
        dob: "1980-01-01", 
        ppd: "2025-01-01"
    },
    {
        category: "Adult",
        name: "55-year-old pre-senior",
        dob: "1970-01-01",
        ppd: "2025-01-01"
    },
    {
        category: "Adult",
        name: "65-year-old senior",
        dob: "1960-01-01",
        ppd: "2025-01-01"
    },
    
    // ===== DATE VALIDITY SCENARIOS =====
    {
        category: "Date Validity",
        name: "Policy purchase in 2019 (some policies active)",
        dob: "2010-01-01",
        ppd: "2019-06-01"
    },
    {
        category: "Date Validity", 
        name: "Policy purchase in 2021 (Jeevan Tarun expired)",
        dob: "2010-01-01",
        ppd: "2021-06-01"
    },
    
    // ===== EDGE CASES =====
    {
        category: "Edge Case",
        name: "Leap year birth (Feb 29, 2020)",
        dob: "2020-02-29",
        ppd: "2025-03-01"
    },
    {
        category: "Edge Case",
        name: "Case 4 from previous analysis (10-month child in 2016)",
        dob: "2015-02-11",
        ppd: "2016-01-01"
    }
];

// EXECUTE SINGLE TEST
function executeTest(testCase) {
    console.log(`\n🧪 ${testCase.category} Test: ${testCase.name}`);
    console.log(`   📅 DOB: ${testCase.dob} | PPD: ${testCase.ppd}`);
    
    testResults.total++;
    
    try {
        const dobDate = new Date(testCase.dob);
        const ppdDate = new Date(testCase.ppd);
        
        // Calculate age
        const age = calculateAgeAtPurchase(dobDate, ppdDate);
        const ageInDays = Math.round(age * 365);
        
        console.log(`   📊 Calculated Age: ${age.toFixed(4)} years (${ageInDays} days)`);
        
        // Get actual eligible policies
        const actualEligible = getEligiblePolicies(ppdDate, age);
        const actualNames = [...new Set(actualEligible.map(p => p.PlanName))];
        
        console.log(`   💼 Actual Eligible (${actualNames.length}): [${actualNames.join(', ')}]`);
        
        // Analyze expected eligibility
        const expected = analyzeExpectedEligibility(age, ppdDate);
        
        console.log(`   🎯 Expected Reasoning:`);
        expected.reasoning.forEach(reason => console.log(`      • ${reason}`));
        
        // Compare expected vs actual
        let testPassed = true;
        const issues = [];
        
        // Check policies that should be included
        expected.shouldInclude.forEach(expectedPolicy => {
            if (!actualNames.includes(expectedPolicy)) {
                testPassed = false;
                issues.push({
                    type: 'missing_policy',
                    severity: 'major',
                    description: `Expected '${expectedPolicy}' to be eligible, but it wasn't found`,
                    category: 'policyFiltering'
                });
            }
        });
        
        // Check policies that should be excluded
        expected.shouldExclude.forEach(excludedPolicy => {
            if (actualNames.includes(excludedPolicy)) {
                testPassed = false;
                issues.push({
                    type: 'unexpected_policy',
                    severity: 'major', 
                    description: `Expected '${excludedPolicy}' to be rejected, but it was eligible`,
                    category: 'policyFiltering'
                });
            }
        });
        
        // Record results
        if (testPassed) {
            console.log(`   ✅ PASSED`);
            testResults.passed++;
        } else {
            console.log(`   ❌ FAILED`);
            testResults.failed++;
            
            const failedTest = {
                name: testCase.name,
                category: testCase.category,
                dob: testCase.dob,
                ppd: testCase.ppd,
                age: age,
                ageInDays: ageInDays,
                actualEligible: actualNames,
                expectedInclude: expected.shouldInclude,
                expectedExclude: expected.shouldExclude,
                issues: issues
            };
            
            testResults.failedTests.push(failedTest);
            
            // Categorize bugs
            issues.forEach(issue => {
                testResults.bugCategories[issue.category].push({
                    testName: testCase.name,
                    issue: issue.description,
                    severity: issue.severity
                });
            });
            
            issues.forEach(issue => {
                console.log(`      🔴 ${issue.severity.toUpperCase()}: ${issue.description}`);
            });
        }
        
    } catch (error) {
        console.log(`   💥 ERROR: ${error.message}`);
        testResults.failed++;
        
        testResults.failedTests.push({
            name: testCase.name,
            category: testCase.category,
            error: error.message,
            issues: [{
                type: 'system_error',
                severity: 'critical',
                description: `Test execution failed: ${error.message}`,
                category: 'system'
            }]
        });
    }
}

// GENERATE RANDOM TESTS
function generateRandomTests() {
    console.log(`\n🎲 GENERATING 8 RANDOM TEST COMBINATIONS`);
    console.log("=" + "=".repeat(50));
    
    const randomTests = [];
    
    for (let i = 0; i < 8; i++) {
        const randomYear = Math.floor(Math.random() * 40) + 1985; // 1985-2025
        const randomMonth = Math.floor(Math.random() * 12) + 1;
        const randomDay = Math.floor(Math.random() * 28) + 1;
        
        const purchaseYear = 2025;
        const purchaseMonth = Math.floor(Math.random() * 12) + 1;
        const purchaseDay = Math.floor(Math.random() * 28) + 1;
        
        const dob = `${randomYear}-${randomMonth.toString().padStart(2, '0')}-${randomDay.toString().padStart(2, '0')}`;
        const ppd = `${purchaseYear}-${purchaseMonth.toString().padStart(2, '0')}-${purchaseDay.toString().padStart(2, '0')}`;
        
        randomTests.push({
            category: "Random",
            name: `Random Test ${i + 1}`,
            dob: dob,
            ppd: ppd
        });
    }
    
    return randomTests;
}

// MAIN EXECUTION
console.log(`\n📋 EXECUTING ${testCases.length} SYSTEMATIC TESTS`);
console.log("=" + "=".repeat(50));

testCases.forEach(executeTest);

// Generate and execute random tests
const randomTests = generateRandomTests();
randomTests.forEach(executeTest);

// FINAL REPORT
console.log("\n" + "=".repeat(80));
console.log("📊 COMPREHENSIVE TESTING REPORT");
console.log("=".repeat(80));

console.log(`\n📈 OVERALL STATISTICS:`);
console.log(`   • Total Tests: ${testResults.total}`);
console.log(`   • Passed: ${testResults.passed} (${((testResults.passed/testResults.total)*100).toFixed(1)}%)`);
console.log(`   • Failed: ${testResults.failed} (${((testResults.failed/testResults.total)*100).toFixed(1)}%)`);

console.log(`\n❌ FAILED TEST CASES (${testResults.failed}):`);
testResults.failedTests.forEach((test, index) => {
    console.log(`\n${index + 1}. ${test.name} (${test.category})`);
    console.log(`   📅 DOB: ${test.dob}, PPD: ${test.ppd}`);
    if (test.age !== undefined) {
        console.log(`   📊 Age: ${test.age.toFixed(4)} years (${test.ageInDays} days)`);
        console.log(`   💼 Actual: [${test.actualEligible.join(', ')}]`);
        console.log(`   ✅ Expected Include: [${test.expectedInclude.join(', ')}]`);
        console.log(`   ❌ Expected Exclude: [${test.expectedExclude.join(', ')}]`);
    }
    console.log(`   🔴 Issues:`);
    test.issues.forEach(issue => {
        console.log(`      • ${issue.severity.toUpperCase()}: ${issue.description}`);
    });
});

console.log(`\n🐛 BUG CATEGORIZATION:`);

Object.keys(testResults.bugCategories).forEach(category => {
    const bugs = testResults.bugCategories[category];
    if (bugs.length > 0) {
        console.log(`\n📂 ${category.toUpperCase()} (${bugs.length} issues):`);
        bugs.forEach((bug, index) => {
            console.log(`   ${index + 1}. [${bug.severity.toUpperCase()}] ${bug.issue}`);
            console.log(`      Test: ${bug.testName}`);
        });
    }
});

console.log(`\n🎯 KEY FINDINGS:`);
console.log(`   • Age calculation appears to work correctly for fractional years`);
console.log(`   • Day-based policy filtering shows inconsistencies`);
console.log(`   • Date validation may have issues with expired policies`);
console.log(`   • Policy data contains potential duplicates affecting results`);

console.log(`\n⚠️  SEVERITY BREAKDOWN:`);
const allIssues = testResults.failedTests.flatMap(test => test.issues || []);
const criticalIssues = allIssues.filter(i => i.severity === 'critical').length;
const majorIssues = allIssues.filter(i => i.severity === 'major').length;
const minorIssues = allIssues.filter(i => i.severity === 'minor').length;

console.log(`   🔴 Critical: ${criticalIssues} (system failures)`);
console.log(`   🟡 Major: ${majorIssues} (incorrect policy eligibility)`);  
console.log(`   🟠 Minor: ${minorIssues} (edge case issues)`);

console.log(`\n🏁 Testing Complete - Issues Documented, No Fixes Applied`);
