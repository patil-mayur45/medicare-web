import { useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

export default function Carousel({ slides, autoPlayMs = 4500 }) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [next, autoPlayMs]);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div key={i} className="w-full shrink-0 px-4">
              <div className="card p-8 text-center">
                <FaQuoteLeft className="text-primary-300 mx-auto mb-4" size={24} />
                <p className="text-gray-600 italic mb-4 leading-relaxed">{s.quote}</p>
                <p className="font-semibold text-gray-800">{s.name}</p>
                <p className="text-xs text-gray-400">{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={14} />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 h-9 w-9 rounded-full bg-white shadow-md flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors"
        aria-label="Next slide"
      >
        <FaChevronRight size={14} />
      </button>

      <div className="flex justify-center gap-2 mt-5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-primary-600" : "w-2 bg-primary-200"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
