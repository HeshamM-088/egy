function Card({ title, location, type, rating, reviews, img }) {
    return (
      <div
        data-slot="card"
        className="w-96 flex flex-col flex-wrap bg-white text-gray-800 rounded-xl border overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300 border-gray-200 max-w-sm"
      >
        <div className="relative h-56 overflow-hidden">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            {type}
          </div>
        </div>
        <div className="p-5 space-y-3">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center text-gray-500 space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-map-pin w-4 h-4"
            >
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{location}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <div className="flex items-center space-x-1">
              <span>⭐</span>
              <span className="text-sm">
                {rating} ({reviews} reviews)
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clock w-4 h-4 text-gray-400"
            >
              <path d="M12 6v6l4 2"></path>
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
          </div>
        </div>
      </div>
    );
}

export default Card;
