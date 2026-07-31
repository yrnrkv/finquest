'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockAIProfile, mockStudentProgress, mockQuests } from '@/lib/mock-data';
import { GraduationCap, Trophy, TrendingUp, Share2 } from 'lucide-react';

export function EndJourneyDisplay() {
  const router = useRouter();
  const { user } = useAuth();

  // Calculate achievement stats
  const completedQuests = mockQuests.length; // For demo, assume all quests done
  const totalLearningTime = Math.round(completedQuests * 15 + Math.random() * 60); // 15-20 min per quest
  const skillsAcquired = ['Budgeting', 'Savings Planning', 'Risk Assessment', 'Financial Decision Making'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Celebration Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-primary to-secondary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-accent to-secondary opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Celebration Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <GraduationCap className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Your Journey Complete!
          </h1>
          <p className="text-xl text-muted-foreground">
            Congratulations, {user?.fullName}! You've mastered financial literacy.
          </p>
        </div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-card border-primary/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-primary">
                  {mockStudentProgress.length}
                </div>
                <p className="text-muted-foreground">Modules Completed</p>
                <div className="flex gap-1 justify-center">
                  {[...Array(mockStudentProgress.length)].map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-primary"></div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-card border-secondary/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-secondary">{completedQuests}</div>
                <p className="text-muted-foreground">Quests Conquered</p>
                <Trophy className="w-6 h-6 text-secondary mx-auto" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-card border-accent/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <div className="text-4xl font-bold text-accent">{totalLearningTime} min</div>
                <p className="text-muted-foreground">Time Invested</p>
                <TrendingUp className="w-6 h-6 text-accent mx-auto" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Summary */}
        <Card className="bg-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-secondary" />
              Your Final Performance
            </CardTitle>
            <CardDescription>Based on all completed quests and modules</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border border-border/50">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">Financial Health Score</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-primary">
                    {Math.round(mockAIProfile.averageScore)}
                  </span>
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
              </div>
            </div>

            {/* AI Profile Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background/50 p-4 rounded-lg border border-border/50 text-center">
                <p className="text-xs text-muted-foreground mb-2">Difficulty Mastered</p>
                <Badge className="bg-secondary text-secondary-foreground capitalize">
                  {mockAIProfile.difficultyLevel}
                </Badge>
              </div>
              <div className="bg-background/50 p-4 rounded-lg border border-border/50 text-center">
                <p className="text-xs text-muted-foreground mb-2">Learning Pace</p>
                <Badge className="bg-accent text-accent-foreground capitalize">
                  {mockAIProfile.learningPace}
                </Badge>
              </div>
              <div className="bg-background/50 p-4 rounded-lg border border-border/50 text-center">
                <p className="text-xs text-muted-foreground mb-2">Risk Tolerance</p>
                <Badge className="bg-primary text-primary-foreground capitalize">
                  {mockAIProfile.riskTolerance}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Acquired */}
        <Card className="bg-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle>Skills You've Acquired</CardTitle>
            <CardDescription>Competencies developed through your FinQuest journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skillsAcquired.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-border/50"
                >
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-accent-foreground font-bold">✓</span>
                  </div>
                  <span className="font-medium text-foreground">{skill}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badges/Achievements */}
        <Card className="bg-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle>Achievements Unlocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {['🎓', '💰', '📈', '🏆', '🎯', '✨'].map((badge, i) => (
                <div key={i} className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
                  <span className="text-3xl block mb-2">{badge}</span>
                  <p className="text-xs text-muted-foreground">Achievement</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Call to Actions */}
        <div className="space-y-4 mb-8">
          {/* Primary CTA - Certificate */}
          <Button
            onClick={() => router.push('/certificate')}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground py-7 text-lg font-semibold"
          >
            View Your NFT Certificate
          </Button>

          {/* Share Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=I just completed the FinQuest Financial Literacy Program! 🎓💰 My Financial Health Score: ${Math.round(mockAIProfile.averageScore)}/100. Ready to master money management!`,
                  '_blank'
                )
              }
              variant="outline"
              className="border-border hover:bg-card text-foreground py-6 flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share on Twitter
            </Button>

            <Button
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/feed/?shareActive=true&text=Excited to announce that I've completed the FinQuest Financial Literacy Program! 🎓 I've earned my NFT certificate and scored ${Math.round(mockAIProfile.averageScore)}/100 on financial health. Join me in mastering money management!`,
                  '_blank'
                )
              }
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share on LinkedIn
            </Button>
          </div>

          {/* Back to Dashboard */}
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            className="w-full border-border hover:bg-card text-foreground py-6"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* What's Next */}
        <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/30">
          <CardHeader>
            <CardTitle className="text-lg">What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-foreground">
            <p>✓ Share your achievements on social media</p>
            <p>✓ Download and share your NFT certificate</p>
            <p>✓ Continue learning with advanced modules (coming soon)</p>
            <p>✓ Help other students on their financial journey</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
