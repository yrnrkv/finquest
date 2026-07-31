'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface QuestResultProps {
  score: number;
  questName: string;
  moduleName: string;
  crisisTriggered: boolean;
  questNumber: number;
  totalQuests: number;
  onNext: () => void;
}

export function QuestResult({
  score,
  questName,
  moduleName,
  crisisTriggered,
  questNumber,
  totalQuests,
  onNext,
}: QuestResultProps) {
  const getScoreCategory = () => {
    if (score >= 85) return { label: 'Excellent', color: 'text-accent' };
    if (score >= 70) return { label: 'Good', color: 'text-secondary' };
    if (score >= 50) return { label: 'Fair', color: 'text-muted-foreground' };
    return { label: 'Needs Improvement', color: 'text-destructive' };
  };

  const scoreCategory = getScoreCategory();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-foreground">{moduleName}</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="bg-gradient-to-br from-card to-card/50 border-border/50 overflow-hidden">
          <CardHeader className="text-center pt-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl text-foreground mb-2">Quest Complete!</CardTitle>
            <CardDescription className="text-lg">{questName}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 pb-12">
            {/* Score Display */}
            <div className="bg-background/50 p-8 rounded-lg border border-border/50 text-center space-y-4">
              <div className="space-y-2">
                <p className="text-muted-foreground">Your Score</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className={`text-6xl font-bold ${scoreCategory.color}`}>{score}</span>
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
              </div>
              <Progress value={score} className="h-3" />
              <Badge className={`${scoreCategory.color === 'text-accent' ? 'bg-accent text-accent-foreground' : scoreCategory.color === 'text-secondary' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {scoreCategory.label}
              </Badge>
            </div>

            {/* Quest Progress */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-foreground">Module Progress</p>
                <span className="text-sm text-muted-foreground">{questNumber}/{totalQuests} quests</span>
              </div>
              <Progress value={(questNumber / totalQuests) * 100} className="h-2" />
            </div>

            {/* Crisis Alert */}
            {crisisTriggered && (
              <Alert className="bg-destructive/10 border-destructive/30">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <AlertDescription className="text-foreground">
                  <span className="font-semibold">Crisis Scenario Triggered!</span>
                  <p className="mt-2">A financial emergency has occurred in your scenario. Use this as a learning opportunity to understand crisis management and emergency fund importance.</p>
                </AlertDescription>
              </Alert>
            )}

            {/* Educational Insight */}
            <div className="bg-secondary/10 border-l-4 border-secondary p-6 rounded-lg space-y-3">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Learning Points</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>✓ Emergency fund should contain 3-6 months of expenses</li>
                    <li>✓ Aim for a 20% savings rate where possible</li>
                    <li>✓ Risk tolerance should match your timeline and goals</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* AI Feedback */}
            <Alert className="bg-secondary/10 border-secondary/30">
              <AlertDescription className="text-foreground">
                <div className="font-semibold text-secondary mb-2">AI Adaptive Learning</div>
                <p>Your difficulty level has been adjusted based on this performance. Continue to master this module or move on to the next challenge!</p>
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={onNext}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg"
              >
                {questNumber === totalQuests ? 'Complete Module' : 'Next Quest'}
              </Button>
            </div>

            {/* Footer Message */}
            {questNumber === totalQuests && (
              <div className="text-center pt-4 border-t border-border/50">
                <p className="text-muted-foreground text-sm">You've completed all quests in this module! Head back to your dashboard to start the next module or see your NFT certificate.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
