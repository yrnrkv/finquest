'use client';

import { Assignment, ClassEnrollment } from '@/lib/types';
import { useState } from 'react';
import AssignmentCard from './AssignmentCard';

interface ClassworkListProps {
  assignments: Assignment[];
  enrolledStudents: ClassEnrollment[];
  getAssignmentStats: (assignmentId: string) => {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  };
}

export default function ClassworkList({ assignments, enrolledStudents, getAssignmentStats }: ClassworkListProps) {
  const [expandedAssignmentId, setExpandedAssignmentId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published' | 'closed'>('all');

  const filteredAssignments = assignments.filter(
    a => filterStatus === 'all' || a.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'text-accent';
      case 'draft':
        return 'text-muted-foreground';
      case 'closed':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-accent/10';
      case 'draft':
        return 'bg-muted';
      case 'closed':
        return 'bg-destructive/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'published', 'draft', 'closed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Empty State or Assignments */}
      {filteredAssignments.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7 12a5 5 0 1110 0A5 5 0 017 12z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No {filterStatus === 'all' ? '' : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Assignments</h3>
          <p className="text-muted-foreground mb-4">
            {filterStatus === 'all' 
              ? 'Create your first assignment to get started with this class'
              : `No ${filterStatus} assignments. Try another status.`}
          </p>
          {filterStatus !== 'all' && (
            <button
              onClick={() => setFilterStatus('all')}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block"
            >
              View All Assignments
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAssignments.map((assignment) => {
            const stats = getAssignmentStats(assignment.id);
            const isExpanded = expandedAssignmentId === assignment.id;

            return (
              <div key={assignment.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedAssignmentId(isExpanded ? null : assignment.id)}
                  className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{assignment.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBgColor(assignment.status)} ${getStatusColor(assignment.status)}`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Total Points</p>
                        <p className="font-bold text-foreground">{assignment.totalPoints}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Due Date</p>
                        <p className="font-bold text-foreground">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Submissions</p>
                        <p className="font-bold text-accent">{stats.completed}/{stats.total}</p>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <svg className={`w-6 h-6 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </button>
                {isExpanded && (
                  <div className="border-t border-border px-6 py-4 bg-muted/30">
                    <AssignmentCard assignment={assignment} stats={stats} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
