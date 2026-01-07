import data from "../../data/data.json";
import { Link } from "react-router";
import { useState } from "react";

export default function Menu() {
  const [search, setSearch] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);
  const [sortBy, setSortBy] = useState("none");

  const categories = [
    "all",
    "breakfast",
    "lunch",
    "dinner",
    "brunch",
    "snacks",
    "dessert",
    "treats",
    "drink",
  ];

  const filteredItems = data.filter((item) => {
    const matchesCategory =
      activeCategories.length === 0 ||
      (item.types && item.types.some((t) => activeCategories.includes(t)));

    const searchLower = search.trim().toLowerCase();
    const matchesSearch =
      !searchLower ||
      item.name.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower) ||
      item.types?.join(" ").toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const parsePrice = (p) =>
    parseFloat(String(p).replace(/[^0-9.\-]+/g, "")) || 0;

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return parsePrice(a.price) - parsePrice(b.price);
      case "price-desc":
        return parsePrice(b.price) - parsePrice(a.price);
      case "popularity-asc":
        return (a.rating || 0) - (b.rating || 0);
      case "popularity-desc":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6">Menu</h1>

      {/* Search + Sort */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-center">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => {
            if (activeCategories.length) setActiveCategories([]);
            setSearch(e.target.value);
          }}
          className="w-full sm:max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 border rounded-md bg-white"
        >
          <option value="none">Sort: None</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="popularity-desc">Popularity: High → Low</option>
          <option value="popularity-asc">Popularity: Low → High</option>
        </select>
      </div>

      {/* Categories */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-3 w-max mx-auto px-1">
          {categories.map((category) => {
            const isActive =
              category === "all"
                ? activeCategories.length === 0
                : activeCategories.includes(category);

            return (
              <button
                key={category}
                onClick={() =>
                  setActiveCategories((prev) => {
                    if (category === "all") return [];
                    return prev.includes(category)
                      ? prev.filter((c) => c !== category)
                      : [...prev, category];
                  })
                }
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition
                  ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Grid */}
      {!sortedItems.length ? (
        <p className="text-center text-gray-500 text-lg">No menu found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedItems.map((item) => (
            <Link
              key={item.id}
              to={`/menu/${item.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="aspect-[4/3] w-full">
                <img
                  src={item.picture}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 space-y-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>

                <p className="text-gray-700 font-medium">${item.price}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>⭐ {item.rating}</span>
                  <span>{item.calories} cal</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
