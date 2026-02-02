'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle } from 'lucide-react';

interface StudentData {
  studentId: string;
  studentName: string;
  moduleId: string;
  moduleName: string;
  completedAt?: string;
  score: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

interface GradingInterfaceProps {
  student: StudentData;
  onClose: () => void;
}

export function GradingInterface({ student, onClose }: GradingInterfaceProps) {
  const [grade, setGrade] = useState('A');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate grading submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Card className="bg-gradient-to-br from-accent/10 to-card border-accent/30">
        <CardHeader className="text-center pt-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-accent-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl text-foreground">Grade Submitted</CardTitle>
          <CardDescription>The grade has been recorded and the student has been notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="bg-background border-border/50">
            <AlertDescription className="text-foreground">
              <strong>{student.studentName}</strong> received a grade of <strong>{grade}</strong> for{' '}
              <strong>{student.moduleName}</strong>
            </AlertDescription>
          </Alert>
          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border/50">
      <CardHeader>
        <CardTitle>Grade Student Work</CardTitle>
        <CardDescription>
          {student.studentName} - {student.moduleName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Student Performance Summary */}
        <div className="grid grid-cols-3 gap-4 bg-background/50 p-4 rounded-lg">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Score</p>
            <p className="text-2xl font-bold text-primary">{student.score}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            <p className="text-sm font-semibold text-foreground capitalize">{student.status}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Completed</p>
            <p className="text-sm font-semibold text-foreground">
              {student.completedAt ? 'Yes' : 'Pending'}
            </p>
          </div>
        </div>

        {/* Grade Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Letter Grade</label>
          <RadioGroup value={grade} onValueChange={setGrade}>
            <div className="grid grid-cols-5 gap-3">
              {['A', 'B', 'C', 'D', 'F'].map((g) => (
                <div key={g} className="flex items-center space-x-2">
                  <RadioGroupItem value={g} id={`grade-${g}`} />
                  <label
                    htmlFor={`grade-${g}`}
                    className="flex items-center justify-center w-12 h-12 rounded-lg border border-border/50 bg-background cursor-pointer hover:bg-card font-bold text-lg text-foreground"
                  >
                    {g}
                  </label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Feedback Textarea */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Feedback & Comments</label>
          <Textarea
            placeholder="Provide constructive feedback for the student. Mention strengths, areas for improvement, and suggestions for the next module."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground min-h-32"
          />
        </div>

        {/* Quick Suggestions */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">Quick Templates</label>
          <div className="flex gap-2 flex-wrap">
            {[
              'Excellent work!',
              'Good effort, review X topic',
              'Keep practicing',
              'Great improvement!',
            ].map((template) => (
              <Button
                key={template}
                size="sm"
                variant="outline"
                className="text-xs border-border hover:bg-card bg-transparent"
                onClick={() => setFeedback((prev) => (prev ? prev + ' ' : '') + template)}
              >
                {template}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 border-border hover:bg-card text-foreground bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Grade'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
