'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Copy, Share2, ExternalLink, Award } from 'lucide-react';

export function NFTCertificateDisplay() {
  const router = useRouter();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  // Mock certificate data
  const certificate = {
    studentName: user?.fullName || 'Student',
    financialHealthScore: 87,
    completionDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    nftContractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    polygonTxHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    certificateId: 'FQ-2024-' + Math.random().toString(36).substring(7).toUpperCase(),
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(certificate.nftContractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary to-secondary opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-lg opacity-50"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Award className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2">
            Congratulations!
          </h1>
          <p className="text-muted-foreground text-lg">You've mastered financial literacy</p>
        </div>

        {/* Certificate Card */}
        <Card className="bg-gradient-to-br from-card via-card to-card/50 border-primary/30 shadow-2xl overflow-hidden mb-8">
          {/* Certificate Top Accent */}
          <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>

          <CardContent className="pt-12 pb-12">
            <div className="space-y-8">
              {/* Certificate Title */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                    NFT Certificate
                  </span>
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">Financial Literacy Certificate</h2>
              </div>

              {/* Certificate Content */}
              <div className="bg-background/50 rounded-lg p-8 border border-border/50 space-y-6">
                {/* Name */}
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-2">This certifies that</p>
                  <p className="text-2xl font-bold text-foreground">{certificate.studentName}</p>
                </div>

                {/* Achievement Text */}
                <div className="border-t border-b border-border/50 py-6">
                  <p className="text-center text-foreground text-sm leading-relaxed">
                    has successfully completed the FinQuest Financial Literacy Program and demonstrated
                    exceptional knowledge in budgeting, savings strategies, and financial decision-making.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                    <p className="text-muted-foreground text-xs mb-1">Financial Health Score</p>
                    <p className="text-3xl font-bold text-primary">{certificate.financialHealthScore}</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg">
                    <p className="text-muted-foreground text-xs mb-1">Completion Date</p>
                    <p className="text-lg font-semibold text-accent">{certificate.completionDate}</p>
                  </div>
                </div>

                {/* Certificate ID */}
                <div className="text-center">
                  <p className="text-muted-foreground text-xs mb-1">Certificate ID</p>
                  <p className="text-sm font-mono text-foreground">{certificate.certificateId}</p>
                </div>
              </div>

              {/* Blockchain Info */}
              <Alert className="bg-secondary/10 border-secondary/30">
                <ExternalLink className="h-4 w-4 text-secondary" />
                <AlertDescription className="text-foreground">
                  <p className="font-semibold mb-2">Verified on Polygon Blockchain</p>
                  <p className="text-sm text-muted-foreground">
                    This certificate has been minted as an NFT on the Polygon network for permanent verification and ownership.
                  </p>
                </AlertDescription>
              </Alert>

              {/* Contract Details */}
              <div className="bg-background/50 rounded-lg p-4 space-y-3">
                <p className="text-sm font-semibold text-foreground">Contract Address</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs text-muted-foreground bg-background px-3 py-2 rounded flex-1 break-all">
                    {certificate.nftContractAddress}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border hover:bg-card bg-transparent"
                    onClick={handleCopyAddress}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                {copied && <p className="text-xs text-accent">Copied to clipboard!</p>}
              </div>

              {/* Blockchain Link */}
              <div className="text-center">
                <Button
                  variant="outline"
                  className="border-border hover:bg-card bg-transparent"
                  onClick={() =>
                    window.open(
                      `https://polygonscan.com/tx/${certificate.polygonTxHash}`,
                      '_blank'
                    )
                  }
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Polygon Scan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3 mb-8">
          <Button
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?text=I just earned my FinQuest Financial Literacy NFT Certificate! 🎓💰 Check out FinQuest for gamified financial education.`,
                '_blank'
              )
            }
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 text-lg flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share on Twitter
          </Button>

          <Button
            onClick={() =>
              window.open(
                `https://www.linkedin.com/feed/?shareActive=true&text=I just completed the FinQuest Financial Literacy Program and earned my NFT Certificate! 🎓💼`,
                '_blank'
              )
            }
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share on LinkedIn
          </Button>

          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            className="w-full border-border hover:bg-card py-6 text-lg text-foreground"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>Your certificate is permanently stored on the blockchain</p>
          <p>Share it with employers, educators, and on your social profiles</p>
        </div>
      </div>
    </div>
  );
}
