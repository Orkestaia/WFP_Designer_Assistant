import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Create a Supabase client with the SERVICE ROLE key for server-side operations
// This is required to bypass RLS if needed, or just to have full access
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const file = formData.get('file') as File;
        const productId = formData.get('productId') as string;
        const productName = formData.get('productName') as string;
        const productCategory = formData.get('productCategory') as string;
        const productImage = formData.get('productImage') as string;

        if (!file || !email || !name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Upload Image to Supabase Storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('user-uploads')
            .upload(filePath, file);

        if (uploadError) {
            console.error('Upload Error:', uploadError);
            return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('user-uploads')
            .getPublicUrl(filePath);

        // 2. Insert into DB
        const { data: requestRecord, error: dbError } = await supabase
            .from('design_requests')
            .insert({
                name,
                email,
                phone,
                product_id: productId,
                product_name: productName,
                product_category: productCategory,
                original_image_url: publicUrl,
                status: 'pending'
            })
            .select()
            .single();

        if (dbError) {
            console.error('DB Error:', dbError);
            // Note: Image was uploaded but DB failed. 
            // In a production app, we might want to cleanup the image here.
            return NextResponse.json({ error: 'Failed to save request' }, { status: 500 });
        }

        // 3. Trigger n8n Webhook
        if (process.env.N8N_WEBHOOK_URL) {
            try {
                await fetch(process.env.N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        request_id: requestRecord.id,
                        lead: { name, email, phone },
                        product: {
                            id: productId,
                            name: productName,
                            category: productCategory,
                            image_url: productImage,
                        },
                        user_image_url: publicUrl
                    })
                });
            } catch (webhookError) {
                // Log but don't fail the request to the user
                console.error('Webhook Error:', webhookError);
            }
        } else {
            console.warn('N8N_WEBHOOK_URL is not defined');
        }

        return NextResponse.json({ success: true, requestId: requestRecord.id });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
