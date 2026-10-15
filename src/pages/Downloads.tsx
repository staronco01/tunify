import React, { useEffect, useState } from 'react'
import localforage from 'localforage'

export default function Downloads() {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    async function load() {
      const keys = await localforage.keys()
      setItems(keys)
    }
    load()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Downloads</h1>
      <div className="space-y-3">
        {items.length === 0 && <div className="text-gray-400">No downloads yet.</div>}
        {items.map((k) => (
          <div key={k} className="p-3 bg-gray-900 rounded flex items-center justify-between">
            <div>
              <div className="font-medium">{k}</div>
              <div className="text-xs text-gray-400">Demo artist</div>
            </div>
            <div>
              <button className="px-3 py-1 bg-gray-800 rounded">Play</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
