'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StudentHeaderProps {
  user: User;
  onLogout: () => void;
}

export function StudentHeader({ user, onLogout }: StudentHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    onLogout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold">FQ</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">FinQuest</h1>
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 h-auto p-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.fullName} />
                  <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium text-foreground">{user.fullName}</span>
                  <span className="text-xs text-muted-foreground">Student</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border-border">
              <DropdownMenuItem className="text-foreground">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.fullName}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-foreground hover:bg-card/80 cursor-pointer">
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:bg-card/80 cursor-pointer">
                Learning Statistics
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem
                className="text-destructive hover:bg-destructive/10 cursor-pointer"
                onClick={handleLogout}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
