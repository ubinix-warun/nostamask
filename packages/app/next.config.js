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
    }
}

module.exports = nextConfig
