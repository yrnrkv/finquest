'use client';

import React from "react"

import { useState } from 'react';
import { Assignment } from '@/lib/types';
import { mockModules } from '@/lib/mock-data';

interface CreateAssignmentModalProps {
  classId: string;
  onClose: () => void;
  onCreate: (assignment: Omit<Assignment, 'id' | 'createdAt'>) => void;
}

export default function CreateAssignmentModal({ classId, onClose, onCreate }: CreateAssignmentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    moduleId: '',
    totalPoints: 100,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'draft' as const,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.moduleId) newErrors.moduleId = 'Please select a module';
    if (formData.totalPoints <= 0) newErrors.totalPoints = 'Points must be greater than 0';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onCreate({
      classId,
      title: formData.title,
      description: formData.description,
      moduleId: formData.moduleId,
      totalPoints: formData.totalPoints,
      dueDate: new Date(formData.dueDate).toISOString(),
      status: formData.status,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Create New Assignment</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Assignment Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground transition-colors ${
                errors.title ? 'border-destructive' : 'border-border focus:border-primary'
              } focus:outline-none`}
              placeholder="e.g., Budgeting Basics Quest"
            />
            {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              rows={4}
              className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground transition-colors ${
                errors.description ? 'border-destructive' : 'border-border focus:border-primary'
              } focus:outline-none resize-none`}
              placeholder="Describe what students will learn from this assignment..."
            />
            {errors.description && <p className="text-destructive text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Module Selection */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Financial Module *
            </label>
            <select
              value={formData.moduleId}
              onChange={(e) => {
                setFormData({ ...formData, moduleId: e.target.value });
                if (errors.moduleId) setErrors({ ...errors, moduleId: '' });
              }}
              className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground transition-colors ${
                errors.moduleId ? 'border-destructive' : 'border-border focus:border-primary'
              } focus:outline-none`}
            >
              <option value="">Select a module...</option>
              {mockModules.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.name} ({module.difficultyLevel})
                </option>
              ))}
            </select>
            {errors.moduleId && <p className="text-destructive text-sm mt-1">{errors.moduleId}</p>}
          </div>

          {/* Points & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Total Points *
              </label>
              <input
                type="number"
                min="1"
                value={formData.totalPoints}
                onChange={(e) => {
                  setFormData({ ...formData, totalPoints: parseInt(e.target.value) || 0 });
                  if (errors.totalPoints) setErrors({ ...errors, totalPoints: '' });
                }}
                className={`w-full px-4 py-2 rounded-lg border bg-background text-foreground transition-colors ${
                  errors.totalPoints ? 'border-destructive' : 'border-border focus:border-primary'
                } focus:outline-none`}
              />
              {errors.totalPoints && <p className="text-destructive text-sm mt-1">{errors.totalPoints}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground transition-colors focus:border-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Module Info Preview */}
          {formData.moduleId && (
            <div className="bg-muted rounded-lg p-4 border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Module Preview</p>
              {mockModules.find(m => m.id === formData.moduleId) && (
                <div>
                  <p className="font-semibold text-foreground">
                    {mockModules.find(m => m.id === formData.moduleId)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {mockModules.find(m => m.id === formData.moduleId)?.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Submit & Cancel */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
