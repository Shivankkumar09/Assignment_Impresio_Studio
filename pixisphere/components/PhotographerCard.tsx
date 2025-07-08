"use client";
import Link from "next/link";
import React from "react";

interface Photographer {
  id: string;
  name: string;
  profilePic: string;
  location: string;
  price: number;
  rating: number;
  tags: string[];
}

const PhotographerCard = ({ photographer }: { photographer: Photographer }) => {
  return (
    <div className="border p-4 rounded-xl shadow-md bg-white hover:shadow-xl transition">
      <img
        src={photographer.profilePic}
        alt={photographer.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2 text-gray-800">{photographer.name}</h2>
      <p className="text-sm text-gray-600">{photographer.location}</p>
      <p className="text-sm font-medium text-blue-600">₹{photographer.price} onwards</p>
      <p className="text-sm text-yellow-600">⭐ {photographer.rating}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {photographer.tags.map((tag: string) => (
          <span key={tag} className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/photographer/${photographer.id}`}
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm transition"
      >
        View Profile
      </Link>
    </div>
  );
};

export default PhotographerCard;
