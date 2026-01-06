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

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = data.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.types.includes(activeCategory);

    const searchLower = search.trim().toLowerCase();
    const matchesSearch =
      !searchLower ||
      item.name.toLowerCase().includes(searchLower) ||
      (item.description && item.description.toLowerCase().includes(searchLower)) ||
      item.types.join(" ").toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-6">Menu</h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => {if(activeCategory !== "all") setActiveCategory("all");setSearch(e.target.value);}}
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </div>

      {/* Category Nav */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  activeCategory === category
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
          {filteredItems.map((item) => (
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
