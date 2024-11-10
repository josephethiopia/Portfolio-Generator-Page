'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileCode, User, Moon, Sun, Layout } from 'lucide-react'
import { useTheme } from "next-themes"
import Link from 'next/link'

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      <div className="snowflakes" aria-hidden="true">
        {[...Array(50)].map((_, index) => (
          <div key={index} className="snowflake">❅</div>
        ))}
      </div>

      <header className="container mx-auto px-4 py-8 relative z-10">
        <nav className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-400">AIfolio</div>
          <div className="space-x-4 flex items-center">
            <Button variant="ghost" asChild className="text-white hover:text-blue-400">
              <Link href="/how-it-works">How it Works</Link>
            </Button>
            <Button variant="ghost" asChild className="text-white hover:text-blue-400">
              <Link href="/about">About</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:text-blue-400"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 relative z-10">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Create Your Perfect Portfolio with AI</h1>
          <p className="text-xl text-gray-300 mb-8">Showcase your work effortlessly with our AI-powered portfolio generator. Stand out from the crowd and land your dream opportunities.</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
            <Link href="#get-started">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        <section id="features" className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: User, title: "User-Friendly Interface", description: "Easily input your personal details, skills, and project information." },
              { icon: Layout, title: "Customizable Templates", description: "Choose from a variety of professionally designed portfolio templates." },
              { icon: FileCode, title: "Dynamic Imports", description: "Efficient loading of template components for optimal performance." }
            ].map((item, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="flex flex-col items-center p-6">
                  <item.icon className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-center">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="get-started" className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Ready to Create Your Portfolio?</h2>
          <p className="text-xl text-gray-300 mb-6 text-center">Follow these simple steps to generate your AI-powered portfolio:</p>
          <ol className="text-left text-lg text-gray-400 mb-6 space-y-2 max-w-md mx-auto">
            <li>1. Click the &quot;Get Started&quot; button below</li>
            <li>2. Fill in your personal and professional information</li>
            <li>3. Choose your preferred portfolio template</li>
            <li>4. Review and confirm your details</li>
            <li>5. Let our AI customize your portfolio</li>
            <li>6. Receive your unique portfolio URL</li>
          </ol>
          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/template-selection">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 mt-16 relative z-10">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AIfolio. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-100vh) translateX(0);
          }
          100% {
            transform: translateY(100vh) translateX(-100px);
          }
        }

        .snowflakes {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .snowflake {
          position: absolute;
          color: #fff;
          font-size: 1em;
          opacity: 0.8;
          animation: snowfall 15s linear infinite;
        }

        .snowflake:nth-child(2n) {
          animation-duration: 20s;
        }

        .snowflake:nth-child(3n) {
          animation-duration: 25s;
          animation-delay: 2s;
        }

        .snowflake:nth-child(4n) {
          animation-duration: 18s;
          animation-delay: 4s;
        }

        .snowflake:nth-child(5n) {
          animation-duration: 22s;
          animation-delay: 6s;
        }
      `}</style>
    </div>
  )
}