const EVENTS = [
  {
    title: "Cỗ cưới nhà gái",
    date: "07/04/2018 10:00AM",
    location: "Phù Yên, Sơn La",
    phone: "0961236977",
    mapUrl: "https://goo.gl/UkzDRX",
  },
  {
    title: "Cỗ cưới nhà trai",
    date: "08/04/2018 10:00AM",
    location: "TK1, Tĩnh Gia, Thanh Hóa",
    phone: "0976418537",
    mapUrl: "https://goo.gl/dwAcoR",
  },
  {
    title: "Lễ Cưới",
    date: "09/04/2018 08:00AM",
    location: "TK1, Tĩnh Gia, Thanh Hóa",
    phone: "0976418537",
    mapUrl: "https://goo.gl/dwAcoR",
  },
  {
    title: "Lễ Báo Hỷ",
    date: "14/04/2018 17:00",
    location: "Trống Đồng Thành Công, HN",
    phone: "0961236977",
    mapUrl: "https://goo.gl/63x4iX",
  },
];

export default function WhenWhere() {
  return (
    <section id="when-where" className="section-padding bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] mb-12">
          Thời gian và địa điểm
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {EVENTS.map((event) => (
            <div key={event.title} className="space-y-2">
              <h3 className="text-xl font-[Playfair_Display] font-semibold">
                {event.title}
              </h3>
              <p className="text-gray-600 font-[Dosis]">{event.date}</p>
              <p className="text-gray-600 font-[Dosis]">{event.location}</p>
              <p className="text-gray-500 font-[Dosis]">{event.phone}</p>
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] text-sm font-[Dosis] uppercase tracking-wider hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                Bản đồ
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
