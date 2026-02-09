export interface Product {
    id: string;
    woocommerce_id?: number;
    name: string;
    slug?: string;
    sku?: string;
    description?: string;
    short_description?: string;
    category: string;
    subcategory?: string;
    brand?: string;
    price?: number;
    image_url?: string;
    image_transparent_url?: string;
    product_page_url?: string;
    ai_prompt_description?: string;
    active: boolean;
    created_at?: string;
}

export interface DesignRequest {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone?: string;
    product_id?: string;
    product_name?: string;
    product_category?: string;
    original_image_url?: string;
    generated_image_url?: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    email_sent: boolean;
    commercial_notified: boolean;
    error_message?: string;
    metadata?: any;
}

export interface DesignFormData {
    name: string;
    email: string;
    phone?: string;
    image: File | null;
    category: string;
    productId: string;
}
