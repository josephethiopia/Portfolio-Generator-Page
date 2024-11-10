import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Code, Palette, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          About AIfolio
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-xl text-gray-300 mb-6">
              AIfolio is an innovative platform that leverages the power of artificial intelligence to help professionals create stunning, personalized portfolios. Our mission is to empower individuals across various fields to showcase their skills, projects, and achievements in a way that stands out in today's competitive digital landscape.
            </p>
            <p className="text-xl text-gray-300 mb-6">
              Whether you're a developer, designer, photographer, writer, or any other professional, AIfolio provides you with the tools to create a portfolio that truly represents your unique identity and expertise.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/template-selection">
                Explore Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-square">
            <Image
              src="/placeholder.svg?text=AIfolio+Showcase"
              alt="AIfolio showcase"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">How AIfolio Works</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Code,
              title: "AI-Powered Customization",
              description: "Our advanced AI analyzes your input and tailors the chosen template to best represent your professional identity."
            },
            {
              icon: Palette,
              title: "Professional Templates",
              description: "Choose from a wide range of expertly designed templates suitable for various industries and roles."
            },
            {
              icon: Zap,
              title: "Easy to Use",
              description: "With our user-friendly interface, create and deploy your portfolio in minutes, no coding skills required."
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="bg-gray-800 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Vision</h2>
          <p className="text-xl text-gray-300 text-center mb-8">
            At AIfolio, we envision a world where every professional has access to a powerful, personalized online presence. As an open-source and free-to-use platform, we're committed to continuously improving our AI technology and expanding our template offerings to meet the evolving needs of professionals across all industries, while keeping it accessible to everyone.
          </p>
          <div className="flex justify-center">
            <Button asChild size="lg" variant="outline" className="mr-4">
              <Link href="/how-it-works">
                Learn More
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/template-selection">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Portfolio?</h2>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/template-selections">
              Create Your Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}