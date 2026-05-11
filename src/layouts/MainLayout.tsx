import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import ProductPreviewModal from '@/components/ProductPreviewModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayout() {
  const location = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="pt-[72px] lg:pt-[72px]"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer onProductClick={setSelectedProduct} />
      <ScrollToTop />
      
      {/* Product Preview Modal for Footer Links */}
      <ProductPreviewModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        productId={selectedProduct}
      />
    </div>
  );
}
