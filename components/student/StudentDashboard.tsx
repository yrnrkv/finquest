'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { mockModules, mockStudentProgress, mockAIProfile, mockAssignments, mockStudentAssignments, mockClassEnrollments } from '@/lib/mock-data';
import { ModuleCard } from './ModuleCard';
import { StudentHeader } from './StudentHeader';
import { AIProfiling } from './AIProfiling';
import Link from 'next/link';

export function StudentDashboard() {
  const { user, logout } = useAuth();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [showAIProfile, setShowAIProfile] = useState(false);

  const studentProgress = mockStudentProgress.filter((p) => p.studentId === user?.id);

  const completedCount = studentProgress.filter((p) => p.status === 'completed').length;
  const inProgressCount = studentProgress.filter((p) => p.status === 'in_progress').length;
  const totalProgress = (completedCount / mockModules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <StudentHeader user={user!} onLogout={logout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Modules Completed</p>
                <p className="text-3xl font-bold text-primary">
                  {completedCount}/{mockModules.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">In Progress</p>
                <p className="text-3xl font-bold text-secondary">{inProgressCount}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Average Score</p>
                <p className="text-3xl font-bold text-accent">{Math.round(mockAIProfile.averageScore)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Difficulty Level</p>
                <Badge className="bg-secondary text-secondary-foreground capitalize">
                  {mockAIProfile.difficultyLevel}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overall Progress */}
        <Card className="bg-card border-border/50 mb-8">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
            <CardDescription>Complete all modules to earn your NFT certificate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={totalProgress} className="h-3" />
            <p className="text-sm text-muted-foreground">{Math.round(totalProgress)}% complete</p>
          </CardContent>
        </Card>

        {/* Actions Bar */}
        <div className="mb-8 flex gap-4 flex-wrap">
          <Button
            onClick={() => setShowAIProfile(!showAIProfile)}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
          >
            {showAIProfile ? 'Hide' : 'Show'} Your AI Profile
          </Button>
          <Link href="/student/assignments">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              View Class Assignments
            </Button>
          </Link>
          <Link href="/learning">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Learning Resources
            </Button>
          </Link>
        </div>

        {/* AI Profile Section */}
        {showAIProfile && <AIProfiling aiProfile={mockAIProfile} />}

        {/* Upcoming Assignments Preview */}
        {(() => {
          const studentEnrollments = mockClassEnrollments.filter(e => e.studentId === user?.id);
          const enrolledClassIds = studentEnrollments.map(e => e.classId);
          const studentAssignmentsList = mockAssignments.filter(a => enrolledClassIds.includes(a.classId));
          const assignmentsWithStatus = studentAssignmentsList.slice(0, 3).map(assignment => {
            const submission = mockStudentAssignments.find(
              sa => sa.assignmentId === assignment.id && sa.studentId === user?.id
            );
            return { ...assignment, submission };
          });

          if (assignmentsWithStatus.length > 0) {
            return (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-foreground">Recent Assignments</h2>
                  <Link href="/student/assignments" className="text-primary hover:text-primary/80 font-semibold">
                    View All →
                  </Link>
                </div>
                <div className="space-y-3">
                  {assignmentsWithStatus.map((assignment) => {
                    const daysLeft = Math.ceil((new Date(assignment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    const status = assignment.submission?.status || 'not_started';
                    
                    return (
                      <Card key={assignment.id} className="bg-card border-border/50">
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-foreground">{assignment.title}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                {daysLeft <= 7 && ` (${daysLeft > 0 ? daysLeft : 'Overdue'})`}
                              </p>
                            </div>
                            <Badge className={`capitalize ${
                              status === 'graded' ? 'bg-accent text-accent-foreground' :
                              status === 'submitted' ? 'bg-secondary text-secondary-foreground' :
                              status === 'in_progress' ? 'bg-primary text-primary-foreground' :
                              'bg-muted text-muted-foreground'
                            }`}>
                              {status === 'not_started' ? 'Not Started' : status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          }
          return null;
        })()}

        {/* Modules Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockModules.map((module) => {
              const progress = studentProgress.find((p) => p.moduleId === module.id);
              return (
                <ModuleCard
                  key={module.id}
                  module={module}
                  progress={progress}
                  isSelected={selectedModule === module.id}
                  onSelect={() => setSelectedModule(module.id)}
                />
              );
            })}
          </div>
        </div>

        {/* Selected Module Detail */}
        {selectedModule && (
          <Card className="bg-card border-border/50">
            <CardHeader>
              <CardTitle>Module Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground">
                {mockModules.find((m) => m.id === selectedModule)?.description}
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
                Start Quest
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
