"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter, Moon, Sun, Download } from "lucide-react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <div className="flex items-center space-x-4">
            <Link
              href="#about"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section id="hero" className="text-center mb-20">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="John Doe"
            width={200}
            height={200}
            className="rounded-full mx-auto mb-8"
          />
          <h2 className="text-4xl font-bold mb-4">John Doe</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Senior Full-Stack Developer
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <Link
              href="https://twitter.com/johndoe"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Twitter size={24} aria-label="Twitter profile" />
            </Link>
            <Link
              href="https://github.com/johndoe"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github size={24} aria-label="GitHub profile" />
            </Link>
            <Link
              href="https://linkedin.com/in/johndoe"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-500 transition-colors"
            >
              <Linkedin size={24} aria-label="LinkedIn profile" />
            </Link>
          </div>
          <Link
            href="/JohnDoe_Resume.pdf"
            download
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="mr-2 h-4 w-4" /> Download CV
          </Link>
        </section>

        <section id="about" className="mb-20">
          <h3 className="text-2xl font-bold mb-4">About Me</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Hello! I'm John Doe, a senior full-stack developer with over 5 years
            of experience in building robust, scalable web applications. My
            expertise spans the entire development lifecycle, from
            conceptualization to deployment and maintenance. I'm passionate
            about leveraging cutting-edge technologies to solve complex business
            problems and create exceptional user experiences.
          </p>
        </section>

        <section id="contact" className="text-center">
          <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            I'm always open to new opportunities and exciting projects. Feel
            free to reach out!
          </p>
          <Link
            href="mailto:johndoe@example.com"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Me
          </Link>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
      </footer>
    </div>
  );
}
