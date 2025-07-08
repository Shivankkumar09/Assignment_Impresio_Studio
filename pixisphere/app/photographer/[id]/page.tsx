"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Photographer {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  styles: string[];
  tags: string[];
  bio: string;
  profilePic: string;
  portfolio: string[];
  reviews: Review[];
}

const PhotographerProfilePage = () => {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState<Photographer | null>(null);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const res = await fetch(`https://backend-db-dys4.onrender.com/photographers/${id}`);
        const data = await res.json();
        setPhotographer(data);
      } catch (error) {
        console.error("Error fetching photographer:", error);
      }
    };

    fetchPhotographer();
  }, [id]);

  if (!photographer) return <div className="p-6 text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src={photographer.profilePic}
            alt={photographer.name}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg object-cover shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-3">
          <h1 className="text-3xl font-bold text-gray-300">{photographer.name}</h1>
          <p className="text-gray-500">{photographer.location}</p>
          <p className="text-yellow-600 font-medium">⭐ {photographer.rating}</p>
          <p className="text-blue-600 font-semibold">₹{photographer.price} onwards</p>
          <p className="text-gray-400 mt-2">{photographer.bio}</p>

          {/* Tags */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-200 mb-1">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {photographer.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Styles */}
          <div className="mt-4">
            <h3 className="font-semibold text-gray-200 mb-1">Styles:</h3>
            <div className="flex flex-wrap gap-2">
              {photographer.styles.map((style: string) => (
                <span
                  key={style}
                  className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-200 mb-4">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photographer.portfolio.map((img: string, index: number) => (
            <div key={index} className="w-full h-48 relative rounded-lg overflow-hidden shadow">
              <Image
                src={img}
                alt={`portfolio-${index}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-200 mb-4">Reviews</h2>
        <div className="space-y-4">
          {photographer.reviews.map((review: Review, index: number) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-1"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-yellow-600 font-medium">⭐ {review.rating}</p>
              </div>
              <p className="text-sm text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-500">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotographerProfilePage;
