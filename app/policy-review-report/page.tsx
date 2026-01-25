"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Download, TrendingUp, Calculator, FileText, Star, AlertTriangle, CheckCircle, XCircle, BarChart3, PieChart, Eye, Phone, TrendingDown, Minus, ArrowLeft } from "lucide-react";
import { calculateTotalPremiumPaid, calculatePremiumForTimeframe } from "@/lib/utils/premiumCalculator";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function PolicyReviewReportPage() {
  const router = useRouter();
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | '3years' | '6years' | 'maturity'>('today');
  const [showCashflowDialog, setShowCashflowDialog] = useState(false);
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [formData, setFormData] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth transition
    const loadData = async () => {
      // Small delay for smooth page transition
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const storedData = sessionStorage.getItem('policyReviewData');
      console.log('Loading report page, sessionStorage data:', storedData);
      
      if (storedData && storedData !== 'undefined' && storedData !== 'null') {
        try {
          const parsedData = JSON.parse(storedData);
          console.log('Parsed form data:', parsedData);
          setFormData(parsedData);
          // Show skeleton for a bit longer for professional feel
          await new Promise(resolve => setTimeout(resolve, 800));
          setIsLoading(false);
        } catch (error) {
          console.error('Error parsing sessionStorage data:', error);
          router.push('/');
        }
      } else {
        console.log('No valid data found, redirecting to home');
        router.push('/');
      }
    };
    
    loadData();
  }, [router]);

  // Placeholder data - replace with actual calculations from formData
  const naitriScore = 3.5;
  const scoreBreakdown = {
    return: 3,
    liquidity: 3.5,
    risk: 4
  };

  // Dynamic calculation based on form data
  const premiumCalculation = useMemo(() => {
    if (!formData) return null;

    // Type assertion for formData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = formData as Record<string, Record<string, any>>;

    // Convert frequency number to string
    const getFrequencyString = (freq: string | number) => {
      switch (String(freq)) {
        case '1': return 'monthly';
        case '2': return 'quarterly';
        case '3': return 'half-yearly';
        case '4': return 'yearly';
        default: return 'monthly';
      }
    };

    const policyDetails = {
      policyStartDate: data.step2?.policyPurchaseDate ? 
        (data.step2.policyPurchaseDate instanceof Date ? 
          data.step2.policyPurchaseDate.toISOString().split('T')[0] : 
          data.step2.policyPurchaseDate) : '2024-01-01',
      policyEndDate: data.step2?.policyEndDate || '2040-01-01',
      policyTerm: parseInt(data.step4?.policyTerm) || 16,
      ppt: parseInt(data.step4?.premiumPayingTerm) || 10,
      frequency: getFrequencyString(data.step4?.premiumFrequency) as 'monthly' | 'quarterly' | 'half-yearly' | 'yearly',
      premiumAmount: parseFloat(data.step4?.premiumAmount) || 3000
    };

    return calculateTotalPremiumPaid(policyDetails);
  }, [formData]);

  // Calculate premiums for different timeframes
  const timeframeCalculations = useMemo(() => {
    if (!formData) return null;

    // Type assertion for formData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = formData as Record<string, Record<string, any>>;

    // Convert frequency number to string
    const getFrequencyString = (freq: string | number) => {
      switch (String(freq)) {
        case '1': return 'monthly';
        case '2': return 'quarterly';
        case '3': return 'half-yearly';
        case '4': return 'yearly';
        default: return 'monthly';
      }
    };

    const policyDetails = {
      policyStartDate: data.step2?.policyPurchaseDate ? 
        (data.step2.policyPurchaseDate instanceof Date ? 
          data.step2.policyPurchaseDate.toISOString().split('T')[0] : 
          data.step2.policyPurchaseDate) : '2024-01-01',
      policyEndDate: data.step2?.policyEndDate || '2040-01-01',
      policyTerm: parseInt(data.step4?.policyTerm) || 16,
      ppt: parseInt(data.step4?.premiumPayingTerm) || 10,
      frequency: getFrequencyString(data.step4?.premiumFrequency) as 'monthly' | 'quarterly' | 'half-yearly' | 'yearly',
      premiumAmount: parseFloat(data.step4?.premiumAmount) || 3000
    };

    return {
      after3Years: calculatePremiumForTimeframe(policyDetails, '3years'),
      after6Years: calculatePremiumForTimeframe(policyDetails, '6years'),
      atMaturity: calculatePremiumForTimeframe(policyDetails, 'maturity')
    };
  }, [formData]);

  const performanceData = {
    today: {
      premiumPaid: premiumCalculation?.totalPremiumPaid || 0,
      payoutsReceived: 15000,
      currentValue: 98000,
      absoluteReturn: -5.83,
      irr: -2.1
    },
    after3Years: {
      premiumPaid: timeframeCalculations?.after3Years.totalPremiumPaid || 0,
      totalPayouts: 35000,
      expectedValue: 165000,
      absoluteReturn: 11.11,
      irr: 3.2
    },
    after6Years: {
      premiumPaid: timeframeCalculations?.after6Years.totalPremiumPaid || 0,
      totalPayouts: 75000,
      expectedValue: 295000,
      absoluteReturn: 23.33,
      irr: 5.8
    },
    atMaturity: {
      premiumPaid: timeframeCalculations?.atMaturity.totalPremiumPaid || 0,
      totalPayouts: 150000,
      maturityValue: 850000,
      absoluteReturn: 66.67,
      irr: 7.2
    }
  };

  const comparisonChartData = {
    today: [
      { name: 'Your Policy', value: -2.1, color: '#3b82f6' },
      { name: 'Inflation', value: 6.0, color: '#f59e0b' },
      { name: 'Bank FD', value: 6.5, color: '#10b981' },
      { name: 'Mutual Fund', value: 12.0, color: '#8b5cf6' },
      { name: 'Naitri Portfolio', value: 14.5, color: '#ec4899' }
    ],
    '3years': [
      { name: 'Your Policy', value: 3.2, color: '#3b82f6' },
      { name: 'Inflation', value: 6.0, color: '#f59e0b' },
      { name: 'Bank FD', value: 6.5, color: '#10b981' },
      { name: 'Mutual Fund', value: 12.0, color: '#8b5cf6' },
      { name: 'Naitri Portfolio', value: 14.5, color: '#ec4899' }
    ],
    '6years': [
      { name: 'Your Policy', value: 5.8, color: '#3b82f6' },
      { name: 'Inflation', value: 6.0, color: '#f59e0b' },
      { name: 'Bank FD', value: 6.5, color: '#10b981' },
      { name: 'Mutual Fund', value: 12.0, color: '#8b5cf6' },
      { name: 'Naitri Portfolio', value: 14.5, color: '#ec4899' }
    ],
    maturity: [
      { name: 'Your Policy', value: 7.2, color: '#3b82f6' },
      { name: 'Inflation', value: 6.0, color: '#f59e0b' },
      { name: 'Bank FD', value: 6.5, color: '#10b981' },
      { name: 'Mutual Fund', value: 12.0, color: '#8b5cf6' },
      { name: 'Naitri Portfolio', value: 14.5, color: '#ec4899' }
    ]
  };

  const naitriLogic = {
    mutualFundValue: 1800000,
    policyValue: 1200000,
    threshold: 1.35,
    shouldSwitch: 1800000 >= (1200000 * 1.35),
  };

  const naitriActionPlan = {
    lumpSum: 55000,
    monthlySIP: 8000,
    maturityYear: 2035,
    naitriMaturityYear: 2035,
    maturityAmount: 1000000,
    naitriMaturityAmount: 1350000,
    annualReturn: 5.2,
    naitriAnnualReturn: 9.5,
    absoluteReturn: 45,
    naitriAbsoluteReturn: 95
  };

  const additionalGains = {
    additionalValue: naitriActionPlan.naitriMaturityAmount - naitriActionPlan.maturityAmount,
    extraAbsoluteReturn: naitriActionPlan.naitriAbsoluteReturn - naitriActionPlan.absoluteReturn,
    extraAnnualReturn: naitriActionPlan.naitriAnnualReturn - naitriActionPlan.annualReturn
  };

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getScoreGradient = (score: number) => {
    if (score >= 4) {
      return { start: '#10b981', end: '#059669', bgClass: 'from-green-100 to-emerald-100', textClass: 'text-green-600', borderClass: 'border-green-300' };
    } else if (score >= 3) {
      return { start: '#f59e0b', end: '#d97706', bgClass: 'from-yellow-100 to-amber-100', textClass: 'text-yellow-600', borderClass: 'border-yellow-300' };
    } else if (score >= 2) {
      return { start: '#f97316', end: '#ea580c', bgClass: 'from-orange-100 to-orange-200', textClass: 'text-orange-600', borderClass: 'border-orange-300' };
    } else {
      return { start: '#ef4444', end: '#dc2626', bgClass: 'from-red-100 to-red-200', textClass: 'text-red-600', borderClass: 'border-red-300' };
    }
  };

  const getScoreIcon = (score: number) => {
    if (score >= 4) return <CheckCircle className="h-6 w-6 text-green-600" />;
    if (score >= 3) return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
    if (score >= 2) return <AlertTriangle className="h-6 w-6 text-orange-600" />;
    return <XCircle className="h-6 w-6 text-red-600" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 4) return "🎉 Excellent Performance";
    if (score >= 3) return "👍 Good Performance";
    if (score >= 2) return "⚠️ Fair Performance";
    return "❌ Needs Improvement";
  };

  const getReturnIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (value < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getReturnColorClass = (value: number) => {
    if (value > 0) return "text-green-600";
    if (value < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getTimeframeLabel = (timeframe: string) => {
    switch (timeframe) {
      case 'today': return 'Till Today';
      case '3years': return 'After 3 Years';
      case '6years': return 'After 6 Years';
      case 'maturity': return 'At Maturity';
      default: return 'Till Today';
    }
  };

  const handleDownloadPDF = () => {
    setIsGeneratingPDF(true);
    setTimeout(() => {
      setIsGeneratingPDF(false);
      alert('PDF Report is ready! In production, this would download a detailed PDF report.');
    }, 2000);
  };

  if (isLoading || !formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Skeleton Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-32" />
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-xl" />
                <Skeleton className="h-8 w-48" />
              </div>
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>

        {/* Skeleton Content */}
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 pb-16">
          {/* Title Skeleton */}
          <div className="text-center space-y-4 pt-4">
            <Skeleton className="h-6 w-96 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
          </div>

          {/* Naitri Score Skeleton */}
          <Card className="border-2 border-gray-200">
            <CardHeader className="text-center pb-4">
              <Skeleton className="h-8 w-48 mx-auto" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center">
                <Skeleton className="h-48 w-48 rounded-full mb-4" />
                <Skeleton className="h-12 w-64 rounded-full mb-6" />
                <div className="grid grid-cols-3 gap-6 w-full max-w-md">
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Summary Skeleton */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <Skeleton className="h-8 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-gray-200 rounded-2xl p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                  <Skeleton className="h-24 rounded-xl" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
                <Skeleton className="h-64 rounded-xl" />
              </div>
            </CardContent>
          </Card>

          {/* Chart Skeleton */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <Skeleton className="h-8 w-72" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3 mb-6">
                <Skeleton className="h-12 rounded-2xl" />
                <Skeleton className="h-12 rounded-2xl" />
                <Skeleton className="h-12 rounded-2xl" />
                <Skeleton className="h-12 rounded-2xl" />
              </div>
              <Skeleton className="h-96 rounded-2xl" />
            </CardContent>
          </Card>

          {/* CTA Skeleton */}
          <Card className="border-2 border-gray-200">
            <CardHeader>
              <Skeleton className="h-8 w-48 mx-auto" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-40 rounded-2xl" />
                <Skeleton className="h-40 rounded-2xl" />
                <Skeleton className="h-40 rounded-2xl" />
                <Skeleton className="h-40 rounded-2xl" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 animate-fade-in">
      {/* Fixed Header with Back Button */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Policy Review Report</h1>
            </div>
            <Button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-semibold flex items-center space-x-2 disabled:opacity-50 transition-all duration-200"
            >
              <Download className={`h-4 w-4 ${isGeneratingPDF ? 'animate-bounce' : ''}`} />
              <span className="hidden md:inline">{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 pb-16 animate-fade-in">
        
        {/* Page Title */}
        <div className="text-center space-y-4 animate-fade-in pt-4">
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive analysis of your LIC policy performance with personalized recommendations
          </p>
          <div className="flex items-center justify-center space-x-2 pt-2">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
            <div className="h-1 w-8 bg-blue-500 rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* 1. Naitri Score */}
        <Card className="border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full translate-y-24 -translate-x-24"></div>
          </div>
          
          <CardHeader className="text-center pb-4 relative z-10">
            <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center justify-center space-x-3">
              <Star className="h-8 w-8 text-yellow-500 animate-pulse" />
              <span>Naitri Score</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6 relative z-10">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e5e7eb"
                    strokeWidth="16"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke={`url(#scoreGradient-${naitriScore})`}
                    strokeWidth="16"
                    fill="none"
                    strokeDasharray={`${(naitriScore / 5) * 553} 553`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id={`scoreGradient-${naitriScore}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={getScoreGradient(naitriScore).start} />
                      <stop offset="100%" stopColor={getScoreGradient(naitriScore).end} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${getScoreGradient(naitriScore).textClass}`}>{naitriScore}</span>
                  <span className="text-sm text-gray-600">out of 5</span>
                </div>
              </div>

              <div className={`mt-4 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r ${getScoreGradient(naitriScore).bgClass} border-2 ${getScoreGradient(naitriScore).borderClass}`}>
                {getScoreIcon(naitriScore)}
                <span className={`font-bold ${getScoreGradient(naitriScore).textClass}`}>
                  {getScoreLabel(naitriScore)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-6 w-full max-w-md mt-6">
                <div className={`text-center space-y-2 p-4 bg-gradient-to-br ${getScoreGradient(scoreBreakdown.return).bgClass} rounded-xl shadow-sm border-2 ${getScoreGradient(scoreBreakdown.return).borderClass} hover:scale-105 transition-transform`}>
                  <div className={`text-3xl font-bold ${getScoreGradient(scoreBreakdown.return).textClass}`}>{scoreBreakdown.return}</div>
                  <div className="text-xs text-gray-700 font-semibold">Return</div>
                </div>
                <div className={`text-center space-y-2 p-4 bg-gradient-to-br ${getScoreGradient(scoreBreakdown.liquidity).bgClass} rounded-xl shadow-sm border-2 ${getScoreGradient(scoreBreakdown.liquidity).borderClass} hover:scale-105 transition-transform`}>
                  <div className={`text-3xl font-bold ${getScoreGradient(scoreBreakdown.liquidity).textClass}`}>{scoreBreakdown.liquidity}</div>
                  <div className="text-xs text-gray-700 font-semibold">Liquidity</div>
                </div>
                <div className={`text-center space-y-2 p-4 bg-gradient-to-br ${getScoreGradient(scoreBreakdown.risk).bgClass} rounded-xl shadow-sm border-2 ${getScoreGradient(scoreBreakdown.risk).borderClass} hover:scale-105 transition-transform`}>
                  <div className={`text-3xl font-bold ${getScoreGradient(scoreBreakdown.risk).textClass}`}>{scoreBreakdown.risk}</div>
                  <div className="text-xs text-gray-700 font-semibold">Risk</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Policy Performance Summary */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <span>Policy Performance Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            
            {/* As on Today */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                As on Today
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">Current Status</Badge>
              </h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
                  <div className="text-xs text-gray-600 mb-1 font-medium">Total Premium Paid</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">{formatCurrency(performanceData.today.premiumPaid)}</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
                  <div className="text-xs text-gray-600 mb-1 font-medium">Total Payouts Received</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">{formatCurrency(performanceData.today.payoutsReceived)}</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
                  <div className="text-xs text-gray-600 mb-1 font-medium">Current Policy Value</div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">{formatCurrency(performanceData.today.currentValue)}</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 font-medium">Absolute Return</span>
                    {getReturnIcon(performanceData.today.absoluteReturn)}
                  </div>
                  <div className={`text-2xl font-bold ${getReturnColorClass(performanceData.today.absoluteReturn)}`}>
                    {performanceData.today.absoluteReturn > 0 ? '+' : ''}{performanceData.today.absoluteReturn}%
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 font-medium">IRR (Annual Return)</span>
                    {getReturnIcon(performanceData.today.irr)}
                  </div>
                  <div className={`text-2xl font-bold ${getReturnColorClass(performanceData.today.irr)}`}>
                    {performanceData.today.irr > 0 ? '+' : ''}{performanceData.today.irr}%
                  </div>
                </div>
              </div>
            </div>

            {/* Future Projections */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Future Projections
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">After 3 Years</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600">Premium Paid</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(performanceData.after3Years.premiumPaid)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Total Payouts</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(performanceData.after3Years.totalPayouts)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Expected Value</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(performanceData.after3Years.expectedValue)}</div>
                    </div>
                    <div className="pt-2 border-t border-blue-300">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Absolute Return</span>
                        {getReturnIcon(performanceData.after3Years.absoluteReturn)}
                      </div>
                      <div className={`text-xl font-bold ${getReturnColorClass(performanceData.after3Years.absoluteReturn)}`}>
                        {performanceData.after3Years.absoluteReturn > 0 ? '+' : ''}{performanceData.after3Years.absoluteReturn}%
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">IRR</span>
                        {getReturnIcon(performanceData.after3Years.irr)}
                      </div>
                      <div className={`text-xl font-bold ${getReturnColorClass(performanceData.after3Years.irr)}`}>
                        {performanceData.after3Years.irr > 0 ? '+' : ''}{performanceData.after3Years.irr}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">After 6 Years</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600">Premium Paid</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(performanceData.after6Years.premiumPaid)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Total Payouts</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(performanceData.after6Years.totalPayouts)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Expected Value</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(performanceData.after6Years.expectedValue)}</div>
                    </div>
                    <div className="pt-2 border-t border-purple-300">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Absolute Return</span>
                        {getReturnIcon(performanceData.after6Years.absoluteReturn)}
                      </div>
                      <div className={`text-xl font-bold ${getReturnColorClass(performanceData.after6Years.absoluteReturn)}`}>
                        {performanceData.after6Years.absoluteReturn > 0 ? '+' : ''}{performanceData.after6Years.absoluteReturn}%
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">IRR</span>
                        {getReturnIcon(performanceData.after6Years.irr)}
                      </div>
                      <div className={`text-xl font-bold ${getReturnColorClass(performanceData.after6Years.irr)}`}>
                        {performanceData.after6Years.irr > 0 ? '+' : ''}{performanceData.after6Years.irr}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 hover:shadow-lg transition-shadow">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Till Maturity</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600">Premium Paid</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(performanceData.atMaturity.premiumPaid)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Total Payouts</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(performanceData.atMaturity.totalPayouts)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-600">Maturity Value</div>
                      <div className="text-lg font-bold text-gray-900">{formatCurrency(performanceData.atMaturity.maturityValue)}</div>
                    </div>
                    <div className="pt-2 border-t border-green-300">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Absolute Return</span>
                        {getReturnIcon(performanceData.atMaturity.absoluteReturn)}
                      </div>
                      <div className={`text-xl font-bold ${getReturnColorClass(performanceData.atMaturity.absoluteReturn)}`}>
                        {performanceData.atMaturity.absoluteReturn > 0 ? '+' : ''}{performanceData.atMaturity.absoluteReturn}%
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">IRR</span>
                        {getReturnIcon(performanceData.atMaturity.irr)}
                      </div>
                      <div className={`text-xl font-bold ${getReturnColorClass(performanceData.atMaturity.irr)}`}>
                        {performanceData.atMaturity.irr > 0 ? '+' : ''}{performanceData.atMaturity.irr}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Comparison of Returns */}
        <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <span>Comparison of Returns (IRR %)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {(['today', '3years', '6years', 'maturity'] as const).map((timeframe) => (
                <Button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  variant={selectedTimeframe === timeframe ? "default" : "outline"}
                  className={`px-6 py-4 rounded-2xl font-bold transition-all duration-300 text-sm md:text-base ${
                    selectedTimeframe === timeframe
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-xl scale-105 border-2 border-green-400"
                      : "border-2 border-gray-300 hover:border-green-400 text-gray-700 hover:text-green-600 hover:shadow-md bg-white"
                  }`}
                >
                  {getTimeframeLabel(timeframe)}
                </Button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={comparisonChartData[selectedTimeframe]} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis 
                    label={{ value: 'IRR (%)', angle: -90, position: 'insideLeft', style: { fill: '#374151', fontWeight: 600 } }}
                    tick={{ fill: '#374151', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '12px',
                      padding: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value: number | undefined) => [`${value ?? 0}%`, 'IRR']}
                    labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={800}>
                    {comparisonChartData[selectedTimeframe].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl border-2 border-pink-200">
                <div className="flex items-center justify-center mb-2">
                  <Star className="h-5 w-5 text-pink-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">Best Performer</p>
                </div>
                <p className="text-2xl font-bold text-pink-600">Naitri Portfolio</p>
                <p className="text-xs text-gray-600 mt-1">{comparisonChartData[selectedTimeframe][4].value}% IRR</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border-2 border-purple-200">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">Performance Gap</p>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  +{(comparisonChartData[selectedTimeframe][4].value - comparisonChartData[selectedTimeframe][0].value).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-600 mt-1">Naitri vs Your Policy</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
                <div className="flex items-center justify-center mb-2">
                  <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                  <p className="text-sm font-medium text-gray-700">Your Policy IRR</p>
                </div>
                <p className={`text-2xl font-bold ${getReturnColorClass(comparisonChartData[selectedTimeframe][0].value)}`}>
                  {comparisonChartData[selectedTimeframe][0].value > 0 ? '+' : ''}{comparisonChartData[selectedTimeframe][0].value}%
                </p>
                <p className="text-xs text-gray-600 mt-1">{getTimeframeLabel(selectedTimeframe)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Naitri Observation */}
        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 bg-amber-500 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <span>Naitri Observation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-xl border border-amber-200">
              <p className="text-gray-700 leading-relaxed text-base">
                You may have purchased this policy based on trust in your agent, without full clarity on annualized returns. 
                The current rating of your policy is moderate — in terms of returns, it lags behind Mutual Funds and the Naitri Portfolio. 
                However, you&apos;re not alone — many people face the same situation. 
                <strong className="text-gray-900"> Naitri is your financial friend, here to guide you with possible solutions.</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 5. Naitri Solution */}
        <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 shadow-xl">
          <CardHeader className="border-b border-green-200">
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center space-x-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <span>Naitri Solution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            
            <div className={`p-6 rounded-2xl border-2 ${
              naitriLogic.shouldSwitch 
                ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300" 
                : "bg-gradient-to-r from-blue-100 to-sky-100 border-blue-300"
            }`}>
              <div className="flex items-start gap-3">
                <CheckCircle className={`h-7 w-7 flex-shrink-0 mt-1 ${naitriLogic.shouldSwitch ? 'text-green-600' : 'text-blue-600'}`} />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {naitriLogic.shouldSwitch ? "✅ Recommendation: Switch to Naitri Portfolio" : "✅ Recommendation: Continue with Existing Policy"}
                  </h3>
                  <p className="text-gray-700">
                    {naitriLogic.shouldSwitch 
                      ? "Based on our analysis, switching to Naitri Portfolio can potentially give you significantly better returns while maintaining similar or better risk-adjusted performance."
                      : "Based on our analysis, your current policy provides competitive returns when considering the guaranteed benefits, insurance cover, and lower volatility compared to market-linked investments."
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-green-200">
              <h4 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-green-600" />
                <span>Suggested Naitri Action Plan</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-800">Lump Sum Investment</span>
                    <Badge variant="secondary" className="bg-blue-600 text-white">One-time</Badge>
                  </div>
                  <p className="text-3xl font-bold text-blue-600 mb-2">₹{naitriActionPlan.lumpSum.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Equivalent to your current Surrender Value</p>
                </div>
                
                <div className="p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-2 border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-800">Monthly SIP</span>
                    <Badge variant="secondary" className="bg-green-600 text-white">Monthly</Badge>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-2">₹{naitriActionPlan.monthlySIP.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Equivalent to your current yearly premium, divided monthly</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-xl overflow-hidden border-2 border-gray-200">
                  <thead className="bg-gradient-to-r from-gray-100 to-gray-50">
                    <tr>
                      <th className="text-left py-4 px-6 font-bold text-gray-800 border-b-2 border-gray-300">Parameter</th>
                      <th className="text-center py-4 px-6 font-bold text-gray-800 border-b-2 border-gray-300">Existing Policy</th>
                      <th className="text-center py-4 px-6 font-bold text-green-700 border-b-2 border-gray-300">Naitri Portfolio</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900">Maturity Year</td>
                      <td className="py-4 px-6 text-center text-gray-700 font-medium">{naitriActionPlan.maturityYear}</td>
                      <td className="py-4 px-6 text-center text-gray-700 font-medium">{naitriActionPlan.naitriMaturityYear}</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900">Maturity Amount (₹)</td>
                      <td className="py-4 px-6 text-center text-gray-700 font-medium">₹{naitriActionPlan.maturityAmount.toLocaleString()}</td>
                      <td className="py-4 px-6 text-center text-green-700 font-bold text-lg">₹{naitriActionPlan.naitriMaturityAmount.toLocaleString()}</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900">Annual Return (XIRR)</td>
                      <td className="py-4 px-6 text-center text-gray-700 font-medium">{naitriActionPlan.annualReturn}%</td>
                      <td className="py-4 px-6 text-center text-green-700 font-bold text-lg">{naitriActionPlan.naitriAnnualReturn}%</td>
                    </tr>
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-gray-900">Absolute Return</td>
                      <td className="py-4 px-6 text-center text-gray-700 font-medium">{naitriActionPlan.absoluteReturn}%</td>
                      <td className="py-4 px-6 text-center text-green-700 font-bold text-lg">{naitriActionPlan.naitriAbsoluteReturn}%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-green-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Additional Gain with Naitri Solution</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-5 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl border-2 border-green-300 hover:scale-105 transition-transform">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Additional Value (₹)</p>
                  <p className="text-3xl font-bold text-green-600">₹{additionalGains.additionalValue.toLocaleString()}</p>
                </div>
                <div className="text-center p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-300 hover:scale-105 transition-transform">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Extra Absolute Return (%)</p>
                  <p className="text-3xl font-bold text-blue-600">+{additionalGains.extraAbsoluteReturn}%</p>
                </div>
                <div className="text-center p-5 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-2 border-purple-300 hover:scale-105 transition-transform">
                  <p className="text-sm text-gray-600 mb-2 font-medium">Extra Annual Return (%)</p>
                  <p className="text-3xl font-bold text-purple-600">+{additionalGains.extraAnnualReturn.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call-to-Action Buttons */}
        <Card className="border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-xl">
          <CardHeader className="text-center border-b border-indigo-200 pb-4">
            <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">
              Ready to Take Action?
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">Choose your next step towards better returns</p>
          </CardHeader>
          <CardContent className="pt-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              
              <Button 
                onClick={() => setShowCashflowDialog(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 md:p-8 rounded-2xl font-bold flex flex-col items-center justify-center space-y-3 h-auto shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <Eye className="h-8 w-8" />
                </div>
                <span className="text-base md:text-lg">View Cashflow Comparison</span>
                <span className="text-xs opacity-80">See detailed year-by-year breakdown</span>
              </Button>
              
              <Button 
                onClick={() => setShowPortfolioDialog(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 md:p-8 rounded-2xl font-bold flex flex-col items-center justify-center space-y-3 h-auto shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <PieChart className="h-8 w-8" />
                </div>
                <span className="text-base md:text-lg">Explore Naitri Portfolio</span>
                <span className="text-xs opacity-80">Discover our investment strategy</span>
              </Button>
              
              <Button 
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 text-white p-6 md:p-8 rounded-2xl font-bold flex flex-col items-center justify-center space-y-3 h-auto shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group disabled:scale-100 disabled:cursor-not-allowed"
              >
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <Download className={`h-8 w-8 ${isGeneratingPDF ? 'animate-bounce' : ''}`} />
                </div>
                <span className="text-base md:text-lg">{isGeneratingPDF ? 'Generating...' : 'Download Full Report (PDF)'}</span>
                <span className="text-xs opacity-80">{isGeneratingPDF ? 'Please wait' : 'Get PDF with detailed analysis'}</span>
              </Button>
              
              <Button 
                onClick={() => setShowContactDialog(true)}
                className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white p-6 md:p-8 rounded-2xl font-bold flex flex-col items-center justify-center space-y-3 h-auto shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                  <Phone className="h-8 w-8" />
                </div>
                <span className="text-base md:text-lg">Need Help to Switch?</span>
                <span className="text-xs opacity-80">Connect with our experts</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cashflow Comparison Dialog */}
      <Dialog open={showCashflowDialog} onOpenChange={setShowCashflowDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
              <Eye className="h-6 w-6 text-blue-600" />
              <span>Detailed Cashflow Comparison</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Year-by-year comparison of your policy vs Naitri Portfolio
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto mt-4">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-100 to-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-800">Year</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-800">Your Policy</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-800">Naitri Portfolio</th>
                  <th className="px-4 py-3 text-right text-sm font-bold text-gray-800">Difference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 3, 5, 10, 15, 20].map((year) => {
                  const policyValue = 600000 * Math.pow((1 + 0.072), year);
                  const naitriValue = 600000 * Math.pow((1 + 0.145), year);
                  const difference = naitriValue - policyValue;
                  return (
                    <tr key={year} className="hover:bg-blue-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">Year {year}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-700">₹{Math.round(policyValue).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right text-green-600 font-semibold">₹{Math.round(naitriValue).toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right text-purple-600 font-semibold">+₹{Math.round(difference).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Portfolio Strategy Dialog */}
      <Dialog open={showPortfolioDialog} onOpenChange={setShowPortfolioDialog}>
        <DialogContent className="max-w-3xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
              <PieChart className="h-6 w-6 text-green-600" />
              <span>Naitri Portfolio Strategy</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Diversified investment approach for optimal returns
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Asset Allocation
              </h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 font-medium">Equity Funds</span>
                    <span className="font-bold text-green-600">60%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000" style={{ width: '60%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 font-medium">Debt Funds</span>
                    <span className="font-bold text-blue-600">30%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700 font-medium">Gold/Commodities</span>
                    <span className="font-bold text-yellow-600">10%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full transition-all duration-1000" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Key Features
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2 text-sm text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Diversified across 15+ mutual funds</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Rebalanced quarterly by experts</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Low expense ratio (avg 0.8%)</span>
                </li>
                <li className="flex items-start space-x-2 text-sm text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Target return: 9-12% annually</span>
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Form Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center space-x-2">
              <Phone className="h-6 w-6 text-orange-600" />
              <span>Get Expert Assistance</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Our financial experts will guide you through the switching process
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time to Call</label>
              <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all bg-white">
                <option>Morning (9 AM - 12 PM)</option>
                <option>Afternoon (12 PM - 4 PM)</option>
                <option>Evening (4 PM - 7 PM)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
                Request Callback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

