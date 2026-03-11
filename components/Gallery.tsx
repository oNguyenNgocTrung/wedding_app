"use client";

import { useState } from "react";

type Category = "all" | "hanoi" | "moc_chau" | "ta_xua";

const FILTERS: { label: string; value: Category }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Hà Nội", value: "hanoi" },
  { label: "Mộc Châu", value: "moc_chau" },
  { label: "Tà Xùa", value: "ta_xua" },
];

interface GalleryImage {
  src: string;
  category: Category;
}

const IMAGES: GalleryImage[] = [
  ...Array.from({ length: 8 }, (_, i) => ({
    src: `/images/gallery/BT_${i + 1}.jpg`,
    category: "hanoi" as Category,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `/images/gallery/MC_${i + 1}.jpg`,
    category: "moc_chau" as Category,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `/images/gallery/TX_${i + 1}.jpg`,
    category: "ta_xua" as Category,
  })),
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const filteredImages =
    activeFilter === "all"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeFilter);

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <img
          src="/images/animations/flower7.gif"
          alt=""
          className="h-24 md:h-28 mx-auto mb-4"
        />
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] mb-3">
          Ảnh kỉ niệm
        </h2>
        <p className="text-gray-500 font-[Dosis] mb-8">
          Chúng tôi đều thích chụp ảnh nhưng chỉ thích đăng ảnh đẹp ^^
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`filter-btn ${
                activeFilter === filter.value ? "active" : ""
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredImages.map((image) => (
            <button
              key={image.src}
              onClick={() => setLightboxImage(image.src)}
              className="aspect-square overflow-hidden cursor-pointer group"
            >
              <img
                src={image.src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 cursor-pointer"
            aria-label="Close"
          >
            &times;
          </button>
          <img src={lightboxImage} alt="" />
        </div>
      )}
    </section>
  );
}
