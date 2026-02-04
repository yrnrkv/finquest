'use client';

import React, { useState } from 'react';
import { LearningMaterial, SlideContent } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SlideshowViewerProps {
  material: LearningMaterial;
}

export function SlideshowViewer({ material }: SlideshowViewerProps) {
  const slideContent = material.content as SlideContent;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = slideContent.slides[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < slideContent.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleJumpToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  return (
    <div className="space-y-6">
      {/* Slide Display */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50 rounded-lg p-8 min-h-96 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-4">{currentSlide.title}</h2>
          <p className="text-lg text-foreground/90 mb-6 whitespace-pre-wrap">{currentSlide.content}</p>
          {currentSlide.imageUrl && (
            <img
              src={currentSlide.imageUrl || "/placeholder.svg"}
              alt={currentSlide.title}
              className="w-full max-w-md rounded-lg mb-4"
            />
          )}
        </div>

        {currentSlide.notes && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border/50">
            <p className="text-sm text-muted-foreground italic">
              <span className="font-semibold">Teaching Note:</span> {currentSlide.notes}
            </p>
          </div>
        )}
      </div>

      {/* Slide Navigation */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          variant="outline"
          className="gap-2 bg-transparent"
        >
          ← Previous
        </Button>

        <Badge variant="outline" className="text-base px-3 py-1">
          Slide {currentSlideIndex + 1} of {slideContent.slides.length}
        </Badge>

        <Button
          onClick={handleNext}
          disabled={currentSlideIndex === slideContent.slides.length - 1}
          className="gap-2"
        >
          Next →
        </Button>
      </div>

      {/* Slide Thumbnails */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Jump to slide:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {slideContent.slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleJumpToSlide(index)}
              className={`p-3 rounded-lg text-sm font-medium transition-colors border ${
                currentSlideIndex === index
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border/50 text-foreground hover:border-primary/50'
              }`}
            >
              <span className="line-clamp-2">{slide.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
