import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const MOCK_PRODUCTS = [
    // Outdoor Fountains
    {
        name: "Tuscan tiered Fountain",
        description: "Elegant three-tier fountain inspired by Italian gardens.",
        price: 1299,
        category: "Outdoor Fountains",
        image_url: "https://images.unsplash.com/photo-1598605272254-e6a730f3a290?q=80&w=2070&auto=format&fit=crop",
        active: true
    },
    {
        name: "Modern Zen Sphere",
        description: "Minimalist sphere fountain for contemporary landscapes.",
        price: 899,
        category: "Outdoor Fountains",
        image_url: "https://images.unsplash.com/photo-1533630654593-b222d5d44449?q=80&w=2070&auto=format&fit=crop",
        active: true
    },
    {
        name: "Classic Lion Head Fountain",
        description: "Wall-mounted lion head fountain with rustic finish.",
        price: 450,
        category: "Outdoor Fountains",
        image_url: "https://images.unsplash.com/photo-1544831201-9c66cc37604a?q=80&w=2070&auto=format&fit=crop",
        active: true
    },

    // Wall Fountains
    {
        name: "Slate Wall Cascade",
        description: "Natural slate wall fountain with gentle water flow.",
        price: 750,
        category: "Wall Fountains",
        image_url: "https://images.unsplash.com/photo-1517816428104-797678c7cf0c?q=80&w=2070&auto=format&fit=crop",
        active: true
    },
    {
        name: "Copper Panel Fountain",
        description: "Stunning copper sheet fountain that develops patina over time.",
        price: 1500,
        category: "Wall Fountains",
        image_url: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2080&auto=format&fit=crop",
        active: true
    },

    // Pool Features
    {
        name: "Sheer Descent Waterfall",
        description: "Creates a clear arc of water projecting away from the wall.",
        price: 3200,
        category: "Pool Features",
        image_url: "https://images.unsplash.com/photo-1576013551627-5cc20b368619?q=80&w=2070&auto=format&fit=crop",
        active: true
    },
    {
        name: "Deck Jet II",
        description: "Creates a beautiful arc of shimmering water from the deck to the pool.",
        price: 450,
        category: "Pool Features",
        image_url: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?q=80&w=2070&auto=format&fit=crop",
        active: true
    },

    // Fire & Water
    {
        name: "Prometheus Fire Bowl",
        description: "Concrete fire bowl with water spillway.",
        price: 2800,
        category: "Fire & Water Features", // Matched with constants.ts map
        image_url: "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2070&auto=format&fit=crop",
        active: true
    },

    // Indoor
    {
        name: "Tabletop Zen Garden",
        description: "Small indoor fountain for desk or table.",
        price: 120,
        category: "Indoor Fountains",
        image_url: "https://plus.unsplash.com/premium_photo-1661775756810-82dbd209fc95?q=80&w=2070&auto=format&fit=crop",
        active: true
    }
];

async function seed() {
    console.log('🌱 Starting mock seed...');

    // Optional: Clear existing products?
    // const { error: deleteError } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    // if (deleteError) console.error('Error clearing table:', deleteError);

    for (const product of MOCK_PRODUCTS) {
        const { data, error } = await supabase
            .from('products')
            .insert(product)
            .select();

        if (error) {
            console.error(`❌ Error inserting ${product.name}:`, error.message);
        } else {
            console.log(`✅ Inserted: ${product.name}`);
        }
    }

    console.log('✨ Seed completed!');
}

seed();
