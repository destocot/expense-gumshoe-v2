import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/expenses',
        destination: '/',
      },
    ]
  },
}

export default nextConfig
