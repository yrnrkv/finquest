'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockModules, mockClasses, mockLearningMaterials } from '@/lib/mock-data';
import { LearningMaterial } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LearningMaterialCard } from './LearningMaterialCard';
import { AddLearningMaterialModal } from './AddLearningMaterialModal';

export function TeacherLearningView() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<string>('module-001');
  const [selectedClass, setSelectedClass] = useState<string>('class-001');
  const [showAddModal, setShowAddModal] = useState(false);
  const [materials, setMaterials] = useState<LearningMaterial[]>(mockLearningMaterials);

  const module = mockModules.find(m => m.id === selectedModule);
  const classData = mockClasses.find(c => c.id === selectedClass);

  // Filter materials: module-wide + class-specific
  const moduleMaterials = materials.filter(m => m.moduleId === selectedModule && !m.classId);
  const classMaterials = materials.filter(m => m.moduleId === selectedModule && m.classId === selectedClass);

  const handleAddMaterial = (newMaterial: Omit<LearningMaterial, 'id' | 'createdAt'>) => {
    const material: LearningMaterial = {
      ...newMaterial,
      id: `learn-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setMaterials([...materials, material]);
    setShowAddModal(false);
  };

  const handleDeleteMaterial = (materialId: string) => {
    setMaterials(materials.filter(m => m.id !== materialId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/dashboard')}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Back
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Learning Resources Management</h1>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              + Add Material
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Module & Class Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <label className="text-sm font-semibold text-foreground mb-3 block">Select Module</label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full px-4 py-2 bg-muted border border-border/50 rounded-lg text-foreground focus:outline-none focus:border-primary"
              >
                {mockModules.map(mod => (
                  <option key={mod.id} value={mod.id}>{mod.name}</option>
                ))}
              </select>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardContent className="pt-6">
              <label className="text-sm font-semibold text-foreground mb-3 block">Select Class (for class-specific materials)</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2 bg-muted border border-border/50 rounded-lg text-foreground focus:outline-none focus:border-primary"
              >
                {mockClasses.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.className}</option>
                ))}
              </select>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="module-wide" className="space-y-6">
          <TabsList className="bg-card border border-border/50">
            <TabsTrigger value="module-wide">Module-Wide Materials ({moduleMaterials.length})</TabsTrigger>
            <TabsTrigger value="class-specific">Class-Specific Materials ({classMaterials.length})</TabsTrigger>
          </TabsList>

          {/* Module-Wide Materials */}
          <TabsContent value="module-wide" className="space-y-4">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>Module-Wide Learning Resources</CardTitle>
                <CardDescription>Available to all students taking {module?.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {moduleMaterials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {moduleMaterials.map(material => (
                      <LearningMaterialCard
                        key={material.id}
                        material={material}
                        onDelete={() => handleDeleteMaterial(material.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No module-wide materials yet</p>
                    <Button onClick={() => setShowAddModal(true)} variant="outline">
                      Add First Material
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Class-Specific Materials */}
          <TabsContent value="class-specific" className="space-y-4">
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle>Class-Specific Learning Resources</CardTitle>
                <CardDescription>Available only to students in {classData?.className}</CardDescription>
              </CardHeader>
              <CardContent>
                {classMaterials.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classMaterials.map(material => (
                      <LearningMaterialCard
                        key={material.id}
                        material={material}
                        onDelete={() => handleDeleteMaterial(material.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No class-specific materials yet for {classData?.className}</p>
                    <Button onClick={() => setShowAddModal(true)} variant="outline">
                      Add Class Material
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Material Modal */}
      {showAddModal && (
        <AddLearningMaterialModal
          moduleId={selectedModule}
          classId={selectedClass}
          onClose={() => setShowAddModal(false)}
          onCreate={handleAddMaterial}
        />
      )}
    </div>
  );
}
