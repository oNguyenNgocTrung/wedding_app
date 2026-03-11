const FACEBOOK_BICH = "https://www.facebook.com/mam.yeu.tom";
const FACEBOOK_TRUNG = "https://www.facebook.com/nnt142";

function SocialLinks({ facebook }: { facebook: string }) {
  return (
    <div className="flex gap-3 mt-4">
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
        aria-label="Facebook"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      </a>
    </div>
  );
}

export default function AboutUs() {
  return (
    <section className="bg-[#ecf2f0]">
      <div className="max-w-6xl mx-auto">
        {/* Bich - Left text, Right image */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div className="bg-white p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-[Playfair_Display] mb-4">
              Bích
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Nàng là cô gái miền núi luôn ngây thơ trước mọi hoàn cảnh và chỉ
              thích ăn thịt.
            </p>
            <SocialLinks facebook={FACEBOOK_BICH} />
          </div>
          <div
            className="min-h-[300px] md:min-h-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/QPT_1395.jpg')" }}
          />
        </div>

        {/* Trung - Left image, Right text */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div
            className="min-h-[300px] md:min-h-0 bg-cover bg-center order-2 md:order-1"
            style={{ backgroundImage: "url('/images/QPT_1591.jpg')" }}
          />
          <div className="bg-white p-10 md:p-16 flex flex-col justify-center order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-[Playfair_Display] mb-4">
              Trung
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Chàng trai miền biển, thích ăn kẹo và táo.
            </p>
            <SocialLinks facebook={FACEBOOK_TRUNG} />
          </div>
        </div>
      </div>
    </section>
  );
}
