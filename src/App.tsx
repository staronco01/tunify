import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Library from './pages/Library'
import Downloads from './pages/Downloads'
import Player from './components/Player'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <aside className="hidden md:block w-64 p-4 border-r border-gray-800">
          <div className="text-2xl font-semibold mb-6">TUNIFY</div>
          <nav className="space-y-2">
            <Link to="/" className="block text-gray-200">Home</Link>
            <Link to="/search" className="block text-gray-200">Search</Link>
            <Link to="/library" className="block text-gray-200">Your Library</Link>
            <Link to="/downloads" className="block text-gray-200">Downloads</Link>
            <Link to="/playlists" className="block text-gray-200">Playlists</Link>
          </nav>
        </aside>

        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>

      <Player />
    </div>
  )
}
