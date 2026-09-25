import type { LucideIcon } from 'lucide-react';
import {
  Laptop, Monitor, Tablet, Smartphone, Keyboard, Headphones,
  Speaker, Plug, Split, Wifi, BatteryCharging, Camera,
} from 'lucide-react';

export type CategoryGroupDef = {
  name: string;
  icon: LucideIcon;
  items: string[];
  itemIcons: Record<string, LucideIcon>;
};

export const CATEGORY_GROUPS: CategoryGroupDef[] = [
  {
    name: 'Computers',
    icon: Laptop,
    items: ['Laptops', 'Desktop Computers'],
    itemIcons: { Laptops: Laptop, 'Desktop Computers': Monitor },
  },
  {
    name: 'Phones & Tablets',
    icon: Smartphone,
    items: ['Tablets', 'Phones'],
    itemIcons: { Tablets: Tablet, Phones: Smartphone },
  },
  {
    name: 'Computer Accessories',
    icon: Keyboard,
    items: [
      'Keyboards & Mice', 'Headphones & Audio', 'Speakers',
      'Adapters & Converters', 'Splitters', 'Networking',
    ],
    itemIcons: {
      'Keyboards & Mice': Keyboard,
      'Headphones & Audio': Headphones,
      Speakers: Speaker,
      'Adapters & Converters': Plug,
      Splitters: Split,
      Networking: Wifi,
    },
  },
  {
    name: 'Electronics',
    icon: BatteryCharging,
    items: ['Power & Electronic Accessories'],
    itemIcons: { 'Power & Electronic Accessories': BatteryCharging },
  },
  {
    name: 'Security',
    icon: Camera,
    items: ['CCTV Cameras'],
    itemIcons: { 'CCTV Cameras': Camera },
  },
];

export const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap((g) => g.items);

export const groupOf = (cat: string) =>
  CATEGORY_GROUPS.find((g) => g.items.includes(cat))?.name;

export const groupDef = (name: string) =>
  CATEGORY_GROUPS.find((g) => g.name === name);

export const iconForCategory = (cat: string): LucideIcon => {
  for (const g of CATEGORY_GROUPS) if (g.itemIcons[cat]) return g.itemIcons[cat];
  return Keyboard;
};

export const iconForGroup = (name: string): LucideIcon =>
  groupDef(name)?.icon ?? Keyboard;

export function matchesCategory(productCat: string, selected: string) {
  if (!selected) return true;
  if (productCat === selected) return true;
  return !!CATEGORY_GROUPS.find((g) => g.name === selected)?.items.includes(productCat);
}