import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star, Clock, Target, Users } from "lucide-react";

interface LeadData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  website: string;
  goals: string;
  source: string;
  location: string;
}

interface LeadScore {
  totalScore: number;
  category: 'hot' | 'warm' | 'cold';
  factors: Array<{
    factor: string;
    score: number;
    weight: number;
    description: string;
  }>;
  recommendations: string[];
  priority: number;
}

export const useLeadScoring = (leadData: LeadData): LeadScore => {
  const calculateScore = (): LeadScore => {
    let totalScore = 0;
    const factors: LeadScore['factors'] = [];

    // Budget scoring (40% weight)
    const budgetScores = {
      'over-100k': { score: 100, weight: 40 },
      '50k-100k': { score: 80, weight: 40 },
      '25k-50k': { score: 60, weight: 40 },
      '10k-25k': { score: 40, weight: 40 },
      'under-10k': { score: 20, weight: 40 }
    };
    
    const budgetScore = budgetScores[leadData.budget as keyof typeof budgetScores] || { score: 0, weight: 40 };
    factors.push({
      factor: 'Budget Range',
      score: budgetScore.score,
      weight: budgetScore.weight,
      description: `Budget of ${leadData.budget} indicates ${budgetScore.score > 60 ? 'high' : budgetScore.score > 30 ? 'medium' : 'low'} purchasing power`
    });
    totalScore += (budgetScore.score * budgetScore.weight) / 100;

    // Timeline scoring (25% weight)
    const timelineScores = {
      'asap': { score: 90, weight: 25 },
      '1-month': { score: 80, weight: 25 },
      '2-months': { score: 60, weight: 25 },
      '3-months': { score: 40, weight: 25 },
      'flexible': { score: 20, weight: 25 }
    };
    
    const timelineScore = timelineScores[leadData.timeline as keyof typeof timelineScores] || { score: 0, weight: 25 };
    factors.push({
      factor: 'Timeline Urgency',
      score: timelineScore.score,
      weight: timelineScore.weight,
      description: `Timeline of ${leadData.timeline} shows ${timelineScore.score > 60 ? 'high' : timelineScore.score > 30 ? 'medium' : 'low'} urgency`
    });
    totalScore += (timelineScore.score * timelineScore.weight) / 100;

    // Service type scoring (15% weight)
    const serviceScores = {
      'law-firm': { score: 85, weight: 15 },
      'consulting': { score: 80, weight: 15 },
      'financial': { score: 75, weight: 15 },
      'luxury': { score: 90, weight: 15 },
      'real-estate': { score: 70, weight: 15 },
      'ecommerce': { score: 65, weight: 15 },
      'other': { score: 50, weight: 15 }
    };
    
    const serviceScore = serviceScores[leadData.service as keyof typeof serviceScores] || { score: 0, weight: 15 };
    factors.push({
      factor: 'Service Type',
      score: serviceScore.score,
      weight: serviceScore.weight,
      description: `${leadData.service} is a ${serviceScore.score > 70 ? 'high-value' : serviceScore.score > 50 ? 'medium-value' : 'lower-value'} service`
    });
    totalScore += (serviceScore.score * serviceScore.weight) / 100;

    // Company size scoring (10% weight)
    const hasCompany = leadData.company && leadData.company.trim().length > 0;
    const companyScore = hasCompany ? 70 : 30;
    factors.push({
      factor: 'Company Information',
      score: companyScore,
      weight: 10,
      description: hasCompany ? 'Company name provided indicates B2B intent' : 'No company info - may be individual'
    });
    totalScore += (companyScore * 10) / 100;

    // Website presence scoring (5% weight)
    const hasWebsite = leadData.website && leadData.website.trim().length > 0;
    const websiteScore = hasWebsite ? 60 : 40;
    factors.push({
      factor: 'Current Website',
      score: websiteScore,
      weight: 5,
      description: hasWebsite ? 'Has existing website - upgrade potential' : 'No website - new build opportunity'
    });
    totalScore += (websiteScore * 5) / 100;

    // Goals clarity scoring (5% weight)
    const hasGoals = leadData.goals && leadData.goals.trim().length > 10;
    const goalsScore = hasGoals ? 80 : 30;
    factors.push({
      factor: 'Goals Clarity',
      score: goalsScore,
      weight: 5,
      description: hasGoals ? 'Clear goals provided - serious inquiry' : 'Vague goals - needs qualification'
    });
    totalScore += (goalsScore * 5) / 100;

    // Determine category
    let category: 'hot' | 'warm' | 'cold';
    if (totalScore >= 70) category = 'hot';
    else if (totalScore >= 40) category = 'warm';
    else category = 'cold';

    // Generate recommendations
    const recommendations: string[] = [];
    if (category === 'hot') {
      recommendations.push('Respond as soon as possible');
      recommendations.push('Schedule a call immediately');
      recommendations.push('Prepare detailed proposal');
      recommendations.push('Offer priority timeline');
    } else if (category === 'warm') {
      recommendations.push('Respond as soon as possible');
      recommendations.push('Send case studies');
      recommendations.push('Schedule discovery call');
      recommendations.push('Nurture with valuable content');
    } else {
      recommendations.push('Respond as soon as possible');
      recommendations.push('Qualify further via email');
      recommendations.push('Add to nurture sequence');
      recommendations.push('Focus on education over sales');
    }

    // Calculate priority (1-10)
    const priority = Math.round((totalScore / 10) + 1);

    return {
      totalScore: Math.round(totalScore),
      category,
      factors,
      recommendations,
      priority
    };
  };

  return calculateScore();
};

export const LeadScoreDisplay = ({ leadData }: { leadData: LeadData }) => {
  const leadScore = useLeadScoring(leadData);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hot': return 'bg-red-100 text-red-800 border-red-200';
      case 'warm': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cold': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hot': return <Target className="w-4 h-4" />;
      case 'warm': return <TrendingUp className="w-4 h-4" />;
      case 'cold': return <Users className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>Lead Score</span>
          </CardTitle>
          <Badge className={`${getCategoryColor(leadScore.category)} flex items-center space-x-1`}>
            {getCategoryIcon(leadScore.category)}
            <span className="capitalize">{leadScore.category} Lead</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Score</span>
            <span className="text-lg font-bold">{leadScore.totalScore}/100</span>
          </div>
          <Progress value={leadScore.totalScore} className="h-3" />
        </div>

        {/* Scoring Factors */}
        <div>
          <h4 className="font-semibold mb-3">Scoring Breakdown</h4>
          <div className="space-y-3">
            {leadScore.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{factor.factor}</span>
                    <span className="text-xs text-gray-500">{factor.score}pts</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${factor.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <h4 className="font-semibold mb-3 flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Recommended Actions</span>
          </h4>
          <div className="space-y-2">
            {leadScore.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Indicator */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Priority Level</span>
            <div className="flex space-x-1">
              {[...Array(10)].map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index < leadScore.priority ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

