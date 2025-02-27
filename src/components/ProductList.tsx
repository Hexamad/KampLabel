import React from 'react';
import { Product } from '../types';
import { Printer, Trash2 } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  onDeleteProduct: (id: string) => void;
  onPrintLabel: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onDeleteProduct, onPrintLabel }) => {
  if (products.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-xl text-gray-500">No products added yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left text-lg font-semibold border-b-2 border-gray-300">Name</th>
            <th className="p-3 text-left text-lg font-semibold border-b-2 border-gray-300">Category</th>
            <th className="p-3 text-left text-lg font-semibold border-b-2 border-gray-300">Dimensions</th>
            <th className="p-3 text-left text-lg font-semibold border-b-2 border-gray-300">Quantity</th>
            <th className="p-3 text-left text-lg font-semibold border-b-2 border-gray-300">Price (₹)</th>
            <th className="p-3 text-center text-lg font-semibold border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="p-3 text-lg">{product.name}</td>
              <td className="p-3 text-lg">{product.category}</td>
              <td className="p-3 text-lg">
                {product.dimension1 > 0 && product.dimension2 > 0 && product.dimension3 > 0
                  ? `${product.dimension1} × ${product.dimension2} × ${product.dimension3} ${product.dimensionUnit}`
                  : product.dimension1 > 0 && product.dimension2 > 0
                  ? `${product.dimension1} × ${product.dimension2} ${product.dimensionUnit}`
                  : '-'}
              </td>
              <td className="p-3 text-lg">{product.quantity} {product.quantityUnit}</td>
              <td className="p-3 text-lg">₹{product.price.toFixed(2)}</td>
              <td className="p-3 flex justify-center space-x-3">
                <button
                  onClick={() => onPrintLabel(product)}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                  title="Print Label"
                >
                  <Printer size={24} />
                </button>
                <button
                  onClick={() => onDeleteProduct(product.id)}
                  className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                  title="Delete Product"
                >
                  <Trash2 size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;