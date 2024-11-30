'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ArrowRight, Check, Maximize2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import Link from 'next/link'
import { useTemplateSelectionStore } from '../store/template-selextion'

const templates = [
  { id: 1, name: 'Modern Minimalist', images: [
    '/template_images/developer/about.png',
    '/template_images/developer/work.png',
    '/template_images/developer/skills.png'
  ]},
  { id: 2, name: 'Modern Minimalist', images: [
    '/template_images/developer/about.png',
    '/template_images/developer/work.png',
    '/template_images/developer/skills.png'
  ]},
]

function ImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }
  return (
    <div className="relative">
      <div className="relative w-full h-64 overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex]}
          alt={`Template slide ${currentIndex + 1}`}
          layout="fill"
          objectFit="contain"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-2 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
    </div>
  )
}

function ZoomableImage({ src, alt }: { src: string; alt: string }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleZoomIn = () => setScale(prevScale => Math.min(prevScale + 0.1, 3))
  const handleZoomOut = () => setScale(prevScale => Math.max(prevScale - 0.1, 1))

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }, [position])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0 cursor-move"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button variant="outline" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">Zoom out</span>
        </Button>
        <Button variant="outline" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Zoom in</span>
        </Button>
      </div>
    </div>
  )
}

function FullscreenModal({ template }: { template: typeof templates[0] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % template.images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + template.images.length) % template.images.length)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="absolute top-2 right-2">
          <Maximize2 className="h-4 w-4" />
          <span className="sr-only">View fullscreen</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <h2 className="text-2xl font-bold mb-4">{template.name}</h2>
        <div className="relative">
          <ZoomableImage
            src={template.images[currentIndex]}
            alt={`${template.name} - Image ${currentIndex + 1}`}
          />
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 transform -translate-y-1/2"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-2 transform -translate-y-1/2"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function TemplateSelection() {
  const [selectedTemplate, setTemplate] = useState<number | null>(null)
  const {setUserSelectedTemplate , userSelectedTemplate}  = useTemplateSelectionStore()
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Choose Your Portfolio Template
        </h1>
        <p className="text-xl text-gray-300 mb-12 text-center">
          Select a template that best showcases your work and style. You can customize it further in the next step.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template) => (
            <Card 
              key={template.id} 
              className={`bg-gray-800 border-2 transition-all duration-300 ${
                selectedTemplate === template.id ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-gray-700 hover:border-gray-500'
              }`}
            >
              <CardContent className="p-4">
                <div className="relative">
                  <ImageCarousel images={template.images} />
                  <FullscreenModal template={template} />
                </div>
                <h3 className="text-xl font-semibold my-2 text-white">{template.name}</h3>
                <Button 
                  variant={selectedTemplate === template.id ? "default" : "outline"}
                  className="w-full"
                  onClick={() => {setTemplate(template.id)
                    setUserSelectedTemplate(template.id , template.name)
                  }}
                >
                  {selectedTemplate === template.id ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    'Select Template'
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!selectedTemplate}
            asChild
          >
            <Link href={selectedTemplate ? `/components/userInput` : '#'}>
              Proceed to next
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}