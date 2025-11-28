function Card({ title, location, type, rating, reviews, img }) {
  return (
    <div className="w-96 flex flex-col bg-white dark:bg-gray-900 mb-1 rounded-2xl border overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 max-w-sm">
      <div className="relative h-56 overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">{type}</div>
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{location}</p>
        <div className="flex justify-between text-sm">
          <span>⭐ {rating} ({reviews})</span>
          <span className="text-gray-400">🕒</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
