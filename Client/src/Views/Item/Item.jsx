import { useParams, useNavigate } from "react-router";
import data from "../../data/data.json";

export default function Item() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const item = data.find((item) => item.id === itemId);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <h2 className="text-lg sm:text-xl font-semibold text-red-500">
          Item not found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-5 inline-flex items-center gap-2 px-4 py-2 rounded-full
                   bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm transition"
      >
        ← Back to Menu
      </button>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row">
        {/* Image */}
        <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto">
          <img
            src={item.picture}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-5 sm:p-6 flex-1 space-y-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            {item.name}
          </h1>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Price:</span> ${item.price}
            </p>
            <p>
              <span className="font-semibold">Cooking Time:</span>{" "}
              {item.cookingTime} min
            </p>
            <p>
              <span className="font-semibold">Rating:</span> ⭐ {item.rating}
            </p>
            <p>
              <span className="font-semibold">Calories:</span> {item.calories}{" "}
              cal
            </p>
            <p>
              <span className="font-semibold">Category:</span> {item.category}
            </p>
            <p>
              <span className="font-semibold">Available:</span>{" "}
              <span
                className={`font-medium ${
                  item.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.available ? "Yes" : "No"}
              </span>
            </p>
          </div>

          {/* Types */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Types</h3>
            <div className="flex flex-wrap gap-2">
              {item.types.map((type, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs sm:text-sm bg-gray-100 text-gray-800 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Ingredients</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              {item.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          {/* Supplements */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Supplements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm sm:text-base">
              {item.supplements.map((supp, idx) => (
                <li key={idx}>{supp}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
