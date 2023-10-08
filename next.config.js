/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 60,
  },
  redirects: async () => {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
