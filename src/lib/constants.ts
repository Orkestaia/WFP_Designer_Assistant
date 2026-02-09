export const CATEGORIES = [
    { id: 'outdoor', name: 'Outdoor Fountains', icon: 'TreeDeciduous' },
    { id: 'wall', name: 'Wall Fountains', icon: 'BrickWall' },
    { id: 'pool', name: 'Pool Features', icon: 'Waves' },
    { id: 'fire', name: 'Fire & Water', icon: 'Flame' },
    { id: 'indoor', name: 'Indoor Fountains', icon: 'Home' },
] as const;

export const DB_CATEGORIES_MAP: Record<string, string[]> = {
    'outdoor': ['Outdoor Fountains', 'Garden Fountains', 'Estate Fountains'],
    'wall': ['Wall Fountains'],
    'pool': ['Pool Features', 'Waterfalls', 'Spillways'],
    'fire': ['Fire & Water Features', 'Fire Fountains'],
    'indoor': ['Indoor Fountains'],
};

export const CDN_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`
    : '';
