
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const PhotographerProfilePage = () => {
  const { id } = useParams();
  const [photographer, setPhotographer] = useState<any>(null);

  useEffect(() => {
    const fetchPhotographer = async () => {
      try {
        const res = await fetch(`https://backend-db-dys4.onrender.com/photographers/${id}`);
        const data = await res.json();
        console.log("Fetched photographer:", data);
        setPhotographer(data);
      } catch (error) {
        console.error("Error fetching photographer:", error);
      }
    };

    fetchPhotographer();
  }, [id]);

  if (!photographer) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={photographer.profilePic}
          alt={photographer.name}
          className="w-64 h-64 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-300">{photographer.name}</h1>
          <p className="text-gray-500">{photographer.location}</p>
          <p className="text-yellow-600 mt-2">⭐ {photographer.rating}</p>
          <p className="text-blue-600 font-medium mt-1">₹{photographer.price} onwards</p>
          <p className="mt-4 text-gray-400">{photographer.bio}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Tags:</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {photographer.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Styles:</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {photographer.styles.map((style: string) => (
                <span
                  key={style}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {photographer.portfolio.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              alt={`portfolio-${index}`}
              className="w-full h-48 object-cover rounded-md shadow"
            />
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        <div className="space-y-4">
          {photographer.reviews.map((review: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-yellow-500">⭐ {review.rating}</p>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotographerProfilePage;
