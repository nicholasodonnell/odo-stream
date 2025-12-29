import { v4 as uuid } from 'uuid'

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SIGNING_SECRET: process.env.SIGNING_SECRET ?? uuid(),
  },
  async rewrites() {
    return [
      {
        destination: `/api/live`,
        source: `/live.m3u8`,
      },
      {
        destination: `/api/segment`,
        source: '/live.stream-(.*).ts',
      },
    ]
  },
}

export default nextConfig
