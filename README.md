# FinQuest - Gamified Financial Literacy Platform

A comprehensive full-stack application that gamifies financial education through interactive quests, adaptive AI challenges, teacher dashboards, and NFT certificate rewards.

## 🌟 Features

### Phase 1: Setup & Authentication
- **School ID-based Login**: Secure authentication for students and teachers
- **Role-based Access**: Separate interfaces for students and teachers
- **User Profiles**: Customizable avatars and learning preferences

### Phase 2: Interactive Quests
- **Financial Simulation Scenarios**: Realistic money management challenges
- **Dynamic Questing**: Multiple quests per module with varying difficulty
- **Real-time Scoring**: Immediate feedback on financial decisions
- **Crisis Scenarios**: Unexpected financial challenges to test emergency preparedness

### Phase 3: AI Adaptation
- **Difficulty Adjustment**: AI learns from student performance
- **Personalized Learning Paths**: Customized pacing and challenge levels
- **Risk Tolerance Assessment**: Evaluates and adapts to student preferences
- **Performance Analytics**: Detailed learning insights and patterns

### Phase 4: Teacher Dashboard
- **Student Progress Tracking**: Monitor completion and performance across modules
- **Automated Grading**: Streamlined assessment of student work
- **Feedback System**: Leave detailed feedback for each student
- **Class Analytics**: View aggregate class performance metrics

### Phase 5: Rewards & Recognition
- **NFT Certificates**: Blockchain-verified proof of completion on Polygon
- **Social Sharing**: One-click sharing to LinkedIn and Twitter
- **Financial Health Score**: Quantified measure of financial literacy
- **Achievement Badges**: Unlock badges for completing modules

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Components**: shadcn/ui components for UI consistency
- **State Management**: React Context API for auth, localStorage for sessions
- **Animations**: Custom CSS animations for polished UX

### Backend
- **Database**: AWS Aurora PostgreSQL (schema provided in `/scripts/schema.sql`)
- **API Routes**: Next.js Route Handlers for backend operations
- **Authentication**: Custom auth context with mock authentication
- **Session Management**: localStorage-based for demo, HTTP-only cookies for production

### Web3 Integration
- **Blockchain**: Polygon network for NFT certificates
- **Smart Contracts**: Minting functionality for student certificates
- **Transaction Tracking**: Polygon Scan integration for transparency

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                    # Home page with redirect logic
│   ├── login/page.tsx              # Student/Teacher login
│   ├── signup/page.tsx             # Account creation
│   ├── dashboard/page.tsx          # Student dashboard
│   ├── teacher-dashboard/page.tsx  # Teacher interface
│   ├── quest/[moduleId]/page.tsx   # Financial quest interface
│   ├── certificate/page.tsx        # NFT certificate display
│   ├── end-journey/page.tsx        # Journey completion summary
│   ├── api/                        # Backend API routes
│   ├── layout.tsx                  # Root layout with auth provider
│   └── globals.css                 # Global styles and animations
│
├── components/
│   ├── student/                    # Student-specific components
│   │   ├── StudentDashboard.tsx
│   │   ├── StudentHeader.tsx
│   │   ├── ModuleCard.tsx
│   │   └── AIProfiling.tsx
│   ├── quest/                      # Quest interface components
│   │   ├── QuestInterface.tsx
│   │   └── QuestResult.tsx
│   ├── teacher/                    # Teacher dashboard components
│   │   ├── TeacherDashboard.tsx
│   │   ├── TeacherHeader.tsx
│   │   ├── StudentProgressTable.tsx
│   │   └── GradingInterface.tsx
│   ├── certificate/                # NFT certificate components
│   │   └── NFTCertificateDisplay.tsx
│   ├── journey/                    # End journey components
│   │   └── EndJourneyDisplay.tsx
│   └── ui/                         # shadcn/ui components
│
├── lib/
│   ├── types.ts                    # TypeScript type definitions
│   ├── auth-context.tsx            # Authentication context provider
│   └── mock-data.ts                # Mock database data
│
└── scripts/
    └── schema.sql                  # AWS Aurora PostgreSQL schema
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd finquest
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

### Demo Credentials

**Student Account:**
- Email: `alex@school.edu`
- Password: `password`

**Teacher Account:**
- Email: `mrs.smith@school.edu`
- Password: `password`

## 📚 Database Setup

To connect to AWS Aurora PostgreSQL:

1. **Create Aurora Database**
   - Set up Aurora PostgreSQL instance in AWS Console
   - Note connection credentials

2. **Run Migration**
```bash
npm run migrate
# Or execute the SQL in /scripts/schema.sql manually
```

3. **Update Environment Variables**
```env
# .env.local
DATABASE_URL=postgresql://user:password@host:port/finquest
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 🔐 Environment Variables

```env
# AWS Aurora PostgreSQL
DATABASE_URL=postgresql://...
DB_HOST=...
DB_USER=...
DB_PASSWORD=...

# Polygon/Web3
POLYGON_RPC_URL=https://polygon-rpc.com/
NFT_CONTRACT_ADDRESS=0x...
PRIVATE_KEY=0x...

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_SECRET=your-secret-key

# AI/ML Services (Future)
TENSORFLOW_API_KEY=...
```

## 🎮 User Journeys

### Student Journey
1. **Login** → 2. **Module Selection** → 3. **Quest Interface** → 4. **AI Adaptation** → 5. **Results** → 6. **Certificate** → 7. **Social Share**

### Teacher Journey
1. **Login** → 2. **Dashboard Overview** → 3. **Student Progress** → 4. **Grading Interface** → 5. **Feedback** → 6. **Class Analytics**

## 🎨 Design System

### Color Palette
- **Primary**: `#00d4ff` (Cyan) - Main accent color
- **Secondary**: `#a855f7` (Purple) - Secondary accent
- **Accent**: `#10b981` (Green) - Success/positive states
- **Destructive**: `#ef4444` (Red) - Errors and warnings
- **Background**: `#0f1419` (Dark Navy) - Main background
- **Card**: `#1a1f2e` (Lighter Navy) - Card backgrounds
- **Muted**: `#404854` (Gray) - Muted text and borders

### Typography
- **Heading Font**: Geist (Sans-serif)
- **Body Font**: Geist (Sans-serif)
- **Mono Font**: Geist Mono (For code)

### Animations
- Slide in animations for page transitions
- Fade in for content loading
- Pulse glow for interactive elements
- Float animation for emphasis

## 🔌 API Endpoints

### Quest Endpoints
- `POST /api/quest/submit` - Submit quest completion
- `GET /api/quest/[questId]` - Get quest details
- `GET /api/quests/module/[moduleId]` - Get module quests

### Grading Endpoints
- `POST /api/grade/submit` - Submit student grade
- `GET /api/grades/student/[studentId]` - Get student grades
- `GET /api/grades/teacher/[teacherId]` - Get teacher's graded students

### Certificate Endpoints
- `POST /api/certificate/mint` - Mint NFT certificate
- `GET /api/certificate/[certificateId]` - Get certificate details
- `GET /api/certificates/student/[studentId]` - Get student certificates

### User Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - Create account
- `POST /api/auth/logout` - Sign out
- `GET /api/user/profile` - Get user profile

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

## 🚢 Deployment

### Deploy to Vercel
```bash
# Connect GitHub repository
vercel --prod

# Or use Vercel Dashboard to auto-deploy from Git
```

### Environment Variables on Vercel
1. Go to Project Settings → Environment Variables
2. Add all required `.env` variables
3. Redeploy

## 🔄 Roadmap

- [ ] Real AWS Aurora PostgreSQL integration
- [ ] TensorFlow AI adaptation engine
- [ ] Banking Sandbox API integration
- [ ] Polygon NFT minting
- [ ] Mobile app (React Native)
- [ ] Advanced teacher analytics
- [ ] Student peer learning features
- [ ] Achievements and badges system
- [ ] API rate limiting and monitoring
- [ ] Enhanced security with 2FA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎓 Educational Value

FinQuest teaches:
- **Personal Finance**: Budgeting, savings, emergency funds
- **Investment Basics**: Risk assessment, diversification
- **Decision Making**: Financial trade-offs and consequences
- **Crisis Management**: Handling unexpected financial emergencies
- **Long-term Planning**: Goal setting and milestone tracking

## 📞 Support

For questions or issues:
1. Check the FAQ section in the app
2. Open an issue on GitHub
3. Contact the development team

## 🙏 Acknowledgments

- shadcn/ui for beautiful component library
- Vercel for Next.js and deployment platform
- Polygon for blockchain infrastructure
- All contributors and beta testers

---

**FinQuest** - Empowering the next generation of financially literate individuals.
