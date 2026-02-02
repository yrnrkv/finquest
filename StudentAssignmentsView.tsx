'use client';

import { useAuth } from '@/lib/auth-context';
import { mockAssignments, mockStudentAssignments, mockClassEnrollments, mockModules } from '@/lib/mock-data';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function StudentAssignmentsView() {
  const { user } = useAuth();
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState<'all' | 'not_started' | 'in_progress' | 'submitted' | 'graded'>('all');

  if (!user || user.role !== 'student') {
    return null;
  }

  // Get student's enrolled classes
  const studentEnrollments = mockClassEnrollments.filter(e => e.studentId === user.id);
  const enrolledClassIds = studentEnrollments.map(e => e.classId);

  // Get assignments for enrolled classes
  const studentAssignmentsList = mockAssignments.filter(a => enrolledClassIds.includes(a.classId));
  
  // Get student's submission status for each assignment
  const assignmentsWithStatus = studentAssignmentsList.map(assignment => {
    const submission = mockStudentAssignments.find(
      sa => sa.assignmentId === assignment.id && sa.studentId === user.id
    );
    return {
      ...assignment,
      submission: submission || null,
    };
  });

  const filteredAssignments = assignmentsWithStatus.filter(a => {
    if (filterStatus === 'all') return true;
    return a.submission?.status === filterStatus || (!a.submission && filterStatus === 'not_started');
  });

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'graded':
        return 'text-accent';
      case 'submitted':
        return 'text-secondary';
      case 'in_progress':
        return 'text-primary';
      case 'not_started':
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status?: string) => {
    switch (status) {
      case 'graded':
        return 'bg-accent/10';
      case 'submitted':
        return 'bg-secondary/10';
      case 'in_progress':
        return 'bg-primary/10';
      case 'not_started':
      default:
        return 'bg-muted';
    }
  };

  const isDueDate = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const daysLeft = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft;
  };

  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft <= 0) return 'text-destructive';
    if (daysLeft <= 3) return 'text-secondary';
    return 'text-muted-foreground';
  };

  const stats = {
    total: assignmentsWithStatus.length,
    graded: assignmentsWithStatus.filter(a => a.submission?.status === 'graded').length,
    submitted: assignmentsWithStatus.filter(a => a.submission?.status === 'submitted').length,
    inProgress: assignmentsWithStatus.filter(a => a.submission?.status === 'in_progress').length,
    notStarted: assignmentsWithStatus.filter(a => !a.submission || a.submission.status === 'not_started').length,
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-foreground">My Assignments</h1>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>
          <p className="text-muted-foreground">Track your assignments across all classes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">Total</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">Graded</p>
            <p className="text-2xl font-bold text-accent">{stats.graded}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">Submitted</p>
            <p className="text-2xl font-bold text-secondary">{stats.submitted}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">In Progress</p>
            <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-2">Not Started</p>
            <p className="text-2xl font-bold text-muted-foreground">{stats.notStarted}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {(['all', 'not_started', 'in_progress', 'submitted', 'graded'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground hover:bg-muted'
              }`}
            >
              {status === 'all' ? 'All' : status === 'not_started' ? 'Not Started' : status === 'in_progress' ? 'In Progress' : status === 'submitted' ? 'Submitted' : 'Graded'}
            </button>
          ))}
        </div>

        {/* Assignments List */}
        {filteredAssignments.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="text-lg font-semibold text-foreground mb-2">No assignments found</h3>
            <p className="text-muted-foreground">Check back later or contact your teacher</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => {
              const module = mockModules.find(m => m.id === assignment.moduleId);
              const daysLeft = isDueDate(assignment.dueDate);
              const status = assignment.submission?.status || 'not_started';
              const urgencyColor = getUrgencyColor(daysLeft);

              return (
                <div key={assignment.id} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{assignment.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBgColor(status)} ${getStatusColor(status)}`}>
                          {status === 'not_started' ? 'Not Started' : status === 'in_progress' ? 'In Progress' : status === 'submitted' ? 'Submitted' : 'Graded'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Module</p>
                          <p className="font-medium text-foreground">{module?.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Total Points</p>
                          <p className="font-medium text-foreground">{assignment.totalPoints}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Due Date</p>
                          <p className={`font-medium ${urgencyColor}`}>
                            {new Date(assignment.dueDate).toLocaleDateString()}
                            {daysLeft <= 7 && ` (${daysLeft} days)`}
                          </p>
                        </div>
                        {assignment.submission && assignment.submission.bestScore !== undefined && (
                          <div>
                            <p className="text-xs text-muted-foreground">Best Score</p>
                            <p className="font-medium text-accent">{assignment.submission.bestScore}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (status === 'graded') {
                          router.push(`/grade-result/${assignment.id}`);
                        } else {
                          router.push(`/quest/${assignment.moduleId}`);
                        }
                      }}
                      className={`px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap ml-4 ${
                        status === 'not_started'
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : status === 'in_progress'
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : status === 'submitted'
                          ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                          : 'bg-accent text-accent-foreground hover:bg-accent/90'
                      }`}
                    >
                      {status === 'not_started' ? 'Start' : status === 'in_progress' ? 'Continue' : status === 'submitted' ? 'View' : 'View Result'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
