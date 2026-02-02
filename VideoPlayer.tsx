'use client';

import React from 'react';
import { LearningMaterial, VideoContent } from '@/lib/types';

interface VideoPlayerProps {
  material: LearningMaterial;
}

export function VideoPlayer({ material }: VideoPlayerProps) {
  const video = material.content as VideoContent;

  return (
    <div className="space-y-6">
      {/* Video Container */}
      <div className="aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={video.youtubeUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>

      {/* Video Info */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{video.title}</h3>
          <p className="text-muted-foreground">{video.description}</p>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{video.duration} minutes</span>
        </div>
      </div>
    </div>
  );
}
