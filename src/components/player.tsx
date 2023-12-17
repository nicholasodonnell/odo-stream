'use client'

import ReactHlsPlayer from '@gumlet/react-hls-player'
import type { HlsPlayerProps } from '@gumlet/react-hls-player'
import cx from 'classnames'
import Hls, { ErrorData } from 'hls.js'
import { useEffect, useRef, useState } from 'react'

export type PlayerProps = {
  className?: string
  src: string
}

const hlsConfig = {
  autoStartLoad: true, // auto play on load
  backBufferLength: 0, // eliminate back buffer
  enableWorker: true, // use workers
  initialLiveManifestSize: 2, // preload 2 chunks before autostart
  liveDurationInfinity: true, // instructs browser that video is live
  liveMaxLatencyDuration: 40, // maximum latency allowed before HLS.js seeks forward to reduce the latency (A lower value here helps in keeping the stream closer to real-time)
  liveSyncDuration: 30, // how close to live to target? shorter than 3sec causes frequent buffering issues
  lowLatencyMode: true, // enable low latency mode
  maxBufferLength: 30, // maximum length, in seconds, of the buffer
  maxBufferSize: 60 * 1000 * 1000, // 60 MB maximum buffer size in bytes
  maxMaxBufferLength: 60, // safeguard to ensure buffering doesn't exceed this value
  nudgeMaxRetry: 5, // increase retries before buffer stalled
  progressive: true, // use fetch instead of xhr
  testBandwidth: false, // disable auto bandwidth estimation
}

export function Player({ className, src }: PlayerProps): React.ReactNode {
  const playerRef = useRef<HTMLVideoElement>(null)
  const [error, setError] = useState<Error | null>(null)
  const [hlsRef, setHlsRef] = useState<Hls | null>(null)

  useEffect(() => {
    const current = playerRef.current

    function handleError(e: ErrorEvent) {
      setError(new Error(`Error playing video: ${e.message}`, { cause: e }))
    }

    current?.addEventListener('error', handleError, true)

    return () => {
      current?.removeEventListener('error', handleError)
    }
  }, [playerRef])

  useEffect(() => {
    function handleHlsError(event: string, data: ErrorData) {
      if (data.fatal) {
        setError(
          new Error(
            `Error playing video: ${data.response?.data ?? data.details}`,
          ),
        )
      }
    }

    hlsRef?.on(Hls.Events.ERROR, handleHlsError)
  }, [hlsRef])

  if (error) {
    throw error
  }

  return (
    <ReactHlsPlayer
      autoPlay
      className={cx(className)}
      controls
      getHLSRef={setHlsRef}
      hlsConfig={hlsConfig as unknown as HlsPlayerProps['hlsConfig']}
      muted
      playerRef={playerRef}
      playsInline
      src={src}
    />
  )
}
