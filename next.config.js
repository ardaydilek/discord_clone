/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });

    return config;
  },
  images: {
    remotePatterns: [
      { hostname: "uploadthing.com" },
      { hostname: "utfs.io" },
      { hostname: "img.clerk.com" },
    ],
  },
};

module.exports = nextConfig;
