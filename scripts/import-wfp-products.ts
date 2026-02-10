import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Curated WFP products from the export CSV
const WFP_PRODUCTS = [
    // OUTDOOR FOUNTAINS
    {
        name: "Cast Iron Langdon Fountain",
        description: "Cast Iron Langdon Fountain is a classy, elegant centerpiece crafted from solid cast iron. Brings tranquil water movement to courtyards and estates.",
        price: 12500,
        category: "Outdoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2024/05/langdon-iron-pros.jpg",
        active: true
    },
    {
        name: "Henri Studio Three Tier Fleur De Lis",
        description: "Classic three-tier fountain with ornate Fleur De Lis details, perfect for elegant gardens.",
        price: 4200,
        category: "Outdoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2021/01/Henri_Studio_HS10055f1_Garden_Fountains_03_TBP.jpg",
        active: true
    },
    {
        name: "Grand Estate Lion Fountain",
        description: "Majestic lion head fountain bringing European elegance to your outdoor space.",
        price: 5800,
        category: "Outdoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/grande-leones.jpg",
        active: true
    },
    {
        name: "Massarelli Classical Tiered Fountain",
        description: "Traditional tiered design with classical sculptural elements.",
        price: 3500,
        category: "Outdoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/massarelli-classical.jpg",
        active: true
    },
    {
        name: "Cavern Falls XL Cascade",
        description: "Dramatic large-scale waterfall feature creating stunning visual and audio impact.",
        price: 8900,
        category: "Outdoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/06/Cavern-Falls-Kids-Jumping-21.jpg",
        active: true
    },

    // POOL FEATURES
    {
        name: "Sheer Descent Waterfall 24 inch",
        description: "Creates a clear arc of water projecting away from pool wall. Modern and elegant.",
        price: 3200,
        category: "Pool Features",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/sheer-descent-pool.jpg",
        active: true
    },
    {
        name: "Pool Deck Jets Set of 4",
        description: "Creates beautiful arcs of shimmering water from deck to pool.",
        price: 1800,
        category: "Pool Features",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/deck-jets-pool.jpg",
        active: true
    },
    {
        name: "Pool Scupper Spillway 18 inch",
        description: "Sleek stainless steel scupper creating smooth water sheet into pool.",
        price: 950,
        category: "Pool Features",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/scupper-spillway.jpg",
        active: true
    },

    // WALL FOUNTAINS
    {
        name: "Modern Copper Wall Cascade",
        description: "Stunning copper sheet fountain that develops beautiful patina over time.",
        price: 2400,
        category: "Wall Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/copper-wall-fountain.jpg",
        active: true
    },
    {
        name: "Slate Wall Waterfall Panel",
        description: "Natural slate wall fountain with gentle, soothing water flow.",
        price: 1850,
        category: "Wall Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/slate-wall-panel.jpg",
        active: true
    },
    {
        name: "Lion Head Wall Spout",
        description: "Classic wall-mounted lion head fountain with rustic bronze finish.",
        price: 650,
        category: "Wall Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/lion-head-spout.jpg",
        active: true
    },

    // FIRE & WATER
    {
        name: "Prometheus Fire Bowl with Water",
        description: "Stunning combination of fire and water in elegant concrete bowl.",
        price: 4200,
        category: "Fire & Water Features",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/fire-water-bowl.jpg",
        active: true
    },
    {
        name: "Grand Effects Fire Fountain System",
        description: "Integrated fire and water feature creating dramatic nighttime display.",
        price: 6500,
        category: "Fire & Water Features",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/fire-fountain-system.jpg",
        active: true
    },

    // INDOOR FOUNTAINS
    {
        name: "Tabletop Zen Garden Fountain",
        description: "Small indoor fountain perfect for desk or meditation space.",
        price: 180,
        category: "Indoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/zen-tabletop.jpg",
        active: true
    },
    {
        name: "Floor Standing Slate Tower",
        description: "Contemporary indoor fountain with stacked slate design.",
        price: 850,
        category: "Indoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/slate-tower-indoor.jpg",
        active: true
    },

    // MORE OUTDOOR FOUNTAINS
    {
        name: "Tuscan Villa Garden Fountain",
        description: "Elegant three-tier fountain inspired by Italian Renaissance gardens.",
        price: 3800,
        category: "Outdoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/tuscan-villa.jpg",
        active: true
    },
    {
        name: "Modern Sphere Water Feature",
        description: "Minimalist sphere fountain for contemporary landscapes.",
        price: 1200,
        category: "Outdoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/modern-sphere.jpg",
        active: true
    },
    {
        name: "Urn Garden Fountain Classic",
        description: "Traditional urn-style fountain with timeless appeal.",
        price: 980,
        category: "Outdoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2020/07/urn-fountain.jpg",
        active: true
    }
];

async function importProducts() {
    console.log('🚀 Starting WFP product import...\n');

    // Clear existing products
    console.log('🗑️  Clearing old products...');
    const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
        console.warn('⚠️  Error clearing:', deleteError.message);
    } else {
        console.log('✅ Cleared old products\n');
    }

    // Insert WFP products
    let successCount = 0;
    let errorCount = 0;

    console.log('📦 Inserting real WFP products...\n');

    for (const product of WFP_PRODUCTS) {
        const { error } = await supabase
            .from('products')
            .insert(product);

        if (error) {
            console.error(`❌ ${product.name}: ${error.message}`);
            errorCount++;
        } else {
            console.log(`✅ ${product.name} - ${product.category}`);
            successCount++;
        }
    }

    console.log(`\n🎉 Import complete!`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📊 Total: ${WFP_PRODUCTS.length}`);
}

importProducts();
