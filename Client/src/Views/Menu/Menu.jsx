import data from "../../data/data.json";

import { Link } from "react-router";

import { useState } from "react";

export default function Menu() {
  const [search, setSearch] = useState("");

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

  // empty array means "all" (no category filter)
  const [activeCategories, setActiveCategories] = useState([]);
  const [sortBy, setSortBy] = useState("none");

  const filteredItems = data.filter((item) => {
    const matchesCategory =
      activeCategories.length === 0 ||
      (item.types && item.types.some((t) => activeCategories.includes(t)));

    const searchLower = search.trim().toLowerCase();
    const matchesSearch =
      !searchLower ||
      item.name.toLowerCase().includes(searchLower) ||
      (item.description && item.description.toLowerCase().includes(searchLower)) ||
      (item.types && item.types.join(" ").toLowerCase().includes(searchLower));

    return matchesCategory && matchesSearch;
  });

  const parsePrice = (p) => {
    const n = parseFloat(String(p).replace(/[^0-9.\-]+/g, ""));
    return Number.isNaN(n) ? 0 : n;
  };

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6">Menu</h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => {
            if (activeCategories.length) setActiveCategories([]);
            setSearch(e.target.value);
          }}
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          <option value="none">Sort: None</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="popularity-asc">Popularity: Low → High</option>
          <option value="popularity-desc">Popularity: High → Low</option>
        </select>
      </div>

      {/* Category Nav */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategories((prev) => {
                if (category === "all") return [];
                if (prev.includes(category)) return prev.filter((c) => c !== category);
                return [...prev, category];
              });
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  (category === "all" ? activeCategories.length === 0 : activeCategories.includes(category))
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
                `}
          >
            {category}
          </button>
        ))}
      </div>

      {!filteredItems?.length ? (
        <p className="text-center text-gray-500 text-lg">No menu found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedItems.map((item) => (
            <Link
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              to={`/menu/${item.id}`}
            >
              <img
                src={item.picture}
                alt={item.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>

                <p className="text-gray-600 font-medium">${item.price}</p>

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
