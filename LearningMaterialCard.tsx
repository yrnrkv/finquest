'use client';

import React from 'react';
import { LearningMaterial } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface LearningMaterialCardProps {
  material: LearningMaterial;
  onDelete: () => void;
}

export function LearningMaterialCard({ material, onDelete }: LearningMaterialCardProps) {
  return (
    <Card className="bg-card border-border/50 hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{material.title}</CardTitle>
            <CardDescription className="mt-1">{material.description}</CardDescription>
          </div>
          <Badge className="whitespace-nowrap">
            {material.type === 'video' ? '▶ Video' : '📊 Slides'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="capitalize">
              {material.createdBy === 'system' ? 'Pre-made' : 'Teacher Added'}
            </Badge>
            {material.classId && (
              <Badge variant="outline">Class Specific</Badge>
            )}
          </div>

          {material.type === 'video' && 'youtubeUrl' in material.content && (
            <div className="text-sm text-muted-foreground">
              Duration: {(material.content as any).duration} minutes
            </div>
          )}

          {material.type === 'slideshow' && 'slides' in material.content && (
            <div className="text-sm text-muted-foreground">
              {(material.content as any).slides.length} slides
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button
              onClick={onDelete}
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive bg-transparent"
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
