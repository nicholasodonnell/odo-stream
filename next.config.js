/* eslint-disable prettier/prettier */

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const { RS_URL } = process.env

    if (!RS_URL) {
      return []
    }

    return [
      {
        destination: `${RS_URL}/hls/live.stream.m3u8`,
        source: '/live.m3u8',
      },
      {
        destination: `${RS_URL}/hls/:segment`,
        source: '/:segment(\.\+\.ts)',
      },
    ]
  },
  swcMinify: false,
}

module.exports = nextConfig
