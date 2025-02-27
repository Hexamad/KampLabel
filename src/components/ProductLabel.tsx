import React, { useRef } from 'react';
import { Product } from '../types';
import { QRCodeSVG } from 'qrcode.react';

interface ProductLabelProps {
  product: Product;
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const ProductLabel: React.FC<ProductLabelProps> = ({ product, forwardedRef }) => {
  const formatDimensions = () => {
    if (product.dimension1 > 0 && product.dimension2 > 0 && product.dimension3 > 0) {
      return `${product.dimension1} × ${product.dimension2} × ${product.dimension3} ${product.dimensionUnit}`;
    } else if (product.dimension1 > 0 && product.dimension2 > 0) {
      return `${product.dimension1} × ${product.dimension2} ${product.dimensionUnit}`;
    } else if (product.dimension1 > 0) {
      return `${product.dimension1} ${product.dimensionUnit}`;
    }
    return '';
  };

  // Create a JSON string with all product details
  const qrCodeData = JSON.stringify({
    id: product.id,
    name: product.name,
    category: product.category,
    description: product.description,
    dimensions: formatDimensions(),
    quantity: `${product.quantity} ${product.quantityUnit}`,
    price: `₹${product.price.toFixed(2)}`
  });

  return (
    <div 
      ref={forwardedRef} 
      className="bg-white border border-gray-300 p-4 flex flex-col"
      style={{ 
        width: '4in',
        height: '6in',
        pageBreakInside: 'avoid',
        pageBreakAfter: 'always',
        boxSizing: 'border-box'
      }}
    >
      <div className="text-center border-b-2 border-black pb-2 mb-3">
        <img 
          src="/assets/kamp edited logo.jpg" 
          alt="Company Logo" 
          className="h-16 mx-auto object-contain"
        />
      </div>
      
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">{product.name}</h2>
          <p className="text-lg mb-3">{product.category}</p>
          
          {product.description && (
            <p className="text-lg mb-3">{product.description}</p>
          )}
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {formatDimensions() && (
              <div>
                <p className="text-lg font-semibold">Dimensions:</p>
                <p className="text-xl">{formatDimensions()}</p>
              </div>
            )}
            
            <div>
              <p className="text-lg font-semibold">Quantity:</p>
              <p className="text-xl">{product.quantity} {product.quantityUnit}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-lg font-semibold">Price:</p>
              <p className="text-3xl font-bold">₹{product.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">Product ID:</p>
              <p className="text-lg">{product.id}</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-3">
            <div className="flex flex-col items-center">
              <QRCodeSVG 
                value={qrCodeData}
                size={150}
                level="H"
                includeMargin={true}
              />
              <p className="text-sm mt-2 text-gray-600">Scan for product details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductLabel;