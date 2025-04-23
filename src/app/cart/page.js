
// app/cart/page.js
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [furnitures, setFurnitures] = useState([]);

  useEffect(() => {
    fetch("/furnitures.json")
      .then((res) => res.json())
      .then((data) => setFurnitures(data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Furniture Collection</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {furnitures.map((item) => (
          <Link 
            key={item.id} 
            href={`/cart/${item.id}`}
            className="group"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill
                className="object-cover object-center group-hover:opacity-75 transition-opacity"
              />
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-lg font-medium text-gray-900">${item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}