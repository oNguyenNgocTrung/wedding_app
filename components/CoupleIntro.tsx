import CountdownTimer from "./CountdownTimer";

export default function CoupleIntro() {
  return (
    <section id="couple" className="section-padding bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Trung */}
          <div>
            <div
              className="round-image"
              style={{ backgroundImage: "url('/images/trung.jpg')" }}
            />
            <h3 className="mt-4 text-2xl font-[Playfair_Display]">Trung</h3>
          </div>

          {/* Center */}
          <div>
            <img
              src="/images/animations/mrandmrs.gif"
              alt=""
              className="h-32 md:h-40 mx-auto"
            />
            <h3 className="mt-4 text-lg font-[Playfair_Display]">
              Chúng tôi chuẩn bị cưới
              <br />
              vào ngày 9 tháng 4 năm 2018
            </h3>
            <p className="text-gray-500 mt-2 font-[Dosis]">
              Tĩnh Gia, Thanh Hóa
            </p>
          </div>

          {/* Bich */}
          <div>
            <div
              className="round-image"
              style={{ backgroundImage: "url('/images/bich.jpg')" }}
            />
            <h3 className="mt-4 text-2xl font-[Playfair_Display]">Bích</h3>
          </div>
        </div>

        <CountdownTimer />
      </div>
    </section>
  );
}
