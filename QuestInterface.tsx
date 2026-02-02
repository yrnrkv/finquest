'use client';

import React, { useState } from 'react';
import { Module, Quest } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertTriangle, CheckCircle, TrendingUp, ArrowLeft } from 'lucide-react';
import { QuestResult } from './QuestResult';
import { useRouter } from 'next/navigation';

interface QuestInterfaceProps {
  quest: Quest;
  module: Module;
  questNumber: number;
  totalQuests: number;
  onComplete: () => void;
}

export function QuestInterface({
  quest,
  module,
  questNumber,
  totalQuests,
  onComplete,
}: QuestInterfaceProps) {
  const router = useRouter();
  const [stage, setStage] = useState<'scenario' | 'input' | 'result'>('scenario');
  const [formData, setFormData] = useState({
    incomeAmount: '',
    savingsAmount: '',
    riskProfile: 'moderate',
  });
  const [score, setScore] = useState(0);
  const [crisisTriggered, setCrisisTriggered] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Simple scoring logic
    const income = parseInt(formData.incomeAmount) || 0;
    const savings = parseInt(formData.savingsAmount) || 0;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    // Calculate score based on savings rate and risk profile
    let calculatedScore = 50;
    if (savingsRate >= 20) calculatedScore += 30;
    else if (savingsRate >= 10) calculatedScore += 15;

    if (formData.riskProfile === 'moderate') calculatedScore += 10;
    else if (formData.riskProfile === 'conservative') calculatedScore += 5;

    // Random crisis trigger (20% chance)
    const isCrisisTrigger = Math.random() < 0.2;
    setCrisisTriggered(isCrisisTrigger);

    setScore(Math.min(calculatedScore, 100));

    // Generate feedback
    if (isCrisisTrigger) {
      setFeedback('A financial crisis has emerged! Review the educational materials to understand how to handle unexpected situations.');
    } else {
      setFeedback('Great job! Your financial decisions demonstrate solid money management skills.');
    }

    setStage('result');
  };

  if (stage === 'result') {
    return (
      <QuestResult
        score={score}
        questName={quest.questName}
        moduleName={module.name}
        crisisTriggered={crisisTriggered}
        questNumber={questNumber}
        totalQuests={totalQuests}
        onNext={onComplete}
      />
    );
  }

  const handleBack = () => {
    if (stage === 'input' || stage === 'result') {
      setStage('scenario');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-foreground">{module.name}</h1>
            </div>
            <Badge className="bg-secondary text-secondary-foreground">
              Quest {questNumber}/{totalQuests}
            </Badge>
          </div>
          <Progress value={(questNumber / totalQuests) * 100} className="h-2" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {stage === 'scenario' && (
          <div className="space-y-6">
            {/* Quest Card */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-border/50">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{quest.questName}</CardTitle>
                <CardDescription>{quest.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Scenario */}
                <div className="bg-background/50 p-6 rounded-lg border border-border/50">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Financial Scenario</h3>
                  <p className="text-foreground leading-relaxed">{quest.scenario}</p>
                </div>

                {/* Difficulty Info */}
                <Alert className="bg-accent/10 border-accent/30">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <AlertDescription className="text-foreground">
                    Difficulty Multiplier: <span className="font-bold text-accent">{quest.difficultyMultiplier}x</span>
                  </AlertDescription>
                </Alert>

                {/* Start Button */}
                <Button
                  onClick={() => setStage('input')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                >
                  Begin Quest
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {stage === 'input' && (
          <div className="space-y-6">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>Your Financial Decisions</CardTitle>
                <CardDescription>Input your financial choices for this scenario</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Income Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Monthly Income ($)</label>
                  <Input
                    type="number"
                    name="incomeAmount"
                    placeholder="3000"
                    value={formData.incomeAmount}
                    onChange={handleInputChange}
                    className="bg-input border-border"
                  />
                </div>

                {/* Savings Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Monthly Savings ($)</label>
                  <Input
                    type="number"
                    name="savingsAmount"
                    placeholder="500"
                    value={formData.savingsAmount}
                    onChange={handleInputChange}
                    className="bg-input border-border"
                  />
                </div>

                {/* Risk Profile Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Risk Profile</label>
                  <RadioGroup value={formData.riskProfile} onValueChange={(value) => setFormData((prev) => ({ ...prev, riskProfile: value }))}>
                    <div className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg border border-border/50">
                      <RadioGroupItem value="conservative" id="conservative" />
                      <label htmlFor="conservative" className="flex-1 cursor-pointer">
                        <p className="text-sm font-medium text-foreground">Conservative</p>
                        <p className="text-xs text-muted-foreground">Low risk, stable returns</p>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg border border-border/50">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <label htmlFor="moderate" className="flex-1 cursor-pointer">
                        <p className="text-sm font-medium text-foreground">Moderate</p>
                        <p className="text-xs text-muted-foreground">Balanced approach</p>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 bg-background/50 rounded-lg border border-border/50">
                      <RadioGroupItem value="aggressive" id="aggressive" />
                      <label htmlFor="aggressive" className="flex-1 cursor-pointer">
                        <p className="text-sm font-medium text-foreground">Aggressive</p>
                        <p className="text-xs text-muted-foreground">High risk, high reward</p>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Submit Button */}
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
                >
                  Submit Your Decisions
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
