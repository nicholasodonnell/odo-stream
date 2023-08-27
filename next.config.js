/* eslint-disable prettier/prettier */

const { v4: uuid } = require('uuid')

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
        source: '/live.stream-(\.\*).ts',
      },
    ]
  },
  swcMinify: false,
}

module.exports = nextConfig
