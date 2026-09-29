import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-name">
            <Image
              src="/icon.png"
              alt=""
              width={28}
              height={28}
              className="footer-monogram"
            />

            <b>Jaspher Tania</b>
          </div>

          <small>Design · Develop · Iterate</small>
        </div>

        <a href="#top" className="back-top">
          Back to top ↑
        </a>

        <small>
          Designed &amp; built with intent.
          <br />
          © 2026 Jaspher Tania.
        </small>
      </div>
    </footer>
  );
}