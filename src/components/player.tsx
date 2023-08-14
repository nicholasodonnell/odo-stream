'use client'

import ReactHlsPlayer from '@gumlet/react-hls-player'
import type { HlsPlayerProps } from '@gumlet/react-hls-player'
import cx from 'classnames'
import { useEffect, useRef } from 'react'

export type PlayerProps = {
  className?: string
  src: string
}

const hlsConfig = {
  liveDurationInfinity: true,
  lowLatencyMode: true,
}

export function Player({ className, src }: PlayerProps): React.ReactNode {
  const playerRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    function handleError(e: ErrorEvent) {
      throw new Error(`Error playing video: ${e.message}`, { cause: e })
    }

    playerRef.current?.addEventListener('error', handleError)

    return playerRef.current?.removeEventListener('error', handleError)
  }, [playerRef])

  return (
    <ReactHlsPlayer
      autoPlay
      className={cx(className)}
      controls
      hlsConfig={hlsConfig as unknown as HlsPlayerProps['hlsConfig']}
      muted
      playerRef={playerRef}
      playsInline
      src={src}
    />
  )
}
