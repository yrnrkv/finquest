'use client';

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { mockGradingStudents, mockModules, mockClasses, mockAssignments, mockStudentAssignments, mockClassEnrollments } from '@/lib/mock-data';
import { TeacherHeader } from './TeacherHeader';
import { StudentProgressTable } from './StudentProgressTable';
import { GradingInterface } from './GradingInterface';
import ClassSelector from './ClassSelector';
import ClassworkList from './ClassworkList';
import CreateAssignmentModal from './CreateAssignmentModal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Assignment } from '@/lib/types';
import Link from 'next/link';

export function TeacherDashboard() {
  const { user, logout } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState<(typeof mockGradingStudents)[0] | null>(null);
  const [showGradingInterface, setShowGradingInterface] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState<string>('class-001');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);

  // Calculate statistics
  const totalStudents = mockGradingStudents.length;
  const completedModules = mockGradingStudents.filter((s) => s.status === 'completed').length;
  const inProgressModules = mockGradingStudents.filter((s) => s.status === 'in_progress').length;
  const averageScore =
    mockGradingStudents.reduce((sum, s) => sum + s.score, 0) / totalStudents || 0;

  // Classwork management
  const selectedClass = mockClasses.find(c => c.id === selectedClassId);
  const classAssignments = assignments.filter(a => a.classId === selectedClassId);
  const enrolledStudents = mockClassEnrollments.filter(e => e.classId === selectedClassId);

  const getAssignmentStats = (assignmentId: string) => {
    const studentAssigns = mockStudentAssignments.filter(sa => sa.assignmentId === assignmentId);
    return {
      total: enrolledStudents.length,
      completed: studentAssigns.filter(sa => sa.status === 'graded').length,
      inProgress: studentAssigns.filter(sa => sa.status === 'in_progress' || sa.status === 'submitted').length,
      notStarted: studentAssigns.filter(sa => sa.status === 'not_started').length,
    };
  };

  const handleCreateAssignment = (newAssignment: Omit<Assignment, 'id' | 'createdAt'>) => {
    const assignment: Assignment = {
      ...newAssignment,
      id: `assign-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setAssignments([...assignments, assignment]);
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <TeacherHeader user={user!} onLogout={logout} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <div className="mb-8 flex justify-end">
          <Link href="/learning">
            <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
              </svg>
              Learning Resources
            </button>
          </Link>
        </div>



        {/* Main Tabs */}
        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="progress">Student Progress</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="classes">Classes & Assignments</TabsTrigger>
          </TabsList>

          {/* Student Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            {showGradingInterface && selectedStudent ? (
              <div className="space-y-4">
                <button
                  onClick={() => {
                    setShowGradingInterface(false);
                    setSelectedStudent(null);
                  }}
                  className="text-primary hover:text-primary/80 font-semibold flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Progress
                </button>
                <GradingInterface
                  student={selectedStudent}
                  onClose={() => {
                    setShowGradingInterface(false);
                    setSelectedStudent(null);
                  }}
                />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Class Stats - Only in Progress Tab */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-card border-border/50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm mb-2">Active Students</p>
                        <p className="text-3xl font-bold text-primary">{enrolledStudents.length}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border/50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm mb-2">Completed</p>
                        <p className="text-3xl font-bold text-accent">{mockGradingStudents.filter(s => s.status === 'completed').length}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border/50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm mb-2">In Progress</p>
                        <p className="text-3xl font-bold text-secondary">{mockGradingStudents.filter(s => s.status === 'in_progress').length}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border/50">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-muted-foreground text-sm mb-2">Class Average</p>
                        <p className="text-3xl font-bold text-primary">{Math.round(mockGradingStudents.reduce((sum, s) => sum + s.score, 0) / mockGradingStudents.length || 0)}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle>Student Module Progress</CardTitle>
                    <CardDescription>Track student completion and performance across modules. Click "Grade" to provide feedback on their work.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StudentProgressTable
                      students={mockGradingStudents}
                      onSelectStudent={(student) => {
                        setSelectedStudent(student);
                        setShowGradingInterface(true);
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Modules Tab */}
          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockModules.map((module) => {
                const moduleStudents = mockGradingStudents.filter(
                  (s) => s.moduleId === module.id
                );
                const completedCount = moduleStudents.filter(
                  (s) => s.status === 'completed'
                ).length;

                return (
                  <Card key={module.id} className="bg-gradient-to-br from-card to-card/50 border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Completion Rate</span>
                          <span className="font-semibold text-foreground">
                            {moduleStudents.length > 0
                              ? Math.round((completedCount / moduleStudents.length) * 100)
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-background rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{
                              width: `${moduleStudents.length > 0 ? (completedCount / moduleStudents.length) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {completedCount}/{moduleStudents.length} students completed
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Classes & Assignments Tab */}
          <TabsContent value="classes" className="space-y-6">
            <div className="space-y-6">
              {/* Class Selector */}
              <ClassSelector
                classes={mockClasses}
                selectedClassId={selectedClassId}
                onSelectClass={setSelectedClassId}
              />

              {selectedClass && (
                <div className="space-y-6">
                  {/* Class Info */}
                  <Card className="bg-card border-border/50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-foreground mb-2">{selectedClass.className}</h3>
                          <p className="text-muted-foreground mb-4">{selectedClass.description}</p>
                          <div className="flex gap-8">
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Students Enrolled</p>
                              <p className="text-2xl font-bold text-primary">{selectedClass.studentCount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground mb-1">Active Assignments</p>
                              <p className="text-2xl font-bold text-primary">{classAssignments.filter(a => a.status === 'published').length}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowCreateModal(true)}
                          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors whitespace-nowrap"
                        >
                          Create Assignment
                        </button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Assignments List */}
                  <ClassworkList
                    assignments={classAssignments}
                    enrolledStudents={enrolledStudents}
                    getAssignmentStats={getAssignmentStats}
                  />
                </div>
              )}

              {/* Create Assignment Modal */}
              {showCreateModal && (
                <CreateAssignmentModal
                  classId={selectedClassId}
                  onClose={() => setShowCreateModal(false)}
                  onCreate={handleCreateAssignment}
                />
              )}
            </div>
          </TabsContent>


        </Tabs>
      </main>
    </div>
  );
}
