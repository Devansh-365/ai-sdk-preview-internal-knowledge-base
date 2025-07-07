"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Store, Loader2 } from "lucide-react";

interface OnboardingProps {
  storeId: string;
}

export function Onboarding({ storeId }: OnboardingProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border bg-white dark:bg-zinc-800">
          <CardContent className="p-12">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-blue-500 rounded-full flex items-center justify-center">
                <Store className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600 mb-2">
                  Setting up your store
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome to <span className="font-semibold capitalize">{storeId.replaceAll("-", " ")}</span>
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Preparing your AI assistant...
                </p>
              </div>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
