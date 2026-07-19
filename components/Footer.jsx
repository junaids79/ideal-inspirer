export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-ink-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-white">
              Ideal<span className="text-marigold">Inspirer</span>
            </p>
            <p className="mt-3 max-w-xs font-body text-sm text-white/60">
              Transforming talent into opportunity — training in communication,
              technology, and leadership for students and professionals.
            </p>
          </div>

          <div>
            <p className="font-body text-sm font-semibold text-white">Contact</p>
            <ul className="mt-3 space-y-2 font-body text-sm text-white/60">
              <li>Habeeb Nagar, Mahabub Nagar</li>
              <li>
                <a href="tel:+918712217977" className="hover:text-white">
                  +91 87122 17977
                </a>
              </li>
              <li>
                <a href="mailto:Idealinspirer@gmail.com" className="hover:text-white">
                  Idealinspirer@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-body text-sm font-semibold text-white">Follow</p>
            <ul className="mt-3 space-y-2 font-body text-sm text-white/60">
              <li>
                <a href="https://www.facebook.com/idealinspirer/" className="hover:text-white" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/idealinspirer" className="hover:text-white" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/idealinspirer/" className="hover:text-white" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 font-body text-xs text-white/40">
          © {new Date().getFullYear()} Ideal Inspirer. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
