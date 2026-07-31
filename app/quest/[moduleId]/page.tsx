'use client';

import { useParams } from 'next/navigation';
import { QuestInterface } from '@/components/quest/QuestInterface';
import { mockModules, mockQuests } from '@/lib/mock-data';

export default function QuestPage() {
  const params = useParams<{ moduleId: string }>();
  const module = mockModules.find((item) => item.id === params.moduleId);
  const quests = mockQuests.filter((item) => item.moduleId === params.moduleId);

  if (!module || quests.length === 0) {
    return <main className="min-h-screen bg-background p-8">Quest not found.</main>;
  }

  return (
    <QuestInterface
      quest={quests[0]}
      module={module}
      questNumber={1}
      totalQuests={quests.length}
      onComplete={() => window.location.assign('/dashboard')}
    />
  );
}
