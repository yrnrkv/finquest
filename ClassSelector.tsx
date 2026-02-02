'use client';

import { Class } from '@/lib/types';

interface ClassSelectorProps {
  classes: Class[];
  selectedClassId: string;
  onSelectClass: (classId: string) => void;
}

export default function ClassSelector({ classes, selectedClassId, onSelectClass }: ClassSelectorProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <p className="text-sm font-semibold text-muted-foreground mb-3 uppercase">Select Class</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {classes.map((cls) => (
          <button
            key={cls.id}
            onClick={() => onSelectClass(cls.id)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedClassId === cls.id
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <p className="font-semibold text-foreground">{cls.className}</p>
            <p className="text-sm text-muted-foreground mt-1">{cls.gradeLevel} • {cls.semester}</p>
            <p className="text-sm text-accent mt-2">Code: {cls.enrollmentCode}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
