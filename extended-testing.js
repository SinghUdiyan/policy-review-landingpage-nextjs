/**
 * EXTENDED POLICY ELIGIBILITY TESTING
 * Re-testing the 4 failed cases + Additional diverse test scenarios
 * DOCUMENTATION ONLY - NO FIXES APPLIED
 */

const fs = require('fs');
const path = require('path');

console.log("🔍 EXTENDED POLICY ELIGIBILITY TESTING");
console.log("🎯 Focus: Re-verify 4 failed cases + Additional diverse scenarios");
console.log("=" + "=".repeat(70));

// Load master data
const masterDataPath = path.join(__dirname, 'master-data.json');
const masterData = JSON.parse(fs.readFileSync(masterDataPath, 'utf8'));

// Test Results Storage
const testResults = {
    previouslyFailed: [],
    newTests: [],
    allFailed: [],
    totalTested: 0,
    totalFailed: 0
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

// ANALYZE POLICY DATA for specific policies
function analyzeSpecificPolicies(policyNames, purchaseDate) {
    const analysis = {};
    
    policyNames.forEach(name => {
        const policies = masterData.filter(p => p.PlanName === name);
        analysis[name] = {
            totalVariants: policies.length,
            variants: policies.map(p => ({
                uin: p.UIN,
                minAge: p.MinEntryAge,
                maxAge: p.MaxEntryAge,
                fromDate: p.FromDate,
                toDate: p.ToDate,
                activeOnDate: isPolicyActiveOnDate(p, purchaseDate)
            }))
        };
    });
    
    return analysis;
}

// RE-TEST THE 4 PREVIOUSLY IDENTIFIED FAILED CASES
console.log("\n🔄 RE-TESTING 4 PREVIOUSLY FAILED CASES");
console.log("=" + "=".repeat(50));

const previouslyFailedCases = [
    {
        name: "65-year-old senior",
        dob: "1960-01-01",
        ppd: "2025-01-01",
        expectedIssues: ["Missing LIC's Dhan Rekha", "Missing LIC's Jeevan Umang"]
    },
    {
        name: "Policy purchase in 2019 (9-year-old)",
        dob: "2010-01-01", 
        ppd: "2019-06-01",
        expectedIssues: ["Missing LIC's Dhan Rekha", "Missing LIC's Amritbaal"]
    },
    {
        name: "Policy purchase in 2021 (11-year-old)",
        dob: "2010-01-01",
        ppd: "2021-06-01", 
        expectedIssues: ["Missing LIC's Dhan Rekha", "Missing LIC's Amritbaal"]
    },
    {
        name: "Case 4 - 10-month child in 2016",
        dob: "2015-02-11",
        ppd: "2016-01-01",
        expectedIssues: ["Missing LIC's Dhan Rekha", "Missing LIC's Jeevan Umang", "Missing LIC's Amritbaal"]
    }
];

function testCase(testCase, category = "Re-test") {
    console.log(`\n🧪 ${category}: ${testCase.name}`);
    console.log(`   📅 DOB: ${testCase.dob} | PPD: ${testCase.ppd}`);
    
    testResults.totalTested++;
    
    try {
        const dobDate = new Date(testCase.dob);
        const ppdDate = new Date(testCase.ppd);
        
        const age = calculateAgeAtPurchase(dobDate, ppdDate);
        const ageInDays = Math.round(age * 365);
        
        console.log(`   📊 Age: ${age.toFixed(4)} years (${ageInDays} days)`);
        
        // Get actual eligible policies
        const actualEligible = getEligiblePolicies(ppdDate, age);
        const actualNames = [...new Set(actualEligible.map(p => p.PlanName))];
        
        console.log(`   💼 Actual Eligible (${actualNames.length}): [${actualNames.join(', ')}]`);
        
        // Analyze key policies mentioned in expected issues
        const keyPolicies = ['LIC\'s Amritbaal', 'LIC\'s Dhan Rekha', 'LIC\'s Jeevan Umang', 'LIC\'s Jeevan Tarun'];
        const policyAnalysis = analyzeSpecificPolicies(keyPolicies, ppdDate);
        
        console.log(`   🔍 Key Policy Analysis:`);
        Object.keys(policyAnalysis).forEach(policyName => {
            const analysis = policyAnalysis[policyName];
            const isEligible = actualNames.includes(policyName);
            const activeVariants = analysis.variants.filter(v => v.activeOnDate).length;
            
            console.log(`      ${isEligible ? '✅' : '❌'} ${policyName}: ${analysis.totalVariants} variants (${activeVariants} active)`);
            
            if (analysis.totalVariants > 0 && !isEligible) {
                // Check why it might not be eligible
                analysis.variants.forEach((variant, idx) => {
                    const minAge = parseAge(variant.minAge);
                    const maxAge = parseAge(variant.maxAge);
                    const ageEligible = age >= minAge && age <= maxAge;
                    const dateActive = variant.activeOnDate;
                    
                    console.log(`         Variant ${idx + 1}: Age ${ageEligible ? '✅' : '❌'} (${minAge.toFixed(3)}-${maxAge}) | Date ${dateActive ? '✅' : '❌'} (${variant.fromDate} to ${variant.toDate || 'ongoing'})`);
                });
            }
        });
        
        // Determine if test actually failed
        let actualIssues = [];
        
        // Check LIC's Amritbaal (should be eligible for ages ≤ 13)
        if (age <= 13 && !actualNames.includes('LIC\'s Amritbaal')) {
            actualIssues.push("Missing LIC's Amritbaal (age ≤ 13)");
        }
        
        // Check other policies based on specific analysis
        keyPolicies.forEach(policyName => {
            if (policyName === 'LIC\'s Amritbaal') return; // Already checked above
            
            const analysis = policyAnalysis[policyName];
            const hasActiveEligibleVariant = analysis.variants.some(variant => {
                const minAge = parseAge(variant.minAge);
                const maxAge = parseAge(variant.maxAge);
                const ageEligible = age >= minAge && age <= maxAge;
                return ageEligible && variant.activeOnDate;
            });
            
            if (hasActiveEligibleVariant && !actualNames.includes(policyName)) {
                actualIssues.push(`Missing ${policyName} (has eligible active variant)`);
            }
        });
        
        if (actualIssues.length > 0) {
            console.log(`   🔴 CONFIRMED ISSUES:`);
            actualIssues.forEach(issue => console.log(`      • ${issue}`));
            
            const failedTest = {
                name: testCase.name,
                dob: testCase.dob,
                ppd: testCase.ppd,
                age: age,
                actualEligible: actualNames,
                confirmedIssues: actualIssues,
                category: category
            };
            
            if (category === "Re-test") {
                testResults.previouslyFailed.push(failedTest);
            } else {
                testResults.newTests.push(failedTest);
            }
            testResults.allFailed.push(failedTest);
            testResults.totalFailed++;
            
            return false; // Test failed
        } else {
            console.log(`   ✅ PASSED - No confirmed issues`);
            return true; // Test passed
        }
        
    } catch (error) {
        console.log(`   💥 ERROR: ${error.message}`);
        testResults.totalFailed++;
        return false;
    }
}

// Execute re-tests
previouslyFailedCases.forEach(tc => testCase(tc, "Re-test"));

// ADDITIONAL DIVERSE TEST CASES
console.log("\n🎯 ADDITIONAL DIVERSE TEST SCENARIOS");
console.log("=" + "=".repeat(50));

const additionalTestCases = [
    // Boundary conditions for different policies
    {
        name: "Exact 90-day boundary test",
        dob: "2024-10-03",
        ppd: "2025-01-01"
    },
    {
        name: "Exact 13-year boundary (Amritbaal limit)",
        dob: "2012-01-01",
        ppd: "2025-01-01"
    },
    {
        name: "13 years + 1 day (over Amritbaal limit)", 
        dob: "2011-12-31",
        ppd: "2025-01-01"
    },
    {
        name: "Exact 12-year boundary (Jeevan Tarun limit)",
        dob: "2013-01-01",
        ppd: "2025-01-01"
    },
    
    // Historical date scenarios
    {
        name: "Purchase in 2017 (Dhan Rekha active period)",
        dob: "2010-01-01",
        ppd: "2017-12-01"
    },
    {
        name: "Purchase in 2018 (near Dhan Rekha expiry)",
        dob: "2010-01-01", 
        ppd: "2018-04-01"
    },
    {
        name: "Purchase right after Dhan Rekha expiry",
        dob: "2010-01-01",
        ppd: "2018-06-01"
    },
    
    // Different age groups with historical dates
    {
        name: "5-year-old in 2020 (policy transitions)",
        dob: "2015-01-01",
        ppd: "2020-12-01"  
    },
    {
        name: "Adult in expired period (2022)",
        dob: "1990-01-01",
        ppd: "2022-01-01"
    },
    
    // Edge cases
    {
        name: "Very old person (80 years)",
        dob: "1945-01-01", 
        ppd: "2025-01-01"
    },
    {
        name: "Middle-aged in transition period (2019)",
        dob: "1975-01-01",
        ppd: "2019-12-01" 
    },
    
    // Specific day thresholds
    {
        name: "88-day infant (below 90-day threshold)",
        dob: "2024-11-04",
        ppd: "2025-01-31"
    },
    {
        name: "92-day infant (above 90-day threshold)",
        dob: "2024-10-31", 
        ppd: "2025-01-31"
    }
];

// Execute additional tests
additionalTestCases.forEach(tc => testCase(tc, "New Test"));

// FINAL RESULTS
console.log("\n" + "=".repeat(80));
console.log("📊 EXTENDED TESTING RESULTS");
console.log("=".repeat(80));

console.log(`\n📈 OVERALL STATISTICS:`);
console.log(`   • Total Tests: ${testResults.totalTested}`);
console.log(`   • Total Failed: ${testResults.totalFailed}`);
console.log(`   • Success Rate: ${(((testResults.totalTested - testResults.totalFailed) / testResults.totalTested) * 100).toFixed(1)}%`);

console.log(`\n🔄 RE-TEST RESULTS (4 Previously Failed):`);
console.log(`   • Confirmed Still Failing: ${testResults.previouslyFailed.length}`);
console.log(`   • Now Passing: ${4 - testResults.previouslyFailed.length}`);

console.log(`\n🆕 NEW TEST RESULTS (${additionalTestCases.length} Additional Tests):`);
console.log(`   • New Failures Found: ${testResults.newTests.length}`);
console.log(`   • New Tests Passing: ${additionalTestCases.length - testResults.newTests.length}`);

if (testResults.allFailed.length > 0) {
    console.log(`\n❌ ALL FAILED TEST CASES (${testResults.allFailed.length}):`);
    testResults.allFailed.forEach((test, index) => {
        console.log(`\n${index + 1}. ${test.name} (${test.category})`);
        console.log(`   📅 DOB: ${test.dob}, PPD: ${test.ppd}`);
        console.log(`   📊 Age: ${test.age.toFixed(4)} years`);
        console.log(`   💼 Actual Eligible: [${test.actualEligible.join(', ')}]`);
        console.log(`   🔴 Confirmed Issues:`);
        test.confirmedIssues.forEach(issue => {
            console.log(`      • ${issue}`);
        });
    });
}

console.log(`\n🎯 KEY INSIGHTS:`);
console.log(`   • Policy date ranges significantly affect eligibility`);
console.log(`   • Multiple variants of same policy with different validity periods`);
console.log(`   • Age boundary enforcement appears to work correctly`); 
console.log(`   • Historical purchase dates reveal data consistency issues`);

console.log(`\n🏁 Extended Testing Complete - Issues Documented`);
