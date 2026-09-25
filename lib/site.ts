export const SITE = {
  name: 'Skyline Computer World',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, ''),
  whatsapp: '254798321910',
  whatsappDisplay: '+254 798 321 910',
  address: 'Terry House, Mfangano Street, Shop G15, Nairobi CBD',
  maps: 'https://maps.app.goo.gl/9YKbF3SwdGFrBY8S6?g_st=aw',
  courier: 'SpeedAF',
};
export const ksh = (n: number) => `KSh ${Math.round(n).toLocaleString('en-KE')}`;
export const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');