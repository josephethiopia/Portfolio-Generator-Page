'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search } from 'lucide-react'
const templates = [
  { id: 'developer', name: 'Developer', description: 'Showcase your coding projects and technical skills', category: 'Tech' },
  { id: 'designer', name: 'Designer', description: 'Display your creative work and design process', category: 'Creative' },
  { id: 'photographer', name: 'Photographer', description: 'Present your best shots in a visually stunning layout', category: 'Creative' },
]

export default function TemplateSelectionPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', ...Array.from(new Set(templates.map(template => template.category)))]

  const filteredTemplates = templates.filter(template => 
    (selectedCategory === 'All' || template.category === selectedCategory) &&
    (template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     template.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Choose Your Personal Portfolio Template
        </h1>
        <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl mx-auto">
          Select a template that best represents your professional identity. 
          Our AI will customize it to showcase your unique skills, projects, and achievements.
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-64">
            <Input
              type="text"
              placeholder="Search templates"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 text-white border-gray-700"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="bg-gray-800 border-gray-700">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={`/placeholder.svg?text=${template.name}+Template`}
                    alt={`${template.name} portfolio template preview`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-400 mb-4">{template.description}</p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href={`/customize/${template.id}`}>
                    Use This Template
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No templates found. Try adjusting your search or category selection.</p>
        )}
      </div>
    </div>
  )
}