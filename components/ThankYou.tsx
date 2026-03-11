export default function ThankYou() {
  return (
    <section
      className="relative section-padding parallax-bg"
      style={{ backgroundImage: "url('/images/QPT_2433.jpg')" }}
    >
      <div className="absolute inset-0 bg-[var(--color-dark)] opacity-40" />
      <div className="relative z-10 text-center">
        <img
          src="/images/animations/thnyou_wh.gif"
          alt="Thank you"
          className="h-40 md:h-52 mx-auto"
        />
      </div>
    </section>
  );
}
