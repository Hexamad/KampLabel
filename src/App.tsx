import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Product } from './types';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductLabel from './components/ProductLabel';
import { Printer, Package } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handlePrintLabel = (product: Product) => {
    setSelectedProduct(product);
    // Give time for the component to render before printing
    setTimeout(() => {
      if (labelRef.current) {
        handlePrint();
      }
    }, 100);
  };

  const handlePrint = useReactToPrint({
    content: () => labelRef.current,
    documentTitle: `Label-${selectedProduct?.name || 'Product'}`,
    removeAfterPrint: false,
    pageStyle: `
      @page {
        size: 4in 6in;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    `
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-8">
        <div className="flex items-center justify-center">
          <Package size={40} className="text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-center">GKT + Kamp Label Generator</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8">
        <ProductForm onAddProduct={handleAddProduct} />
        
        <ProductList 
          products={products} 
          onDeleteProduct={handleDeleteProduct} 
          onPrintLabel={handlePrintLabel} 
        />
        
        {selectedProduct && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Label Preview</h2>
              <button
                onClick={handlePrint}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition-colors"
              >
                <Printer className="mr-2" size={20} />
                Print Label
              </button>
            </div>
            
            <div className="flex justify-center border-t border-gray-200 pt-4">
              <div className="scale-90 origin-top">
                <ProductLabel product={selectedProduct} forwardedRef={labelRef} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;