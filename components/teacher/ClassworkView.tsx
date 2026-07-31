'use client';

import { useState } from 'react';
import { mockClasses, mockAssignments, mockStudentAssignments, mockClassEnrollments } from '@/lib/mock-data';
import { Class, Assignment, StudentAssignment } from '@/lib/types';
import ClassSelector from './ClassSelector';
import ClassworkList from './ClassworkList';
import CreateAssignmentModal from './CreateAssignmentModal';

export default function ClassworkView() {
  const [selectedClassId, setSelectedClassId] = useState<string>('class-001');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);

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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Classwork</h1>
          <p className="text-muted-foreground">Create and manage assignments for your financial literacy classes</p>
        </div>

        {/* Class Selector */}
        <ClassSelector
          classes={mockClasses}
          selectedClassId={selectedClassId}
          onSelectClass={setSelectedClassId}
        />

        {selectedClass && (
          <div className="mt-8 space-y-6">
            {/* Class Info */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{selectedClass.className}</h2>
                  <p className="text-muted-foreground mt-2">{selectedClass.description}</p>
                  <div className="flex gap-4 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Students Enrolled</p>
                      <p className="text-2xl font-bold text-primary">{selectedClass.studentCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assignments</p>
                      <p className="text-2xl font-bold text-primary">{classAssignments.length}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Create Assignment
                </button>
              </div>
            </div>

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
    </div>
  );
}
