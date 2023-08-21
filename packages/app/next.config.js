/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
        ],
        // domains: [ 'nostr.build',
        // 'robohash.org', 
        // 'upload.wikimedia.org', 
        // 'nostamask.infura-ipfs.io']
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
