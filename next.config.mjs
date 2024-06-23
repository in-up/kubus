/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
  compiler: {
    swcMinify: true,
    styledComponents: true,
  },
  experimental: {
    urlImports: ['https://esm.sh']
  }
};

export default nextConfig;
