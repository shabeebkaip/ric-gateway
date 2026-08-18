import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'adtechealthcare.com' },
      { protocol: 'http', hostname: 'combatcancer.com' },
      { protocol: 'https', hostname: 'allwinmedical.com' },
      {
        protocol: 'https',
        hostname: 'concemed-02.obs.cn-north-4.myhuaweicloud.com',
      },
      { protocol: 'https', hostname: 'en.redpinemed.com' },
      { protocol: 'https', hostname: 'enovis.widen.net' },
      { protocol: 'https', hostname: 'static2.xunxiang.site' },
      { protocol: 'https', hostname: 'www.basdamri.com' },
      { protocol: 'https', hostname: 'www.excitemedical.com' },
      { protocol: 'https', hostname: 'www.jingyimed.com' },
      { protocol: 'https', hostname: 'www.medispec.com' },
      { protocol: 'https', hostname: 'www.potent-medical.com' },
    ],
  },
};

export default nextConfig;
