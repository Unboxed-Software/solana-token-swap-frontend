/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        config.resolve.fallback = {
            "@solana/spl-token-swap": require.resolve("@solana/spl-token-swap"),
            crypto: false,
            stream: false,
        }

        return config
    },
}

module.exports = nextConfig
