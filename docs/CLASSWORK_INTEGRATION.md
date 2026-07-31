# FinQuest Classwork Integration Guide

## Overview

The FinQuest platform includes a comprehensive classwork management system that integrates financial literacy modules with classroom assignments. This guide explains how teachers and students interact with the classwork system.

## System Architecture

### Entity Relationships

```
Teacher
  ├── Classes (manages multiple classes)
  │   ├── Students (enrolled)
  │   └── Assignments (linked to modules)
  │       └── Module (Financial Literacy)
  │           └── Quests (interactive scenarios)
  │
Student
  ├── Class Enrollments
  ├── Assignments (via class)
  └── Submissions (quest attempts)
```

## Teacher Workflow

### 1. Class Management

Teachers can create and manage multiple classes:

**File**: `/components/teacher/ClassSelector.tsx`
- Display all created classes
- Quick stats on enrollment and assignments
- Class-specific metadata (grade level, semester, enrollment code)

**Data Structure**: `Class`
```typescript
{
  id: string;
  teacherId: string;
  className: string;
  description: string;
  gradeLevel: string;
  semester: string;
  enrollmentCode: string;
  studentCount: number;
  createdAt: string;
}
```

### 2. Assignment Creation

Teachers create assignments linked to specific modules:

**File**: `/components/teacher/CreateAssignmentModal.tsx`
- Select from available financial modules
- Set due dates and point values
- Draft or publish assignments
- Track student completion

**Assignment Workflow**:
1. Choose a financial module (Budgeting Basics, Savings Strategies, Investment Fundamentals)
2. Create assignment description and learning objectives
3. Set due date and total points
4. Save as draft or publish immediately

**Data Structure**: `Assignment`
```typescript
{
  id: string;
  classId: string;
  moduleId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
}
```

### 3. Classwork Dashboard

**File**: `/app/teacher/classwork/page.tsx` and `/components/teacher/ClassworkView.tsx`

Features:
- View all assignments for a selected class
- Filter by status (draft, published, closed)
- Expandable assignment cards with submission stats
- Real-time submission tracking

**Assignment Card Details** (`/components/teacher/AssignmentCard.tsx`):
- Linked module information
- Submission statistics:
  - Total students
  - Completed assignments
  - In-progress
  - Not started
- Completion rate progress bar
- Individual student submission list
- Quick action buttons (publish, close, grade, edit, delete)

### 4. Grading System

**File**: `/components/teacher/GradingInterface.tsx`

The teacher dashboard includes a grading interface:
- Select student assignments to grade
- Provide feedback on financial decision-making
- Assign scores based on quest performance
- View AI-generated performance analysis

**Data Structure**: `GradingRecord`
```typescript
{
  id: string;
  teacherId: string;
  studentId: string;
  moduleId: string;
  grade: string;
  feedback: string;
  gradedAt: string;
}
```

## Student Workflow

### 1. Dashboard Integration

**File**: `/components/student/StudentDashboard.tsx`

The student dashboard shows:
- Overall learning progress across all modules
- Quick access to class assignments
- Preview of upcoming assignments
- Due date indicators and urgency flags

**Quick Links**:
- "View Class Assignments" button opens the assignments page
- Assignment preview shows status and due dates

### 2. Assignment Tracking

**File**: `/app/student/assignments/page.tsx` and `/components/student/StudentAssignmentsView.tsx`

Complete assignment management view:

**Features**:
- View all assignments across enrolled classes
- Filter by status:
  - Not Started
  - In Progress
  - Submitted
  - Graded
- Color-coded urgency indicators:
  - Green: Due in 7+ days
  - Yellow: Due within 3-7 days
  - Red: Overdue
- Quick stats:
  - Total assignments
  - Completed
  - Submitted awaiting grade
  - In progress
  - Not started

**Assignment Card Display**:
- Title and description
- Linked financial module
- Total points available
- Due date with days remaining
- Current status with visual indicator
- Best score if attempted
- One-click button to start/continue/submit

**Data Structure**: `StudentAssignment`
```typescript
{
  id: string;
  assignmentId: string;
  studentId: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded';
  questAttempts: number;
  bestScore?: number;
  submittedAt?: string;
  gradedAt?: string;
}
```

### 3. Starting Assignments

When a student clicks "Start" on an assignment:
1. System detects the linked module
2. Routes to quest interface: `/quest/[moduleId]`
3. Student completes financial simulation quests
4. Submission recorded with score and timestamp

**Flow**:
```
Assignment Card → Click "Start" → Quest Interface
                                   ├── Complete Quests
                                   ├── Get Feedback
                                   └── Auto-submit results
```

## Module Integration Points

### Quest Interface
**File**: `/components/quest/QuestInterface.tsx`

- Interactive financial scenarios
- Real-time feedback and scoring
- Difficulty adjustments based on performance
- Crisis scenario triggers for deeper learning

### Performance Tracking
**File**: `/lib/mock-data.ts`

Mock data includes:
- `mockClasses`: Teacher's class rosters
- `mockAssignments`: Assignment definitions
- `mockStudentAssignments`: Submission tracking
- `mockClassEnrollments`: Student-to-class relationships

## Database Schema (SQL)

The system uses AWS Aurora PostgreSQL with the following structure:

```sql
-- Classes
CREATE TABLE classes (
  id UUID PRIMARY KEY,
  teacher_id UUID REFERENCES users,
  class_name VARCHAR(255),
  description TEXT,
  grade_level VARCHAR(50),
  semester VARCHAR(50),
  enrollment_code VARCHAR(20) UNIQUE,
  student_count INT DEFAULT 0,
  created_at TIMESTAMP
);

-- Assignments
CREATE TABLE assignments (
  id UUID PRIMARY KEY,
  class_id UUID REFERENCES classes,
  module_id UUID REFERENCES modules,
  title VARCHAR(255),
  description TEXT,
  due_date TIMESTAMP,
  total_points INT,
  status VARCHAR(20),
  created_at TIMESTAMP
);

-- Student Assignments
CREATE TABLE student_assignments (
  id UUID PRIMARY KEY,
  assignment_id UUID REFERENCES assignments,
  student_id UUID REFERENCES users,
  status VARCHAR(20),
  quest_attempts INT,
  best_score INT,
  submitted_at TIMESTAMP,
  graded_at TIMESTAMP
);

-- Class Enrollments
CREATE TABLE class_enrollments (
  id UUID PRIMARY KEY,
  class_id UUID REFERENCES classes,
  student_id UUID REFERENCES users,
  enrollment_date TIMESTAMP,
  status VARCHAR(20)
);
```

## API Routes

### Quest Submission
**File**: `/app/api/quest/submit/route.ts`
- Endpoint: `POST /api/quest/submit`
- Records quest attempt and updates student progress

### Grading
**File**: `/app/api/grade/submit/route.ts`
- Endpoint: `POST /api/grade/submit`
- Saves teacher grading and feedback

### Certificate Minting
**File**: `/app/api/certificate/mint/route.ts`
- Endpoint: `POST /api/certificate/mint`
- Creates NFT certificate on Polygon network (when integrated)

## Navigation Flow

### Teacher Routes
```
/teacher-dashboard
├── /teacher/classwork (Classwork Management)
├── /grade/[studentId] (Grading Interface)
└── /certificate/[studentId] (Certificate Review)
```

### Student Routes
```
/dashboard
├── /student/assignments (Assignment Tracking)
├── /quest/[moduleId] (Financial Quests)
├── /certificate (NFT Certificate)
└── /end-journey (Completion Screen)
```

## Key Features

### Real-time Synchronization
- Student submissions immediately visible to teachers
- Grade updates reflected in student view
- Status changes update across both interfaces

### Adaptivity
- AI difficulty adjustment based on quest performance
- Assignments dynamically difficulty-rated
- Crisis scenarios triggered based on learning gaps

### Completion Tracking
- Progress bars showing class and individual completion
- Submission status visibility
- Automatic deadline tracking

### Gamification
- Points and scoring system
- NFT certificate rewards
- Skill badges and achievements
- Leaderboard capabilities (future feature)

## Future Enhancements

1. **Bulk Assignment Creation**: Template-based assignment generation
2. **Peer Review**: Student-to-student assignment feedback
3. **Analytics Dashboard**: Detailed learning analytics and trends
4. **Custom Quizzes**: Teacher-created quiz integration
5. **Parent Portal**: Parent access to student progress
6. **Mobile App**: Native mobile assignment tracking

## Troubleshooting

### Assignment Not Visible to Students
- Ensure assignment is published (status: 'published')
- Verify student is enrolled in the class
- Check due date hasn't passed (if filtering)

### Grading Not Saving
- Verify database connection
- Check user permissions (teacher role required)
- Ensure student has submitted assignment

### Scores Not Updating
- Check quest submission API integration
- Verify module ID matches assignment module
- Clear browser cache if displaying stale data

## Support

For API integration questions, refer to:
- `/scripts/schema.sql` - Database schema
- `/lib/types.ts` - TypeScript interfaces
- `/lib/mock-data.ts` - Example data structures
