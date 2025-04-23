'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Welcome to Interior Design Studio
        </p>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6">Interior Design Solutions</h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Create beautiful and functional interior designs with our powerful design tools.
        </p>
        <div className="flex gap-6">
          <Link 
            href="/interior-design.html"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Launch Design Studio
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Floor Planning</h2>
          <p>Create detailed floor plans with precise measurements and room layouts.</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">3D Visualization</h2>
          <p>See your designs come to life with realistic 3D rendering and visualization.</p>
        </div>
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Furniture Arrangement</h2>
          <p>Experiment with different furniture arrangements to find the perfect layout.</p>
        </div>
      </div>
    </main>
  )
}