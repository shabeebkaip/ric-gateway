import { connectDB } from '@/lib/db/connection';
import Content from '@/lib/db/models/Content';

export interface ContactCard {
  id: string;
  icon: string;
  title: string;
  details: string[];
  link: string | null;
  color: string;
}

const DEFAULT_CARDS: ContactCard[] = [
  {
    id: '1',
    icon: 'MapPin',
    title: 'Visit Us',
    details: ['PM8M+J6X, Oruba Road, As Sulimaniyah, Riyadh 11411, Saudi Arabia'],
    link: 'https://www.google.com/maps/place/RIYADH+INTERNATIONAL+CORPORATION/@24.7166169,46.680542,17z/data=!3m1!4b1!4m6!3m5!1s0x3e2f03048c8ab6cd:0x37200af5e3ccaffc!8m2!3d24.7166169!4d46.6831169!16s%2Fg%2F1tj6fgpd?entry=ttu',
    color: 'text-primary',
  },
  {
    id: '2',
    icon: 'Phone',
    title: 'Call Us',
    details: ['+966 50 969 8043', '+966 11 465 4113 (Ext. 106)'],
    link: 'tel:+966509698043',
    color: 'text-gold',
  },
  {
    id: '3',
    icon: 'Printer',
    title: 'Fax',
    details: ['+966 11 463 0135'],
    link: null,
    color: 'text-accent',
  },
  {
    id: '4',
    icon: 'Mail',
    title: 'Email Us',
    details: ['ricmede@ricmedical.com.sa'],
    link: 'mailto:ricmede@ricmedical.com.sa',
    color: 'text-primary',
  },
  {
    id: '5',
    icon: 'Clock',
    title: 'Working Hours',
    details: ['Sunday - Thursday', '8:00 AM - 5:00 PM'],
    link: null,
    color: 'text-gold',
  },
];

export async function getContactInfo(): Promise<ContactCard[]> {
  try {
    await connectDB();
    const content = await Content.findOne({ page: 'contact', section: 'info', isActive: true });
    if (content?.content?.cards && Array.isArray(content.content.cards)) {
      return content.content.cards as ContactCard[];
    }
  } catch {
    // fall through to defaults
  }
  return DEFAULT_CARDS;
}
