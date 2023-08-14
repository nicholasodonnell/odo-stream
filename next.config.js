/* eslint-disable prettier/prettier */

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        destination: `/api/live`,
        source: `/live.m3u8`,
      },
      {
        destination: `/api/segment`,
        source: '/live.stream-(\.\*).ts',
      },
    ]
  },

  swcMinify: false,
}

module.exports = nextConfig
