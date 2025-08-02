import Link from 'next/link'
import { ArrowRight, Box, Palette, Zap, Download, Users, Star, Check } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <Box className="h-8 w-8 mr-2 text-blue-600" />
          <span className="font-bold text-xl text-slate-900">PackagePro</span>
        </Link>
        <nav className="ml-auto flex gap-6 items-center">
          <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="/templates">
            Templates
          </Link>
          <Link className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors" href="/auth/signin">
            Sign In
          </Link>
          <Link 
            href="/auth/signup"
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-blue-100 text-blue-800 mb-4">
                <Zap className="w-4 h-4 mr-2" />
                AI-Powered Design Platform
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-slate-900">
                Create Professional 
                <span className="text-blue-600"> Packaging Designs</span> in Minutes
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Transform your ideas into stunning 3D packaging mockups with our AI-powered platform. 
                Perfect for designers, marketers, and businesses of all sizes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link 
                  href="/auth/signup"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow-lg hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 transition-all duration-200 hover:shadow-xl"
                >
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  href="/templates"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-8 text-sm font-medium text-slate-900 shadow hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 transition-all duration-200"
                >
                  Browse Templates
                </Link>
              </div>
              <div className="flex items-center space-x-4 mt-6 text-sm text-slate-600">
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-1" />
                  Free to start
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 text-green-600 mr-1" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  4.9/5 rating
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
                Everything You Need to Design
              </h2>
              <p className="max-w-[900px] text-slate-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Professional packaging design tools powered by AI, with real-time 3D previews and instant exports.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">AI-Powered Design</h3>
                <p className="text-slate-600">
                  Let AI suggest layouts, colors, and typography that perfectly match your brand and product.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Box className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">3D Mockups</h3>
                <p className="text-slate-600">
                  Visualize your designs with realistic 3D mockups that show exactly how your packaging will look.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Instant Export</h3>
                <p className="text-slate-600">
                  Export high-resolution images, PDFs, and 3D models ready for production or client presentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 bg-slate-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-slate-600">Designs Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">15K+</div>
                <div className="text-sm text-slate-600">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">200+</div>
                <div className="text-sm text-slate-600">Templates</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">99%</div>
                <div className="text-sm text-slate-600">Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Transform Your Packaging?
              </h2>
              <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of designers and brands creating stunning packaging with PackagePro.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link 
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-slate-900 shadow hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 transition-all duration-200"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  href="/templates"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-slate-600 px-8 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 transition-all duration-200"
                >
                  View Templates
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 PackagePro. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}