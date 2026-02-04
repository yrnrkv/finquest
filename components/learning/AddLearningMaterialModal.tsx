'use client';

import React, { useState } from 'react';
import { LearningMaterial, VideoContent, SlideContent } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface AddLearningMaterialModalProps {
  moduleId: string;
  classId: string;
  isClassSpecific?: boolean;
  onClose: () => void;
  onCreate: (material: Omit<LearningMaterial, 'id' | 'createdAt'>) => void;
}

export function AddLearningMaterialModal({
  moduleId,
  classId,
  isClassSpecific = false,
  onClose,
  onCreate,
}: AddLearningMaterialModalProps) {
  const [contentType, setContentType] = useState<'video' | 'slideshow'>('video');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    duration: '10',
    isClassSpecific: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    const content: VideoContent | SlideContent = contentType === 'video' 
      ? {
          id: `video-${Date.now()}`,
          title: formData.title,
          description: formData.description,
          youtubeUrl: formData.youtubeUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          duration: parseInt(formData.duration) || 10,
          thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        }
      : {
          id: `slide-${Date.now()}`,
          title: formData.title,
          description: formData.description,
          slides: [
            {
              id: `slide-${Date.now()}-1`,
              title: 'Slide 1',
              content: 'Add your content here',
              notes: 'Teaching notes',
            },
            {
              id: `slide-${Date.now()}-2`,
              title: 'Slide 2',
              content: 'Continue with more content',
              notes: 'Additional notes',
            },
          ],
        };

    onCreate({
      moduleId,
      classId: formData.isClassSpecific ? classId : undefined,
      title: formData.title,
      description: formData.description,
      type: contentType,
      content,
      createdBy: 'teacher',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-card border-border w-full max-w-md">
        <CardHeader>
          <CardTitle>Add Learning Material</CardTitle>
          <CardDescription>Create a new video or slideshow for your students</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Content Type Selector */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-3 block">Content Type</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setContentType('video')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    contentType === 'video'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  ▶ Video
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('slideshow')}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    contentType === 'slideshow'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  📊 Slides
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Title *</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Introduction to Budgeting"
                className="bg-muted border-border/50"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the content"
                rows={3}
                className="w-full px-3 py-2 bg-muted border border-border/50 rounded-lg text-foreground focus:outline-none focus:border-primary"
              />
            </div>

            {/* Video URL (only for videos) */}
            {contentType === 'video' && (
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">YouTube URL</label>
                <Input
                  type="text"
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/embed/..."
                  className="bg-muted border-border/50"
                />
              </div>
            )}

            {/* Duration (only for videos) */}
            {contentType === 'video' && (
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">Duration (minutes)</label>
                <Input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  className="bg-muted border-border/50"
                />
              </div>
            )}

            {/* Class Specific Toggle */}
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <input
                type="checkbox"
                name="isClassSpecific"
                checked={formData.isClassSpecific}
                onChange={(e) => setFormData(prev => ({ ...prev, isClassSpecific: e.target.checked }))}
                className="w-4 h-4"
              />
              <label className="text-sm text-foreground">Make this class-specific</label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Create Material
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
