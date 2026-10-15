import React, { useEffect, useRef, useState } from 'react'
import localforage from 'localforage'

const DEMO_URL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null)

  useEffect(() => {
    const a = new Audio(DEMO_URL)
    a.crossOrigin = 'anonymous'
    audioRef.current = a

    const onTime = () => setTime(a.currentTime)
    const onDuration = () => setDuration(a.duration || 0)
    const onEnded = () => setPlaying(false)
    const onError = () => {
      console.error('Playback error', a.error)
      setPlaying(false)
    }

    a.addEventListener('timeupdate', onTime)
    a.addEventListener('durationchange', onDuration)
    a.addEventListener('ended', onEnded)
    a.addEventListener('error', onError)

    return () => {
      a.pause()
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('durationchange', onDuration)
      a.removeEventListener('ended', onEnded)
      a.removeEventListener('error', onError)
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const toggle = async () => {
    const a = audioRef.current
    if (!a) return
    if (playing) {
      a.pause()
      setPlaying(false)
    } else {
      try {
        await a.play()
        setPlaying(true)
      } catch (err) {
        console.error('Play failed', err)
      }
    }
  }

  const seek = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current
    if (!a) return
    a.currentTime = Number(ev.target.value)
    setTime(a.currentTime)
  }

  const downloadDemo = async () => {
    setDownloadStatus('starting')
    try {
      const res = await fetch(DEMO_URL)
      if (!res.ok) throw new Error('Network error')
      const reader = res.body?.getReader()
      const contentLength = Number(res.headers.get('content-length')) || undefined
      let received = 0
      const chunks: Uint8Array[] = []
      if (!reader) {
        const blob = await res.blob()
        await localforage.setItem('demo-song', blob)
        setDownloadStatus('completed')
        return
      }
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        if (value) {
          chunks.push(value)
          received += value.length
          if (contentLength) {
            const pct = Math.round((received / contentLength) * 100)
            setDownloadStatus(`${pct}%`)
          } else {
            setDownloadStatus(`${(received / 1024).toFixed(1)} KB`)
          }
        }
      }
      const blob = new Blob(chunks, { type: res.headers.get('content-type') || 'audio/mpeg' })
      await localforage.setItem('demo-song', blob)
      setDownloadStatus('completed')
    } catch (err) {
      console.error(err)
      setDownloadStatus('failed')
    }
  }

  return (
    <div className="player-bottom w-full border-t border-gray-800 p-3 flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-gray-800 rounded" />
        <div>
          <div className="font-medium">Demo Track</div>
          <div className="text-xs text-gray-400">Demo Artist</div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3">
          <button onClick={() => { /* prev */ }} className="px-3">⏮</button>
          <button onClick={toggle} className="px-4 py-2 bg-tunify-mint text-black rounded">{playing ? 'Pause' : 'Play'}</button>
          <button onClick={() => { /* next */ }} className="px-3">⏭</button>

          <div className="flex-1 mx-4">
            <input type="range" min={0} max={duration || 0} value={time} onChange={seek} className="w-full" />
            <div className="flex justify-between text-xs text-gray-400">
              <div>{new Date(time * 1000).toISOString().substring(14, 19)}</div>
              <div>{new Date((duration || 0) * 1000).toISOString().substring(14, 19)}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
          </div>

          <div className="ml-4">
            <button onClick={downloadDemo} className="px-3 py-1 bg-gray-800 rounded">{downloadStatus === 'completed' ? 'Downloaded' : 'Download'}</button>
            {downloadStatus && <div className="text-xs text-gray-400 mt-1">{downloadStatus}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
