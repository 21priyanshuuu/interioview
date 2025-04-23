"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FurnitureDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [furniture, setFurniture] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/furnitures.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedFurniture = data.find((item) => item.id === parseInt(id));
        setFurniture(selectedFurniture);
      });
  }, [id]);

  const handleAddToCart = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Add to cart logic here
    setLoading(false);
    router.push('/cart');
  };

  if (!furniture) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <nav className="mb-8">
        <Link 
          href="/cart" 
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Back to Shop
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
            <Canvas className="absolute inset-0">
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <Environment preset="city" />
              <OrbitControls />
              <ModelViewer model={furniture.model} />
            </Canvas>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{furniture.name}</h1>
            <p className="mt-4 text-3xl font-bold text-gray-900">${furniture.price}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <p className="mt-2 text-gray-600">{furniture.description}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Features</h3>
            <ul className="mt-4 space-y-2">
              {furniture.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <span className="mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-6 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Materials</h3>
              <p className="mt-2 text-gray-600">{furniture.materials.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <p className="mt-2 text-gray-600">{furniture.color}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Delivery Time</h3>
              <p className="mt-2 text-gray-600">{furniture.deliveryTime}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Warranty</h3>
              <p className="mt-2 text-gray-600">{furniture.warranty}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">Dimensions</h3>
            <p className="mt-2 text-gray-600">{furniture.dimensions}</p>
          </div>

          <div className="border-t border-gray-200 pt-6 space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className={`w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
            
            <p className="text-sm text-gray-500 text-center">
              {furniture.inStock ? 'In Stock' : 'Out of Stock'} • Free Shipping
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModelViewer({ model }) {
  const { scene } = useGLTF(model);
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}