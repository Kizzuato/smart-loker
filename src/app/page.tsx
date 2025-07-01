// pages/index.tsx
'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FiSun, FiMoon, FiArrowRight, FiCheck, FiZap } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaFigma } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss } from 'react-icons/si';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Efek untuk menghindari flash pada mode pertama render
  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  // Terapkan dark mode ke document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Animasi scroll
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Head>
        <title>Nexus | Modern Web Solutions</title>
        <meta name="description" content="Build your next digital experience with our cutting-edge solutions" />
      </Head>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <FiZap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Nexus</span>
            </div>

            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('features')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Pricing
              </button>
              <button onClick={() => scrollToSection('testimonials')} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Testimonials
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
              </button>

              <button onClick={() => router.push('/auth/signin')} className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/50 to-transparent dark:from-indigo-900/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
              <span className="block">Build Your Next</span>
              <span className="block text-indigo-600 dark:text-indigo-400">Digital Experience</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
              Powerful tools to bring your ideas to life. Fast, reliable, and beautiful web applications.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <button className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center">
                Get Started <FiArrowRight className="ml-2" />
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <div className="relative w-full max-w-4xl aspect-video bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4/5 h-4/5 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 dark:bg-gray-700 flex items-center px-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="absolute inset-0 mt-8 flex items-center justify-center">
                    <div className="text-center p-6">
                      <FiZap className="mx-auto h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Your Awesome App</h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-400">Preview of what you can build</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Powerful Features</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Everything you need to build modern web applications
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaReact className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
                title: "React Powered",
                description: "Built with the latest React features for maximum performance"
              },
              {
                icon: <SiTypescript className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
                title: "Type Safe",
                description: "TypeScript support out of the box for better developer experience"
              },
              {
                icon: <SiTailwindcss className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
                title: "Tailwind CSS",
                description: "Utility-first CSS framework for rapid UI development"
              },
              {
                icon: <FaNodeJs className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
                title: "Full Stack",
                description: "Complete solution from frontend to backend"
              },
              {
                icon: <FiZap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
                title: "Blazing Fast",
                description: "Optimized for performance and speed"
              },
              {
                icon: <FaFigma className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />,
                title: "Design Ready",
                description: "Pixel-perfect components that match your designs"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 dark:bg-gray-700">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Simple Pricing</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$19",
                description: "Perfect for small projects",
                features: ["Up to 3 projects", "Basic support", "1GB storage", "Community access"],
                featured: false
              },
              {
                name: "Pro",
                price: "$49",
                description: "For growing businesses",
                features: ["Unlimited projects", "Priority support", "10GB storage", "Advanced analytics"],
                featured: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large organizations",
                features: ["Unlimited projects", "24/7 support", "Custom storage", "Dedicated account manager"],
                featured: false
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl shadow-sm overflow-hidden ${plan.featured ? 'ring-2 ring-indigo-600 dark:ring-indigo-400' : 'border border-gray-200 dark:border-gray-700'
                  }`}
              >
                {plan.featured && (
                  <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 transform translate-x-2 -translate-y-2 rotate-12">
                    Popular
                  </div>
                )}
                <div className="p-6 bg-white dark:bg-gray-800">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{plan.description}</p>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-500 dark:text-gray-400">/month</span>}
                  </div>
                  <button
                    className={`mt-6 w-full py-2 px-4 rounded-md ${plan.featured
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      } transition-colors`}
                  >
                    Get started
                  </button>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 px-6 py-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <FiCheck className="h-5 w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        <span className="ml-3 text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Trusted by Developers</h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Join thousands of satisfied users building with our platform
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This platform has completely transformed our development workflow. We're shipping features twice as fast!",
                name: "Sarah Johnson",
                role: "CTO at TechCorp",
                avatar: "SJ"
              },
              {
                quote: "The best developer experience I've ever had. The tools just work and the documentation is superb.",
                name: "Michael Chen",
                role: "Lead Developer",
                avatar: "MC"
              },
              {
                quote: "From prototype to production in record time. Our team couldn't be happier with the results.",
                name: "Emma Rodriguez",
                role: "Product Manager",
                avatar: "ER"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">{testimonial.avatar}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-indigo-100">
            Join thousands of developers and businesses building with our platform today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <button className="px-6 py-3 rounded-lg bg-white text-indigo-600 hover:bg-gray-100 transition-colors flex items-center">
              Get Started <FiArrowRight className="ml-2" />
            </button>
            <button className="px-6 py-3 rounded-lg border border-white text-white hover:bg-indigo-700 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Privacy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Terms</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                Subscribe
              </h3>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                Get the latest news and updates
              </p>
              <div className="mt-4 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700"
                />
                <button className="px-4 py-2 rounded-r-md bg-indigo-600 text-white hover:bg-indigo-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <FiZap className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Nexus</span>
            </div>
            <p className="mt-4 md:mt-0 text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Nexus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}