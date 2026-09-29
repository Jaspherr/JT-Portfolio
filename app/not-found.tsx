import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-inner">
        <div className="not-found-top">
          <span>JASPHER TANIA</span>
          <span>PAGE NOT FOUND · 404</span>
        </div>

        <div className="not-found-content">
          <span className="not-found-number">404</span>

          <p className="not-found-kicker">YOU&apos;VE WANDERED OFF</p>

          <h1>
            This page doesn&apos;t
            <br />
            <em>exist anymore.</em>
          </h1>

          <p className="not-found-description">
            The page you&apos;re looking for may have been moved,
            <br />
            renamed, or never existed.
          </p>

          <Link href="/" className="not-found-link">
            <span>Back to portfolio</span>
            <span className="not-found-arrow">
              <ArrowUpRight />
            </span>
          </Link>
        </div>

        <div className="not-found-bottom">
          <span>DESIGN · DEVELOP · ITERATE</span>
          <span>© 2026</span>
        </div>
      </div>
    </main>
  );
}