"use client";
import React from "react";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/components/userInput");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 p-4">
      <div className="max-w-3xl w-full space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full animate-pulse"></div>
          </div>
          <Rocket className="relative mx-auto h-24 w-24 text-primary animate-bounce" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to Portfolio Generator
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            Create your professional portfolio in minutes!
          </p>
        </div>
        <Button
          onClick={handleStart}
          size="lg"
          className="px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          Create Portfolio
        </Button>
        <div className="mt-12">
          <p className="text-sm text-muted-foreground">
            Join the community and start creating your portfolio today!
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 text-center text-sm text-muted-foreground">
        © 2024 Portfolio Generator. All rights reserved.
      </div>
    </div>
  );
}
