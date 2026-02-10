import fs from 'fs';
import path from 'path';

const csvPath = path.resolve(__dirname, '../../Productos Woocommerce WFP/product_export_2026-01-27-09-11-22.csv');
const content = fs.readFileSync(csvPath, 'utf-8');

function parseCSVLine(line: string): string[] {
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
            if (inQuotes && i + 1 < line.length && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (ch === ',' && !inQuotes) {
            fields.push(current);
            current = '';
        } else {
            current += ch;
        }
    }
    fields.push(current);
    return fields;
}

const lines = content.split('\n');

// Check product_page_url column (43) and look for image URLs in post_content (4)
console.log('=== CHECKING FIRST 20 FOUNTAIN-LIKE PRODUCTS ===\n');

let count = 0;
for (let i = 1; i < lines.length && count < 20; i++) {
    const line = lines[i];
    if (!line || line.trim().length < 20) continue;

    const fields = parseCSVLine(line);
    if (fields.length < 44) continue;

    const name = fields[0]?.trim();
    const status = fields[6]?.trim();
    const productUrl = fields[43]?.trim();
    const postContent = fields[4] || '';

    if (!name || name.length < 5) continue;
    if (status && status !== 'publish') continue;

    const nameLower = name.toLowerCase();
    if (nameLower.includes('fountain') || nameLower.includes('cascade') || nameLower.includes('basin')) {
        count++;
        console.log(`[${count}] ${name}`);
        console.log(`    Page: ${productUrl?.substring(0, 100) || 'N/A'}`);

        // Search for ANY URL in post_content
        const urlMatches = postContent.match(/https?:\/\/waterfeaturepros\.com\/wp-content\/uploads\/[^\s"'<>]+/g);
        if (urlMatches) {
            console.log(`    Content images: ${urlMatches.length} found`);
            console.log(`    First: ${urlMatches[0].substring(0, 120)}`);
        } else {
            console.log(`    Content images: NONE`);
        }
        console.log('');
    }
}
