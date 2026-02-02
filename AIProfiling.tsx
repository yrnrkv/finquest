'use client';

import React from 'react';
import { StudentAIProfile } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';

interface AIProfilingProps {
  aiProfile: StudentAIProfile;
}

export function AIProfiling({ aiProfile }: AIProfilingProps) {
  const profileItems = [
    {
      label: 'Difficulty Level',
      value: aiProfile.difficultyLevel,
      bgColor: 'bg-secondary text-secondary-foreground',
      description: 'Adaptive difficulty based on your performance',
    },
    {
      label: 'Learning Pace',
      value: aiProfile.learningPace,
      bgColor: 'bg-primary text-primary-foreground',
      description: 'Customized based on your speed and comprehension',
    },
    {
      label: 'Risk Tolerance',
      value: aiProfile.riskTolerance,
      bgColor: 'bg-accent text-accent-foreground',
      description: 'Your preferred financial risk level',
    },
  ];

  return (
    <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-border/50 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-bold">
            AI
          </div>
          Your AI Learning Profile
        </CardTitle>
        <CardDescription>Personalized learning preferences powered by AI adaptation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Alert Info */}
        <div className="flex items-start gap-3 p-4 bg-background/50 rounded-lg border border-border/50">
          <AlertCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            Your learning profile is updated in real-time based on your quest performance. The AI adjusts difficulty, pace, and scenarios to maximize your learning outcomes.
          </p>
        </div>

        {/* Profile Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profileItems.map((item) => (
            <div key={item.label} className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">{item.label}</label>
              </div>
              <Badge className={`${item.bgColor} capitalize text-base py-2 px-3`}>
                {item.value}
              </Badge>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Quests Completed</label>
              <span className="text-sm font-semibold text-primary">{aiProfile.totalQuestsCompleted}</span>
            </div>
            <Progress value={Math.min((aiProfile.totalQuestsCompleted / 10) * 100, 100)} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">Average Score</label>
              <span className="text-sm font-semibold text-accent">{aiProfile.averageScore.toFixed(1)}/100</span>
            </div>
            <Progress value={aiProfile.averageScore} className="h-2" />
          </div>
        </div>

        {/* Crisis Preference */}
        <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg border border-destructive/20">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Crisis Scenario Preference</p>
            <p className="text-xs text-muted-foreground">Real-world financial challenges in your quests</p>
          </div>
          <Badge variant={aiProfile.crisisScenarioPreference ? 'default' : 'secondary'}>
            {aiProfile.crisisScenarioPreference ? 'Enabled' : 'Disabled'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
