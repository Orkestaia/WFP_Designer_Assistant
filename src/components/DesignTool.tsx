"use client";

import { useDesignTool } from "@/hooks/useDesignTool";
import CategorySelector from "./CategorySelector";
import ProductGrid from "./ProductGrid";
import PreviewArea from "./PreviewArea";
import ImageUpload from "./ImageUpload";
import ContactForm from "./ContactForm";
import ConfirmationScreen from "./ConfirmationScreen"; // Will create this next
import { AnimatePresence, motion } from "framer-motion";
import { DesignFormData } from "@/types";

export default function DesignTool() {
    const {
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
    } = useDesignTool();

    const handleImageUpload = (file: File) => {
        setFormData(prev => ({ ...prev, image: file }));
        setUploadedImage(URL.createObjectURL(file));
    };

    const handleFormSubmit = async (data: Partial<DesignFormData>) => {
        if (!formData.image || !selectedProduct) return;

        setIsSubmitting(true);

        try {
            // 1. Prepare FormData for API
            const apiFormData = new FormData();
            apiFormData.append('name', data.name!);
            apiFormData.append('email', data.email!);
            if (data.phone) apiFormData.append('phone', data.phone);
            apiFormData.append('file', formData.image);
            apiFormData.append('productId', selectedProduct.id);
            apiFormData.append('productName', selectedProduct.name);
            apiFormData.append('productCategory', selectedProduct.category);
            if (selectedProduct.image_url) apiFormData.append('productImage', selectedProduct.image_url);

            // 2. Call API
            const response = await fetch('/api/design-request', {
                method: 'POST',
                body: apiFormData,
            });

            if (!response.ok) throw new Error('Failed to submit request');

            setIsCompleted(true);
        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isCompleted) {
        return <ConfirmationScreen />; // Placeholder for now
    }

    return (
        <section id="design-tool" className="py-20 min-h-screen bg-background relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Design Your Space</h2>
                    <p className="text-muted text-lg">Select a product and upload your photo</p>
                </div>

                {/* Layout: Left Panel (Controls) / Right Panel (Preview) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

                    {/* Left Panel: Selection & Input */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className={`bg-surface/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-opacity ${selectedProduct ? 'opacity-50 hover:opacity-100' : 'opacity-100'}`}>
                            <h3 className="text-lg font-semibold mb-4 text-white">1. Select a Water Feature</h3>
                            <CategorySelector
                                selectedCategory={selectedCategory}
                                onSelect={handleCategorySelect}
                            />

                            <AnimatePresence mode="wait">
                                {selectedCategory && (
                                    <motion.div
                                        key="grid"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-6"
                                    >
                                        <ProductGrid
                                            categoryId={selectedCategory}
                                            selectedProduct={selectedProduct}
                                            onSelectProduct={handleProductSelect}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence>
                            {selectedProduct && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-surface/50 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
                                >
                                    <h3 className="text-lg font-semibold mb-4 text-white">2. Upload Your Space</h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <ImageUpload
                                                onImageUpload={handleImageUpload}
                                                currentImage={formData.image}
                                                onClear={() => {
                                                    setFormData(prev => ({ ...prev, image: null }));
                                                    setUploadedImage(null);
                                                }}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className={!uploadedImage ? 'opacity-50 pointer-events-none grayscale' : ''}>
                                                <ContactForm
                                                    onSubmit={handleFormSubmit}
                                                    isLoading={isSubmitting}
                                                    isDisabled={!uploadedImage}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Panel: Preview */}
                    <div className="lg:col-span-5">
                        <PreviewArea
                            selectedProduct={selectedProduct}
                            uploadedImage={uploadedImage}
                            onClearImage={() => setUploadedImage(null)}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
