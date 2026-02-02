'use client';

import { Assignment } from '@/lib/types';
import { mockModules, mockStudentAssignments, mockClassEnrollments } from '@/lib/mock-data';

interface AssignmentCardProps {
  assignment: Assignment;
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  };
}

export default function AssignmentCard({ assignment, stats }: AssignmentCardProps) {
  const module = mockModules.find(m => m.id === assignment.moduleId);
  const assignmentSubmissions = mockStudentAssignments.filter(sa => sa.assignmentId === assignment.id);
  const enrollments = mockClassEnrollments.filter(e => e.classId === assignment.classId);

  const completionPercentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Module Info */}
      <div className="bg-background rounded-lg p-4 border border-border/50">
        <p className="text-sm text-muted-foreground mb-1">Linked Module</p>
        <p className="font-bold text-foreground mb-1">{module?.name}</p>
        <p className="text-sm text-muted-foreground">{module?.description}</p>
      </div>

      {/* Submission Statistics */}
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Submission Status</h4>
        
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-muted-foreground">Completion Rate</p>
            <p className="text-sm font-bold text-accent">{completionPercentage}%</p>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-background rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Total Students</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-background rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-accent">{stats.completed}</p>
          </div>
          <div className="bg-background rounded-lg p-3">
            <p className="text-xs text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-secondary">{stats.inProgress}</p>
          </div>
          <div className="bg-background rounded-lg p-3">
            <p className="text-xs text-muted-foreground">Not Started</p>
            <p className="text-2xl font-bold text-muted-foreground">{stats.notStarted}</p>
          </div>
        </div>
      </div>

      {/* Student Submissions List */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Student Submissions</h4>
        <div className="bg-background rounded-lg border border-border/50 divide-y divide-border/50 max-h-96 overflow-y-auto">
          {enrollments.map((enrollment) => {
            const submission = assignmentSubmissions.find(sa => sa.studentId === enrollment.studentId);
            
            const getStatusDisplay = (status: string) => {
              switch (status) {
                case 'graded':
                  return { label: 'Graded', color: 'text-accent bg-accent/10' };
                case 'submitted':
                  return { label: 'Submitted', color: 'text-secondary bg-secondary/10' };
                case 'in_progress':
                  return { label: 'In Progress', color: 'text-primary bg-primary/10' };
                case 'not_started':
                  return { label: 'Not Started', color: 'text-muted-foreground bg-muted' };
                default:
                  return { label: status, color: 'text-foreground bg-muted' };
              }
            };

            const statusDisplay = submission ? getStatusDisplay(submission.status) : getStatusDisplay('not_started');

            return (
              <div key={enrollment.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-foreground">Student {enrollment.studentId.slice(-3)}</p>
                  {submission && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Best Score: <span className="font-bold text-accent">{submission.bestScore}%</span>
                      {submission.questAttempts && ` • Attempts: ${submission.questAttempts}`}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusDisplay.color}`}>
                    {statusDisplay.label}
                  </span>
                  {submission?.status === 'submitted' && (
                    <button className="text-primary hover:text-primary/80 font-semibold text-sm">
                      Grade
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {assignment.status === 'draft' && (
          <button className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Publish Assignment
          </button>
        )}
        {assignment.status === 'published' && (
          <button className="flex-1 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
            Close Assignment
          </button>
        )}
        <button className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-semibold">
          Edit
        </button>
        <button className="px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors font-semibold">
          Delete
        </button>
      </div>
    </div>
  );
}
