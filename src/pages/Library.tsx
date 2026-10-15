import React from 'react'

export default function Library() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Your Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-900 rounded">Liked Songs (demo)</div>
        <div className="p-4 bg-gray-900 rounded">Playlists (demo)</div>
        <div className="p-4 bg-gray-900 rounded">Artists (demo)</div>
      </div>
    </div>
  )
}
