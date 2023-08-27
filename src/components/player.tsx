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
  liveMaxLatencyDuration: 10, // if higher than this, adujst to liveSyncDuration
  liveSyncDuration: 3, // how close to live to target? shorter than 3sec causes frequent buffering issues
  lowLatencyMode: true, // enable low latency mode
  maxBufferLength: 10, // limit forward buffer
  maxLiveSyncPlaybackRate: 2, // if running behind, speed up video
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
