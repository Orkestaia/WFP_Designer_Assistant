import { useState } from 'react';
import { Product, DesignFormData } from '@/types';

export const useDesignTool = () => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<DesignFormData>({
        name: '',
        email: '',
        phone: '',
        image: null,
        category: '',
        productId: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        // Move to next step or scroll to products? 
        // Usually keep user on same view but filter grid
    };

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
    };

    return {
        step,
        setStep,
        nextStep,
        prevStep,
        selectedCategory,
        handleCategorySelect,
        selectedProduct,
        handleProductSelect,
        uploadedImage,
        setUploadedImage,
        formData,
        setFormData,
        isSubmitting,
        setIsSubmitting,
        isCompleted,
        setIsCompleted
    };
};
