'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Module, StudentProgress } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Lock } from 'lucide-react';

interface ModuleCardProps {
  module: Module;
  progress?: StudentProgress;
  isSelected: boolean;
  onSelect: () => void;
}

export function ModuleCard({ module, progress, isSelected, onSelect }: ModuleCardProps) {
  const router = useRouter();

  const getStatusIcon = () => {
    if (progress?.status === 'completed') {
      return <CheckCircle className="w-5 h-5 text-accent" />;
    }
    if (progress?.status === 'in_progress') {
      return <Clock className="w-5 h-5 text-secondary" />;
    }
    return <Lock className="w-5 h-5 text-muted-foreground" />;
  };

  const getStatusLabel = () => {
    return progress?.status || 'not_started';
  };

  const difficultyColor = {
    beginner: 'bg-accent text-accent-foreground',
    intermediate: 'bg-secondary text-secondary-foreground',
    advanced: 'bg-destructive text-destructive-foreground',
  };

  const isLocked = !progress || progress.status === 'not_started';

  return (
    <Card
      className={`bg-gradient-to-br from-card to-card/50 border-border/50 cursor-pointer transition-all hover:border-primary/50 ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground">{module.name}</CardTitle>
            <CardDescription className="text-muted-foreground">{module.description}</CardDescription>
          </div>
          {getStatusIcon()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Difficulty Badge */}
        <div className="flex items-center gap-2">
          <Badge className={difficultyColor[module.difficultyLevel]}>
            {module.difficultyLevel}
          </Badge>
        </div>

        {/* Progress Bar */}
        {progress && progress.status !== 'not_started' && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-semibold">{progress.currentScore}%</span>
            </div>
            <Progress value={progress.currentScore} className="h-2" />
          </div>
        )}

        {/* AI Adaptive Learning Badge */}
        {progress?.status === 'in_progress' && (
          <div className="text-xs text-secondary font-medium">
            AI adaptive learning enabled
          </div>
        )}

        {/* Status and Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-muted-foreground capitalize">{getStatusLabel()}</span>
          <Button
            size="sm"
            variant={isLocked || progress?.status === 'completed' ? 'outline' : 'default'}
            className={`${
              isLocked || progress?.status === 'completed'
                ? 'border-border text-muted-foreground hover:bg-card'
                : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isLocked && progress?.status !== 'completed') {
                router.push(`/quest/${module.id}`);
              }
            }}
            disabled={isLocked}
          >
            {progress?.status === 'completed' ? 'Review' : 'Start'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
