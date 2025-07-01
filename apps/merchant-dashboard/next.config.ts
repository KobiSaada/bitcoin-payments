/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['http://1.1.1.16:3000', 'http://localhost:3000'], // הוסף פה את הכתובות שממנה ניגשים
  },
};

module.exports = nextConfig;
