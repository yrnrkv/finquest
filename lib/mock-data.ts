import { User, Module, Quest, QuestAttempt, StudentProgress, StudentAIProfile, Class, Assignment, StudentAssignment, ClassEnrollment, LearningMaterial } from './types';

// Mock Users
export const mockUsers: Record<string, User> = {
  student1: {
    id: 'student-001',
    email: 'alex@school.edu',
    fullName: 'Alex Johnson',
    role: 'student',
    schoolId: 'HS-2024',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  teacher1: {
    id: 'teacher-001',
    email: 'mrs.smith@school.edu',
    fullName: 'Mrs. Smith',
    role: 'teacher',
    schoolId: 'HS-2024',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=smith',
    createdAt: new Date('2023-08-01').toISOString(),
  },
};

// Mock Modules
export const mockModules: Module[] = [
  {
    id: 'module-001',
    name: 'Budgeting Basics',
    description: 'Learn how to create and manage a personal budget',
    difficultyLevel: 'beginner',
    contentUrl: '/modules/budgeting',
  },
  {
    id: 'module-002',
    name: 'Savings Strategies',
    description: 'Master different savings techniques and goal setting',
    difficultyLevel: 'intermediate',
    contentUrl: '/modules/savings',
  },
  {
    id: 'module-003',
    name: 'Investment Fundamentals',
    description: 'Understand stocks, bonds, and diversification',
    difficultyLevel: 'advanced',
    contentUrl: '/modules/investing',
  },
];

// Mock Quests
export const mockQuests: Quest[] = [
  {
    id: 'quest-001',
    moduleId: 'module-001',
    questName: 'The Monthly Budget Challenge',
    description: 'Allocate your monthly income wisely across different categories',
    scenario: 'You have $3,000 monthly income. Allocate it between rent, food, utilities, and savings.',
    difficultyMultiplier: 1.0,
  },
  {
    id: 'quest-002',
    moduleId: 'module-001',
    questName: 'Unexpected Expense Event',
    description: 'Your car needs $800 in repairs. How do you handle it?',
    scenario: 'Your car breaks down and needs immediate $800 repair. You have $500 in emergency fund.',
    difficultyMultiplier: 1.5,
  },
  {
    id: 'quest-003',
    moduleId: 'module-002',
    questName: 'Save for Summer',
    description: 'Create a savings plan to reach your $2000 goal in 6 months',
    scenario: 'Goal: Save $2000 in 6 months while maintaining your lifestyle.',
    difficultyMultiplier: 1.0,
  },
];

// Mock Student Progress
export const mockStudentProgress: StudentProgress[] = [
  {
    id: 'progress-001',
    studentId: 'student-001',
    moduleId: 'module-001',
    status: 'completed',
    currentScore: 85,
    completedAt: new Date('2024-01-20').toISOString(),
  },
  {
    id: 'progress-002',
    studentId: 'student-001',
    moduleId: 'module-002',
    status: 'in_progress',
    currentScore: 72,
  },
  {
    id: 'progress-003',
    studentId: 'student-001',
    moduleId: 'module-003',
    status: 'not_started',
    currentScore: 0,
  },
];

// Mock Quest Attempts
export const mockQuestAttempts: QuestAttempt[] = [
  {
    id: 'attempt-001',
    studentId: 'student-001',
    questId: 'quest-001',
    attemptNumber: 1,
    incomeAmount: 3000,
    savingsAmount: 500,
    riskProfile: 'conservative',
    score: 85,
    difficultyAdjusted: false,
    isCrisisTriggered: false,
    completedAt: new Date('2024-01-20').toISOString(),
  },
  {
    id: 'attempt-002',
    studentId: 'student-001',
    questId: 'quest-002',
    attemptNumber: 1,
    incomeAmount: 3000,
    savingsAmount: 1200,
    riskProfile: 'moderate',
    score: 78,
    difficultyAdjusted: false,
    isCrisisTriggered: true,
    completedAt: new Date('2024-01-22').toISOString(),
  },
];

// Mock AI Profile
export const mockAIProfile: StudentAIProfile = {
  studentId: 'student-001',
  difficultyLevel: 'intermediate',
  learningPace: 'normal',
  riskTolerance: 'moderate',
  crisisScenarioPreference: true,
  totalQuestsCompleted: 2,
  averageScore: 81.5,
};

// Mock Dashboard Data
export const mockGradingStudents = [
  {
    studentId: 'student-001',
    studentName: 'Alex Johnson',
    moduleId: 'module-001',
    moduleName: 'Budgeting Basics',
    completedAt: new Date('2024-01-20').toISOString(),
    score: 85,
    status: 'completed' as const,
  },
  {
    studentId: 'student-002',
    studentName: 'Jordan Lee',
    moduleId: 'module-001',
    moduleName: 'Budgeting Basics',
    score: 72,
    status: 'in_progress' as const,
  },
  {
    studentId: 'student-003',
    studentName: 'Casey Davis',
    moduleId: 'module-002',
    moduleName: 'Savings Strategies',
    score: 65,
    status: 'in_progress' as const,
  },
];

// Mock Classes
export const mockClasses: Class[] = [
  {
    id: 'class-001',
    teacherId: 'teacher-001',
    className: 'Personal Finance 101 - Period 2',
    description: 'Introduction to personal financial management',
    gradeLevel: '9-12',
    semester: 'Spring 2026',
    enrollmentCode: 'FIN2024A',
    studentCount: 28,
    createdAt: new Date('2026-01-02').toISOString(),
  },
  {
    id: 'class-002',
    teacherId: 'teacher-001',
    className: 'Advanced Financial Planning - Period 4',
    description: 'Advanced topics in investment and wealth management',
    gradeLevel: '10-12',
    semester: 'Spring 2026',
    enrollmentCode: 'FIN2024B',
    studentCount: 18,
    createdAt: new Date('2026-01-02').toISOString(),
  },
];

// Mock Assignments
export const mockAssignments: Assignment[] = [
  {
    id: 'assign-001',
    classId: 'class-001',
    moduleId: 'module-001',
    title: 'Budgeting Basics Quest',
    description: 'Complete all quests in the Budgeting Basics module to learn fundamental budget management.',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    totalPoints: 100,
    status: 'published',
    createdAt: new Date('2024-01-10').toISOString(),
  },
  {
    id: 'assign-002',
    classId: 'class-001',
    moduleId: 'module-002',
    title: 'Savings Strategies Quest',
    description: 'Master savings techniques through interactive quests.',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    totalPoints: 100,
    status: 'published',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'assign-003',
    classId: 'class-002',
    moduleId: 'module-003',
    title: 'Investment Fundamentals Quest',
    description: 'Understand stocks, bonds, and diversification through challenging scenarios.',
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    totalPoints: 100,
    status: 'draft',
    createdAt: new Date('2024-01-12').toISOString(),
  },
];

// Mock Student Assignments
export const mockStudentAssignments: StudentAssignment[] = [
  {
    id: 'studassign-001',
    assignmentId: 'assign-001',
    studentId: 'student-001',
    status: 'graded',
    questAttempts: 3,
    bestScore: 85,
    submittedAt: new Date('2026-01-18').toISOString(),
    gradedAt: new Date('2026-01-18').toISOString(),
  },
  {
    id: 'studassign-002',
    assignmentId: 'assign-001',
    studentId: 'student-002',
    status: 'submitted',
    questAttempts: 2,
    bestScore: 72,
    submittedAt: new Date('2026-01-19').toISOString(),
  },
  {
    id: 'studassign-003',
    assignmentId: 'assign-002',
    studentId: 'student-001',
    status: 'in_progress',
    questAttempts: 1,
    bestScore: 68,
  },
  {
    id: 'studassign-004',
    assignmentId: 'assign-001',
    studentId: 'student-003',
    status: 'not_started',
    questAttempts: 0,
  },
];

// Mock Class Enrollments - 28 students in class-001, 18 in class-002
export const mockClassEnrollments: ClassEnrollment[] = [
  // Class 001 - 28 students
  ...Array.from({ length: 28 }, (_, i) => ({
    id: `enroll-${i + 1}`,
    classId: 'class-001',
    studentId: `student-${String(i + 1).padStart(3, '0')}`,
    enrollmentDate: new Date('2024-01-08').toISOString(),
    status: 'active' as const,
  })),
  // Class 002 - 18 students
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `enroll-${100 + i + 1}`,
    classId: 'class-002',
    studentId: `student-${String(i + 101).padStart(3, '0')}`,
    enrollmentDate: new Date('2024-01-08').toISOString(),
    status: 'active' as const,
  })),
];

// Mock Learning Materials
export const mockLearningMaterials: LearningMaterial[] = [
  // Budgeting Basics Module - Videos
  {
    id: 'learn-001',
    moduleId: 'module-001',
    classId: undefined,
    title: 'Introduction to Personal Budgeting',
    description: 'Learn the fundamentals of creating and maintaining a personal budget',
    type: 'video',
    content: {
      id: 'video-001',
      title: 'Introduction to Personal Budgeting',
      description: 'Comprehensive introduction to budgeting basics',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 12,
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    createdBy: 'system',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  {
    id: 'learn-002',
    moduleId: 'module-001',
    classId: undefined,
    title: '50/30/20 Budgeting Rule',
    description: 'Understand the popular 50/30/20 budgeting rule and how to apply it',
    type: 'video',
    content: {
      id: 'video-002',
      title: '50/30/20 Budgeting Rule',
      description: 'Learn the 50/30/20 budgeting methodology',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 8,
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    createdBy: 'system',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  // Budgeting Basics Module - Slideshow
  {
    id: 'learn-003',
    moduleId: 'module-001',
    classId: undefined,
    title: 'Budget Planning Slideshow',
    description: 'Step-by-step guide to creating your first budget',
    type: 'slideshow',
    content: {
      id: 'slide-001',
      title: 'Budget Planning Guide',
      description: 'Interactive slideshow for budget planning',
      slides: [
        {
          id: 'slide-001-1',
          title: 'Understanding Budget Basics',
          content: 'A budget is a plan for your money. It helps you track income and expenses.',
          notes: 'Emphasize the importance of tracking',
        },
        {
          id: 'slide-001-2',
          title: 'Calculate Your Income',
          content: 'Start by calculating all sources of monthly income including salary, side gigs, and allowance.',
          notes: 'Include all income sources',
        },
        {
          id: 'slide-001-3',
          title: 'List Your Expenses',
          content: 'Write down all monthly expenses: housing, food, transportation, entertainment, savings.',
          notes: 'Categorize expenses clearly',
        },
        {
          id: 'slide-001-4',
          title: 'Apply the 50/30/20 Rule',
          content: '50% Needs, 30% Wants, 20% Savings. Adjust based on your situation.',
          notes: 'Use examples for clarity',
        },
      ],
    },
    createdBy: 'system',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  // Savings Strategies Module - Videos
  {
    id: 'learn-004',
    moduleId: 'module-002',
    classId: undefined,
    title: 'Emergency Fund Essentials',
    description: 'Why emergency funds are crucial and how to build one',
    type: 'video',
    content: {
      id: 'video-003',
      title: 'Emergency Fund Essentials',
      description: 'Learn why and how to build an emergency fund',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 10,
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    createdBy: 'system',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  {
    id: 'learn-005',
    moduleId: 'module-002',
    classId: undefined,
    title: 'High-Yield Savings Accounts',
    description: 'Maximize your savings with high-yield savings accounts',
    type: 'video',
    content: {
      id: 'video-004',
      title: 'High-Yield Savings Accounts',
      description: 'Comparison and benefits of high-yield savings accounts',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 7,
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    createdBy: 'system',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  // Savings Strategies Module - Slideshow
  {
    id: 'learn-006',
    moduleId: 'module-002',
    classId: undefined,
    title: 'Savings Goals Slideshow',
    description: 'Setting and achieving your savings goals',
    type: 'slideshow',
    content: {
      id: 'slide-002',
      title: 'Savings Goals Guide',
      description: 'Interactive guide to setting savings goals',
      slides: [
        {
          id: 'slide-002-1',
          title: 'Why Save Money?',
          content: 'Savings provide security, opportunities, and financial freedom.',
          notes: 'Connect to personal goals',
        },
        {
          id: 'slide-002-2',
          title: 'Setting SMART Goals',
          content: 'Specific, Measurable, Achievable, Relevant, Time-bound goals lead to success.',
          notes: 'Give examples for each criterion',
        },
        {
          id: 'slide-002-3',
          title: 'The 3-6 Month Rule',
          content: 'Build an emergency fund with 3-6 months of expenses. This protects you from unexpected situations.',
          notes: 'Calculate individual examples',
        },
        {
          id: 'slide-002-4',
          title: 'Automate Your Savings',
          content: 'Set up automatic transfers to make saving effortless. Pay yourself first!',
          notes: 'Explain automation benefits',
        },
      ],
    },
    createdBy: 'system',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  // Investment Fundamentals Module - Videos
  {
    id: 'learn-007',
    moduleId: 'module-003',
    classId: undefined,
    title: 'Stock Market Basics',
    description: 'Introduction to stocks and how the stock market works',
    type: 'video',
    content: {
      id: 'video-005',
      title: 'Stock Market Basics',
      description: 'Understanding stocks and the stock market',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 15,
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    createdBy: 'system',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  {
    id: 'learn-008',
    moduleId: 'module-003',
    classId: undefined,
    title: 'Portfolio Diversification',
    description: 'Learn the importance of diversifying your investment portfolio',
    type: 'video',
    content: {
      id: 'video-006',
      title: 'Portfolio Diversification',
      description: 'Why and how to diversify your investments',
      youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: 11,
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    },
    createdBy: 'system',
    createdAt: new Date('2026-01-05').toISOString(),
  },
];
