"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setPhotographers, setFilters } from "@/redux/photographerSlice";
import PhotographerCard from "@/components/PhotographerCard";
import { debounce } from "@/utils/debounce";

export default function Home() {
  const dispatch = useDispatch();
  const { photographers, filters } = useSelector((state: RootState) => state.photographer);

  const [page, setPage] = useState(1);
  const [allPhotographers, setAllPhotographers] = useState<any[]>([]);

  useEffect(() => {
    const fetchPhotographers = async () => {
      const res = await fetch("https://backend-db-dys4.onrender.com/photographers");
      const data = await res.json();
      setAllPhotographers(data);
    };
    fetchPhotographers();
  }, []);

  useEffect(() => {
    let result = [...allPhotographers];

    if (filters.city) result = result.filter((p) => p.location === filters.city);
    if (filters.rating) result = result.filter((p) => p.rating >= filters.rating);
    if (filters.styles.length)
      result = result.filter((p) => filters.styles.every((style) => p.styles.includes(style)));
    if (filters.search)
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.location.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase()))
      );
    if (filters.sort === "price-asc") result = result.sort((a, b) => a.price - b.price);
    if (filters.sort === "rating-desc") result = result.sort((a, b) => b.rating - a.rating);
    if (filters.sort === "recent") result = result.sort((a, b) => b.id - a.id);

    dispatch(setPhotographers(result.slice(0, page * 4)));
  }, [filters, allPhotographers, page]);

  const handleSearch = debounce((text: string) => {
    dispatch(setFilters({ search: text }));
  }, 300);

  return (
    <main className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-1/5 w-full p-4 md:p-6 bg-white shadow-lg border-r space-y-4 md:space-y-6 max-h-[60vh] md:max-h-none overflow-y-auto">

  <input
    type="text"
    onChange={(e) => handleSearch(e.target.value)}
    className="w-full text-black p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
    placeholder="Search by name, location, or tag"
  />
  <select
    onChange={(e) => dispatch(setFilters({ city: e.target.value }))}
    className="w-full text-black p-3 border rounded-lg"
  >
    <option value="">All Cities</option>
    <option value="Bengaluru">Bengaluru</option>
    <option value="Delhi">Delhi</option>
    <option value="Hyderabad">Hyderabad</option>
    <option value="Mumbai">Mumbai</option>
  </select>
  <select
    onChange={(e) => dispatch(setFilters({ sort: e.target.value }))}
    className="w-full text-black p-3 border rounded-lg"
  >
    <option value="">Sort by</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="rating-desc">Rating: High to Low</option>
    <option value="recent">Recently Added</option>
  </select>
  <div>
    <label className="block text-sm font text-black medium mb-1 flex justify-between">
      <span>Minimum Rating</span>
      <span className="text-blue-600 font-semibold">{filters.rating.toFixed(1)}</span>
    </label>
    <input
      type="range"
      min="0"
      max="5"
      step="0.5"
      value={filters.rating}
      onChange={(e) => dispatch(setFilters({ rating: parseFloat(e.target.value) }))}
      className="w-full accent-blue-500"
    />
  </div>
</aside>


      {/* Main grid */}
      <section className="md:w-3/4 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photographers.map((p) => (
            <PhotographerCard key={p.id} photographer={p} />
          ))}
        </div>

        <div className="text-center w-full mt-8">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      </section>
    </main>
  );
}