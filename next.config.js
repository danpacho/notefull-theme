//@ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["md", "mdx", "tsx", "ts"],
    compiler:
        process.env.NODE_ENV === "production"
            ? {
                  removeConsole: {
                      exclude: ["error"],
                  },
              }
            : {},
    experimental: {
        nextScriptWorkers: true,
    },
}

module.exports = nextConfig
