// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'student' | 'teacher';
  schoolId?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

// Module Types
export interface Module {
  id: string;
  name: string;
  description: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  contentUrl?: string;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  moduleId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  currentScore: number;
  completedAt?: string;
}

// Quest Types
export interface Quest {
  id: string;
  moduleId: string;
  questName: string;
  description: string;
  scenario: string;
  difficultyMultiplier: number;
}

export interface QuestAttempt {
  id: string;
  studentId: string;
  questId: string;
  attemptNumber: number;
  incomeAmount?: number;
  savingsAmount?: number;
  riskProfile?: string;
  score: number;
  difficultyAdjusted: boolean;
  isCrisisTriggered: boolean;
  completedAt?: string;
}

export interface QuestResult {
  questId: string;
  score: number;
  feedback: string;
  nextDifficulty?: 'up' | 'down' | 'maintain';
  crisisScenarioTriggered: boolean;
}

// Teacher Dashboard Types
export interface GradingRecord {
  id: string;
  teacherId: string;
  studentId: string;
  moduleId: string;
  grade: string;
  feedback: string;
  gradedAt: string;
}

export interface StudentGradingData {
  studentId: string;
  studentName: string;
  moduleId: string;
  moduleName: string;
  completedAt?: string;
  score: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

// NFT Certificate Types
export interface NFTCertificate {
  id: string;
  studentId: string;
  moduleId: string;
  nftContractAddress?: string;
  nftTokenId?: string;
  polygonTxHash?: string;
  financialHealthScore: number;
  issuedAt: string;
}

// AI Adaptation Types
export interface StudentAIProfile {
  studentId: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  learningPace: 'slow' | 'normal' | 'fast';
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  crisisScenarioPreference: boolean;
  totalQuestsCompleted: number;
  averageScore: number;
}

export interface DifficultyAdjustment {
  newDifficulty: 'up' | 'down' | 'maintain';
  reason: string;
  nextMultiplier: number;
}

// Classwork & Assignment Types
export interface Class {
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

export interface Assignment {
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

export interface StudentAssignment {
  id: string;
  assignmentId: string;
  studentId: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded';
  questAttempts: number;
  bestScore?: number;
  submittedAt?: string;
  gradedAt?: string;
}

export interface ClassEnrollment {
  id: string;
  classId: string;
  studentId: string;
  enrollmentDate: string;
  status: 'active' | 'dropped';
}

// Learning Material Types
export interface VideoContent {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  duration: number; // in minutes
  thumbnailUrl?: string;
}

export interface SlideContent {
  id: string;
  title: string;
  description: string;
  slides: Slide[];
}

export interface Slide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  notes?: string;
}

export interface LearningMaterial {
  id: string;
  moduleId: string;
  classId?: string; // Optional - if provided, it's class-specific; if null, it's module-wide
  title: string;
  description: string;
  type: 'video' | 'slideshow';
  content: VideoContent | SlideContent;
  createdBy: 'system' | 'teacher'; // 'system' for pre-made, 'teacher' for added by teacher
  createdAt: string;
}
