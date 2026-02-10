import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Products using REAL WFP image URLs from CSV + local files
const WFP_PRODUCTS = [
    // FROM LOCAL WFP IMAGES
    {
        name: "Cavern Falls Water Feature",
        description: "Dramatic cascading waterfall feature. Creates stunning visual and natural sound effects in any outdoor space.",
        price: 8900,
        category: "Outdoor Fountains",
        image_url: "/wfp-cavern-falls.jpg",
        active: true
    },
    {
        name: "Classic Stone Garden Fountain",
        description: "Beautifully crafted stone fountain, perfect for traditional and modern garden settings alike.",
        price: 4500,
        category: "Outdoor Fountains",
        image_url: "/wfp-fountain-1.jpg",
        active: true
    },
    {
        name: "Kasco VFX Series with RGB LED",
        description: "Professional aerating fountain with color-changing RGB LED lighting. Perfect for ponds and lakes.",
        price: 6200,
        category: "Pool Features",
        image_url: "/wfp-kasco-vfx.png",
        active: true
    },
    {
        name: "Sunset Corner Fountain",
        description: "Elegant corner water feature that captures the beauty of golden hour. Perfect for patios and courtyards.",
        price: 3800,
        category: "Outdoor Fountains",
        image_url: "/wfp-sunset-fountain.jpeg",
        active: true
    },
    // FROM CSV - REAL WFP CDN URLS
    {
        name: "Fiore Pond Spray Ring 74\"",
        description: "Premium pond spray ring with 1/8\" nozzles and 7 inch spacing. Creates beautiful water displays.",
        price: 2799,
        category: "Pool Features",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2025/10/Teddys-landscape-3-2019.jpg",
        active: true
    },
    {
        name: "Indoor Hood Cover",
        description: "Protective indoor hood cover for serene water features. Keeps your fountain clean and protected.",
        price: 320,
        category: "Indoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2025/02/serenewatersindoorhoodcover3.png",
        active: true
    },
    {
        name: "Outdoor Hood Cover",
        description: "Durable outdoor hood cover designed to protect your water feature from the elements.",
        price: 481,
        category: "Outdoor Fountains",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2025/02/Outdoor.jpg",
        active: true
    },
    {
        name: "LED Color Programmable Lights",
        description: "Add stunning color-changing LED lights to any water feature. Multiple color modes and effects.",
        price: 80,
        category: "Pool Features",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2025/02/ledbulbscontroller.jpg",
        active: true
    },
    {
        name: "Frothy Fountain Nozzle Bronze 2\"",
        description: "Premium bronze frothy fountain nozzle by EasyPro. Creates beautiful foamy water effects.",
        price: 199,
        category: "Pool Features",
        image_url: "https://waterfeaturepros.com/wp-content/uploads/2025/02/EP-Frothy-Nozzle.png",
        active: true
    },
];

async function run() {
    console.log('🚀 Importing WFP products with REAL images...\n');

    // Clear old products
    const { error: delErr } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

    if (delErr) console.warn('⚠️', delErr.message);
    else console.log('✅ Cleared old products\n');

    let success = 0;
    for (const p of WFP_PRODUCTS) {
        const { error } = await supabase.from('products').insert(p);
        if (error) {
            console.error(`❌ ${p.name}: ${error.message}`);
        } else {
            console.log(`✅ ${p.name} - ${p.category}`);
            success++;
        }
    }

    console.log(`\n🎉 Imported ${success}/${WFP_PRODUCTS.length} products`);
}

run();
