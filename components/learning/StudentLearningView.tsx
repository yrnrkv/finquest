'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockModules, mockLearningMaterials } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VideoPlayer } from './VideoPlayer';
import { SlideshowViewer } from './SlideshowViewer';

export function StudentLearningView() {
  const router = useRouter();
  const [selectedModule, setSelectedModule] = useState<string>('module-001');
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

  const module = mockModules.find(m => m.id === selectedModule);
  const materials = mockLearningMaterials.filter(m => m.moduleId === selectedModule && !m.classId);
  const selectedMaterialData = selectedMaterial ? mockLearningMaterials.find(m => m.id === selectedMaterial) : materials[0];

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
              <h1 className="text-2xl font-bold text-foreground">Learning Resources</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Module Selector & Material List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Module Tabs */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Learning Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockModules.map(mod => (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setSelectedModule(mod.id);
                        setSelectedMaterial(null);
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedModule === mod.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-muted/80'
                      }`}
                    >
                      <div className="text-sm">{mod.name}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Materials List */}
            <Card className="bg-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Learning Materials</CardTitle>
                <CardDescription>{materials.length} resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {materials.map(material => (
                    <button
                      key={material.id}
                      onClick={() => setSelectedMaterial(material.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors border ${
                        selectedMaterial === material.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground truncate">{material.title}</p>
                          <Badge className="mt-2 text-xs" variant="outline">
                            {material.type === 'video' ? '▶ Video' : '📊 Slides'}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Material Viewer */}
          <div className="lg:col-span-3">
            {selectedMaterialData ? (
              <Card className="bg-card border-border/50 h-full">
                <CardHeader>
                  <CardTitle>{selectedMaterialData.title}</CardTitle>
                  <CardDescription>{selectedMaterialData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedMaterialData.type === 'video' ? (
                    <VideoPlayer material={selectedMaterialData} />
                  ) : (
                    <SlideshowViewer material={selectedMaterialData} />
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border/50 h-full flex items-center justify-center">
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Select a learning material to get started</p>
                  <Button onClick={() => setSelectedModule('module-001')} variant="outline">
                    View Module 1
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
