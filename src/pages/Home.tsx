import React from 'react'

export default function Home() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Good evening — Star</h1>
        <p className="text-sm text-gray-400">Recommended for you</p>
      </header>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-medium mb-2">Recently played</h2>
          <div className="flex gap-4 overflow-x-auto py-2">
            {/* Demo cards */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-40 bg-gradient-to-b from-gray-900 to-gray-800 p-3 rounded-lg flex-shrink-0">
                <div className="h-40 bg-gray-700 rounded-md mb-3"/>
                <div className="text-sm font-semibold">Demo Track {i + 1}</div>
                <div className="text-xs text-gray-400">Demo Artist</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-2">Trending</h2>
          <div className="flex gap-4 overflow-x-auto py-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-56 bg-gradient-to-b from-gray-900 to-gray-800 p-3 rounded-lg flex-shrink-0">
                <div className="h-32 bg-gray-700 rounded-md mb-3"/>
                <div className="text-sm font-semibold">Trending Playlist {i + 1}</div>
                <div className="text-xs text-gray-400">Playlist • {10 + i} tracks</div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  )
}
