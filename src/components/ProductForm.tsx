import React, { useState } from 'react';
import { Product, dimensionUnits, quantityUnits, productCategories } from '../types';
import { Plus, X } from 'lucide-react';

interface ProductFormProps {
  onAddProduct: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    category: productCategories[0],
    dimension1: 0,
    dimension2: 0,
    dimension3: 0,
    dimensionUnit: 'cm',
    quantity: 1,
    quantityUnit: 'pcs',
    price: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (['dimension1', 'dimension2', 'dimension3', 'quantity', 'price'].includes(name)) {
      setProduct({
        ...product,
        [name]: parseFloat(value) || 0
      });
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a random ID
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    };
    
    onAddProduct(newProduct);
    
    // Reset form
    setProduct({
      name: '',
      description: '',
      category: productCategories[0],
      dimension1: 0,
      dimension2: 0,
      dimension3: 0,
      dimensionUnit: 'cm',
      quantity: 1,
      quantityUnit: 'pcs',
      price: 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-lg font-medium mb-2">
            Product Name
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-lg"
              required
            />
          </label>
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2">
            Category
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-lg"
              required
            >
              {productCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-lg font-medium mb-2">
            Description
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-lg"
              rows={2}
            />
          </label>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-lg font-medium mb-2">Dimensions</label>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <input
                type="number"
                name="dimension1"
                value={product.dimension1 || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                placeholder="Length"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <input
                type="number"
                name="dimension2"
                value={product.dimension2 || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                placeholder="Width"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <input
                type="number"
                name="dimension3"
                value={product.dimension3 || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                placeholder="Height"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <select
                name="dimensionUnit"
                value={product.dimensionUnit}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
              >
                {dimensionUnits.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2">Quantity</label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="number"
                name="quantity"
                value={product.quantity || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <select
                name="quantityUnit"
                value={product.quantityUnit}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-lg"
              >
                {quantityUnits.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2">
            Price (₹)
            <input
              type="number"
              name="price"
              value={product.price || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 text-lg"
              min="0"
              step="0.01"
              required
            />
          </label>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xl font-medium flex items-center hover:bg-blue-700 transition-colors"
        >
          <Plus className="mr-2" size={24} />
          Add Product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;