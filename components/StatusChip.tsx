import type { Availability } from '@/lib/types';

const cls: Record<Availability, string> = {
  'In Stock': 's-in',
  'Available on Order': 's-order',
  'Out of Stock': 's-out',
};

export default function StatusChip({ value }: { value: Availability }) {
  return <span className={`status ${cls[value] ?? 's-order'}`}>{value}</span>;
}