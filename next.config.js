/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: { esmExternals: "loose" }, // 将ES模块（ESM）的外部依赖项设置为 "loose" 模式
    async redirects() {
        return [
            // {
            //     source: "/",
            //     destination: "/user",
            //     permanent: true,

            // },
            {
                source: "/type-400",
                destination: "/type-400/graph",
                permanent: true,
            },
            // {
            //     source: "/dashboard",
            //     destination: "/dashboard/farm-list",
            //     permanent: true,
            // },
        ]
    },
}

module.exports = nextConfig
