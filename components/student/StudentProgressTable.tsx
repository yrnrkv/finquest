'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Lock } from 'lucide-react';

interface StudentData {
  studentId: string;
  studentName: string;
  moduleId: string;
  moduleName: string;
  completedAt?: string;
  score: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

interface StudentProgressTableProps {
  students: StudentData[];
  onSelectStudent: (student: StudentData) => void;
}

export function StudentProgressTable({ students, onSelectStudent }: StudentProgressTableProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-accent" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-secondary" />;
      default:
        return <Lock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: 'Completed', className: 'bg-accent text-accent-foreground' },
      in_progress: { label: 'In Progress', className: 'bg-secondary text-secondary-foreground' },
      not_started: { label: 'Not Started', className: 'bg-muted text-muted-foreground' },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <div className="rounded-lg border border-border/50 overflow-hidden">
      <Table>
        <TableHeader className="bg-background/50">
          <TableRow className="border-border/50 hover:bg-background/50">
            <TableHead className="text-foreground">Student Name</TableHead>
            <TableHead className="text-foreground">Module</TableHead>
            <TableHead className="text-foreground text-center">Score</TableHead>
            <TableHead className="text-foreground">Progress</TableHead>
            <TableHead className="text-foreground">Status</TableHead>
            <TableHead className="text-foreground text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index} className="border-border/50 hover:bg-card/50">
              <TableCell className="font-medium text-foreground">{student.studentName}</TableCell>
              <TableCell className="text-muted-foreground">{student.moduleName}</TableCell>
              <TableCell className="text-center">
                <span className="font-semibold text-primary">{student.score}</span>
                <span className="text-muted-foreground text-sm">/100</span>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 w-20">
                  <Progress value={student.score} className="h-2" />
                  <span className="text-xs text-muted-foreground">{student.score}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(student.status)}
                  {getStatusBadge(student.status)}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-border hover:bg-card bg-transparent"
                  onClick={() => onSelectStudent(student)}
                >
                  Grade
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
