/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // no metered Vercel image transformations
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'pkavfoldfwsxerlvjirb.supabase.co'
    ],
  },
};

export default nextConfig;
