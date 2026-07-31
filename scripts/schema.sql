-- FinQuest Database Schema for AWS Aurora PostgreSQL

-- Users table (Students and Teachers)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher')),
  school_id VARCHAR(100),
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial modules (Budgeting, Savings, Investing, etc.)
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty_level VARCHAR(50) NOT NULL,
  content_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student progress tracking
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  current_score INT DEFAULT 0,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, module_id)
);

-- Financial simulation quests
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  quest_name VARCHAR(255) NOT NULL,
  description TEXT,
  scenario TEXT,
  difficulty_multiplier DECIMAL(3, 2) DEFAULT 1.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quest attempts and results
CREATE TABLE quest_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  quest_id UUID NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
  attempt_number INT DEFAULT 1,
  income_amount DECIMAL(10, 2),
  savings_amount DECIMAL(10, 2),
  risk_profile VARCHAR(50),
  score INT,
  difficulty_adjusted BOOLEAN DEFAULT FALSE,
  is_crisis_triggered BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teacher grading records
CREATE TABLE grading_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  grade VARCHAR(2),
  feedback TEXT,
  graded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NFT Certificates
CREATE TABLE nft_certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  nft_contract_address VARCHAR(255),
  nft_token_id VARCHAR(255),
  polygon_tx_hash VARCHAR(255),
  financial_health_score INT,
  issued_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Student learning preferences and AI adaptation data
CREATE TABLE student_ai_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  difficulty_level VARCHAR(50) DEFAULT 'beginner',
  learning_pace VARCHAR(50) DEFAULT 'normal',
  risk_tolerance VARCHAR(50) DEFAULT 'moderate',
  crisis_scenario_preference BOOLEAN DEFAULT TRUE,
  total_quests_completed INT DEFAULT 0,
  average_score DECIMAL(5, 2) DEFAULT 0.0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for common queries
CREATE INDEX idx_student_progress_student_id ON student_progress(student_id);
CREATE INDEX idx_student_progress_module_id ON student_progress(module_id);
CREATE INDEX idx_quest_attempts_student_id ON quest_attempts(student_id);
CREATE INDEX idx_quest_attempts_quest_id ON quest_attempts(quest_id);
CREATE INDEX idx_grading_records_teacher_id ON grading_records(teacher_id);
CREATE INDEX idx_grading_records_student_id ON grading_records(student_id);
CREATE INDEX idx_nft_certificates_student_id ON nft_certificates(student_id);
