# FinQuest Complete Workflow Guide

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FinQuest Platform                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐          ┌──────────────────────┐   │
│  │   STUDENT SIDE       │          │   TEACHER SIDE       │   │
│  └──────────────────────┘          └──────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                   SHARED DATABASE                        │  │
│  │          AWS Aurora PostgreSQL Tables:                   │  │
│  │  - users, modules, quests                               │  │
│  │  - assignments, student_assignments                     │  │
│  │  - class_enrollments, classes                           │  │
│  │  - grading_records, nft_certificates                    │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              EXTERNAL INTEGRATIONS                       │  │
│  │  - Polygon Network (NFT Minting)                         │  │
│  │  - Banking Sandbox API (Financial Data)                 │  │
│  │  - LinkedIn (Credential Sharing)                        │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Student Workflow: Complete Journey

### Phase 1: Authentication & Enrollment

```
┌──────────┐
│  Start   │
└────┬─────┘
     │
     ▼
┌──────────────────────┐
│  Visit FinQuest      │
│  finquest.app       │
└────┬─────────────────┘
     │
     ├─ Existing User? ────────┐
     │                         │
     ▼                         ▼
┌─────────────┐         ┌─────────────┐
│  /login     │         │  /signup    │
│  - Email    │         │  - Full Name│
│  - Password │         │  - Email    │
└────┬────────┘         │  - Password │
     │                  │  - Role     │
     │                  └────┬────────┘
     └──────────┬─────────────┘
                │
                ▼
        ┌────────────────┐
        │ Authentication │
        │  Validation    │
        └────┬───────────┘
             │
             ▼
        ┌────────────────┐
        │  Dashboard     │
        │  /dashboard    │
        └────────────────┘
```

### Phase 2: Module Selection & AI Profiling

```
┌────────────────────────────────────────────────────┐
│         Student Dashboard (/dashboard)             │
├────────────────────────────────────────────────────┤
│                                                    │
│  ┌─ Progress Stats ─────────────────────────────┐ │
│  │ Modules Completed: 1/3                       │ │
│  │ In Progress: 1/3                             │ │
│  │ Average Score: 81.5                          │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌─ Learning Modules ───────────────────────────┐ │
│  │ ┌──────────────┐ ┌──────────────┐            │ │
│  │ │  Budgeting   │ │   Savings    │ ...        │ │
│  │ │   Basics     │ │ Strategies   │            │ │
│  │ │ [Completed]  │ │ [In Progress]│            │ │
│  │ └──────────────┘ └──────────────┘            │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌─ Quick Actions ───────────────────────────────┐│
│  │ [Show AI Profile] [View Assignments]          ││
│  └───────────────────────────────────────────────┘│
│                                                    │
│  ┌─ Recent Assignments ──────────────────────────┐│
│  │ Assignment: Budgeting Basics Quest            ││
│  │ Status: [Graded] • Due: 1/31/2026 • 85/100   ││
│  │ [View All →]                                 ││
│  └───────────────────────────────────────────────┘│
└────────────────────────────────────────────────────┘
```

### Phase 3: Assignment Tracking

```
┌──────────────────────────────────────────────────────┐
│    Student Assignments (/student/assignments)        │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Filter Tabs:                                        │
│  [All] [Not Started] [In Progress] [Submitted] [Graded]
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │ Assignment: Budgeting Basics Quest           │  │
│  │ Status: [Not Started]                        │  │
│  │ Module: Budgeting Basics                     │  │
│  │ Points: 100 | Due: 2/5/2026 (11 days)       │  │
│  │ [START QUEST]                                │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │ Assignment: Savings Strategies Quest         │  │
│  │ Status: [In Progress] • Best: 68%           │  │
│  │ Module: Savings Strategies                   │  │
│  │ Points: 100 | Due: 2/12/2026 (18 days)      │  │
│  │ [CONTINUE QUEST]                             │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │ Assignment: Investment Fundamentals Quest    │  │
│  │ Status: [Graded] • Score: 92%               │  │
│  │ Module: Investment Fundamentals              │  │
│  │ Points: 100 | Due: 2/19/2026 (25 days)      │  │
│  │ [VIEW RESULT]                                │  │
│  └───────────────────────────────────────────────┘  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Phase 4: Financial Quest Simulation

```
┌────────────────────────────────────────────┐
│      Financial Quest (/quest/[moduleId])   │
├────────────────────────────────────────────┤
│                                            │
│  Module: Budgeting Basics                 │
│  Quest: The Monthly Budget Challenge       │
│                                            │
│  ┌──────────────────────────────────────┐ │
│  │ Financial Scenario (AI-Adaptive)     │ │
│  │                                      │ │
│  │ "You have $3,000 monthly income.    │ │
│  │  Allocate it wisely across:          │ │
│  │  - Rent (30-40% recommended)        │ │
│  │  - Food (10-15% recommended)        │ │
│  │  - Utilities (5-10% recommended)    │ │
│  │  - Savings (20% recommended)        │ │
│  │  - Fun Money (10% recommended)"     │ │
│  │                                      │ │
│  │  Your Decision:                      │ │
│  │  ┌──────────────────────────────┐   │ │
│  │  │ Rent:       $_____            │   │ │
│  │  │ Food:       $_____            │   │ │
│  │  │ Utilities:  $_____            │   │ │
│  │  │ Savings:    $_____            │   │ │
│  │  │ Fun Money:  $_____            │   │ │
│  │  │                               │   │ │
│  │  │ [SUBMIT DECISION]             │   │ │
│  │  └──────────────────────────────┘   │ │
│  └──────────────────────────────────────┘ │
│                                            │
│  [Progress: Quest 1 of 3]                 │
│                                            │
└────────────────────────────────────────────┘
           │
           ▼
┌────────────────────────────────────────────┐
│         Quest Result (Feedback)            │
├────────────────────────────────────────────┤
│                                            │
│  Score: 85/100                            │
│  Time Taken: 3 minutes 42 seconds         │
│                                            │
│  ✓ Good rent allocation (32% - Safe!)    │
│  ✓ Smart food budgeting (12% - Good!)    │
│  ✓ Adequate savings (18% - Close!)       │
│  ⚠ Utilities slightly high (12% - OK)   │
│  ✗ Fun money over-allocated (26% - Fix!) │
│                                            │
│  AI Analysis:                              │
│  "You're on the right track! Your rent   │
│   and food allocations are realistic.    │
│   Next time, try to reduce fun money to  │
│   let more go to savings."                │
│                                            │
│  Difficulty Level:                        │
│  Current: Intermediate ────────────      │
│  Next: Intermediate (stable)             │
│                                            │
│  [CONTINUE TO NEXT QUEST]                │
│                                            │
└────────────────────────────────────────────┘
           │
           ├─ More Quests? ──┐
           │                 │
           ▼                 ▼
    ┌──────────────┐  ┌─────────────────┐
    │ Next Quest   │  │ All Quests Done?│
    │ Loop Back    │  │ (Crisis Trigger)│
    └──────────────┘  └────────┬────────┘
                               │
                               ▼
                    ┌──────────────────────────┐
                    │ Crisis Scenario (AI)     │
                    │                          │
                    │ "Your car breaks down!  │
                    │  You have $500 emergency│
                    │  fund but need $800.    │
                    │  What do you do?"       │
                    │                          │
                    │ [Decision Path...]      │
                    └──────────────────────────┘
```

### Phase 5: Completion & Certification

```
When all module quests completed:

┌────────────────────────────────────┐
│  Financial Health Assessment       │
├────────────────────────────────────┤
│                                    │
│  Modules Completed: 3/3           │
│  Average Score: 87.2              │
│  Total Time: 4 hours 23 minutes   │
│                                    │
│  Financial Health Score: 87/100   │
│  (Excellent!)                      │
│                                    │
│  Strengths:                        │
│  ✓ Budget Allocation              │
│  ✓ Crisis Decision-Making         │
│  ✓ Savings Strategy               │
│                                    │
│  Areas to Improve:                │
│  • Investment Risk Tolerance      │
│  • Long-term Planning             │
│                                    │
│  [MINT NFT CERTIFICATE]           │
│                                    │
└────────────────────────────────────┘
          │
          ▼
┌────────────────────────────────────┐
│  NFT Certificate (Polygon)         │
├────────────────────────────────────┤
│                                    │
│  ┌──────────────────────────────┐ │
│  │                              │ │
│  │   FinQuest Certificate      │ │
│  │                              │ │
│  │   Alex Johnson               │ │
│  │   Completed Financial        │ │
│  │   Literacy Quest             │ │
│  │                              │ │
│  │   Date: Jan 25, 2026        │ │
│  │   Score: 87/100             │ │
│  │   Verified on Polygon       │ │
│  │                              │ │
│  │   TX: 0x42a78...             │ │
│  │                              │ │
│  └──────────────────────────────┘ │
│                                    │
│  Wallet: 0x1234...                │
│  Contract: 0x5678...              │
│                                    │
│  [SHARE ON LINKEDIN]              │
│  [DOWNLOAD PDF]                   │
│  [VIEW ON POLYGONSCAN]            │
│                                    │
└────────────────────────────────────┘
```

## Teacher Workflow: Assignment Management

### Step 1: Create Assignment

```
┌────────────────────────────────────────────────────┐
│  Teacher Dashboard → [Manage Classwork]            │
├────────────────────────────────────────────────────┤
│                                                    │
│  Class Selector:                                   │
│  ┌────────────────────────────────────────────┐  │
│  │ [✓] Personal Finance 101 - Period 2        │  │
│  │     Grade 9-12 • Spring 2024 • 28 students│  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │ Personal Finance 101 - Period 2             │  │
│  │ Introduction to personal financial         │  │
│  │ management                                  │  │
│  │                                             │  │
│  │ Students: 28 | Assignments: 2              │  │
│  │                  [+ CREATE ASSIGNMENT]     │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
└────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────┐
│     Create New Assignment Modal                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Assignment Title:                                  │
│  [________________]                                 │
│                                                     │
│  Description:                                       │
│  [____________________________________________]     │
│  [____________________________________________]     │
│                                                     │
│  Financial Module:                                  │
│  [Budgeting Basics ▼]                             │
│                                                     │
│  Module Preview:                                    │
│  "Learn how to create and manage a personal        │
│   budget"                                           │
│                                                     │
│  Points: [100] | Due Date: [2/5/2026]            │
│                                                     │
│  Status: ◯ Draft  ◉ Publish Now                   │
│                                                     │
│  [Cancel] [Create Assignment]                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Step 2: Monitor Submissions

```
┌──────────────────────────────────────────────────────┐
│    Classwork Management (/teacher/classwork)         │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Filter: [All] [Published] [Draft] [Closed]        │
│                                                      │
│  ┌─ Budgeting Basics Quest ─────────────────────┐  │
│  │ Status: [Published]                          │  │
│  │ Description: Complete budgeting quest...     │  │
│  │ Module: Budgeting Basics (Beginner)          │  │
│  │ Points: 100 | Due: 2/5/2026                  │  │
│  │                                               │  │
│  │ Completion: 89% ████████░                    │  │
│  │ 25/28 students submitted                     │  │
│  │                                               │  │
│  │ ▼ [EXPAND]                                   │  │
│  └─────────────────────────────────────────────┘  │
│                 │
│                 ▼
│  ┌─ Submission Details ─────────────────────────┐  │
│  │                                               │  │
│  │  Student Submissions:                         │  │
│  │  ┌─────────────────────────────────────────┐ │  │
│  │  │ Alex Johnson      [Graded] • 85% Score │ │  │
│  │  │ Jordan Lee        [Submitted] [Grade] │ │  │
│  │  │ Casey Davis       [In Progress] • 68% │ │  │
│  │  │ Sam Rodriguez     [Not Started]       │ │  │
│  │  │ ...                                   │ │  │
│  │  └─────────────────────────────────────────┘ │  │
│  │                                               │  │
│  │  [Publish] [Close] [Edit] [Delete]           │  │
│  │                                               │  │
│  └─────────────────────────────────────────────┘  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### Step 3: Grade Submissions

```
┌────────────────────────────────────────────────────────┐
│  Teacher Dashboard → Grading Tab                       │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Select Student: [Alex Johnson ▼]                     │
│  Select Module: [Budgeting Basics ▼]                 │
│                                                        │
│  ┌───────────────────────────────────────────────┐   │
│  │ Student: Alex Johnson                         │   │
│  │ Module: Budgeting Basics                      │   │
│  │ Status: [Submitted - Awaiting Grade]          │   │
│  │                                                │   │
│  │ Submission Details:                            │   │
│  │ ├─ Quest 1: Budget Allocation (85/100)       │   │
│  │ ├─ Quest 2: Emergency Expense (78/100)       │   │
│  │ └─ Overall Score: 81.5/100                   │   │
│  │                                                │   │
│  │ Feedback:                                      │   │
│  │ ┌──────────────────────────────────────────┐  │   │
│  │ │ Great work on budget allocation! Your   │  │   │
│  │ │ emergency fund decision showed good     │  │   │
│  │ │ planning. Next time, consider building  │  │   │
│  │ │ a larger emergency fund (3-6 months    │  │   │
│  │ │ of expenses).                           │  │   │
│  │ └──────────────────────────────────────────┘  │   │
│  │                                                │   │
│  │ Grade: [A-] (90-92)                           │   │
│  │                                                │   │
│  │ [SUBMIT GRADE]                                │   │
│  │                                                │   │
│  └───────────────────────────────────────────────┘   │
│                                                        │
└────────────────────────────────────────────────────────┘
           │
           ▼
    Grade saved & notification sent to student
```

## Integration Points

### Assignment Lifecycle

```
TEACHER SIDE:
Create Assignment
    │
    ├─ Select Module (Budgeting, Savings, Investing)
    ├─ Set Due Date & Points
    └─ Publish
         │
         ▼
Monitor Submissions (Real-time)
    │
    ├─ View completion %
    ├─ See individual attempts
    └─ Track urgency
         │
         ▼
Grade Work
    │
    ├─ Review quest performance
    ├─ Provide feedback
    └─ Assign grade
         │
         ▼
STUDENT SIDE: Receives Graded Assignment + Feedback

──────────────────────────────────────────────────────

STUDENT SIDE:
See Assignment in Dashboard
    │
    ├─ View due date
    ├─ Check status
    └─ Click to start
         │
         ▼
Complete Financial Quests
    │
    ├─ Solve scenarios
    ├─ Get immediate feedback
    └─ AI adjusts difficulty
         │
         ▼
Submit Assignment
    │
    ├─ Score auto-calculated
    └─ Status → Submitted
         │
         ▼
TEACHER SIDE: Sees submission in grading queue
         │
         ▼
Receive Grade & Feedback
    │
    ├─ View teacher comments
    ├─ See final score
    └─ Read recommendations

──────────────────────────────────────────────────────

Database Synchronization:
- `/api/quest/submit` → Updates quest_attempts, student_assignments
- `/api/grade/submit` → Updates grading_records, student_assignments
- Real-time queries show both teacher & student current state
```

## Data Flow Diagram

```
┌────────────────────────────────────────────────────────┐
│                    USER ACTION                         │
└────────┬─────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────┐
│              NEXT.JS ROUTE HANDLER                     │
│         (Server Component or API Route)                │
└────────┬─────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────┐
│            BUSINESS LOGIC LAYER                        │
│  - Validation                                          │
│  - Calculation (scores, difficulty)                    │
│  - Rules enforcement                                   │
└────────┬─────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────┐
│         AWS AURORA POSTGRESQL DATABASE                 │
│                                                        │
│  Tables Modified:                                      │
│  - quest_attempts (INSERT/UPDATE)                     │
│  - student_assignments (UPDATE)                       │
│  - student_progress (UPDATE)                          │
│  - grading_records (INSERT/UPDATE)                    │
│  - nft_certificates (INSERT)                          │
└────────┬─────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────┐
│          OPTIONAL EXTERNAL SERVICES                    │
│  - Polygon Network (NFT minting)                       │
│  - SendGrid (Email notifications)                      │
│  - LinkedIn API (Share credentials)                    │
└────────┬─────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────┐
│            RESPONSE TO USER                            │
│  - Updated component state                            │
│  - UI refresh                                         │
│  - Navigation/redirect                                │
└────────────────────────────────────────────────────────┘
```

## Key Integration Points

### 1. Assignment → Module Connection
- Teacher selects module when creating assignment
- Module defines available quests
- Student sees linked module on assignment card

### 2. Student Submission → Grade Sync
- Quest submission auto-saves to `student_assignments`
- Teacher retrieves submitted work from grading interface
- Grade updates reflected immediately to student dashboard

### 3. Progress Tracking
- Each quiz attempt updates `student_progress`
- AI adjusts `student_ai_profile` based on performance
- Teacher dashboard shows real-time aggregated stats

### 4. Certificate Generation
- Triggered when all module assignments completed
- Calculates financial health score
- Mints NFT on Polygon blockchain
- Records in `nft_certificates` table

## Troubleshooting Integration Issues

### Assignment Not Visible to Student
1. ✓ Check assignment status = 'published'
2. ✓ Verify student enrolled in class
3. ✓ Clear browser cache
4. ✓ Check database sync

### Grades Not Updating
1. ✓ Verify API endpoint called correctly
2. ✓ Check database permissions
3. ✓ Ensure user has teacher role
4. ✓ Review API response for errors

### Scores Not Calculating
1. ✓ Verify quest submission was received
2. ✓ Check scoring algorithm in API
3. ✓ Confirm database INSERT successful
4. ✓ Check client-side state update

---

This complete workflow shows how students engage with financial quests through assignments managed by teachers, with all data synchronized through a centralized AWS Aurora database.
