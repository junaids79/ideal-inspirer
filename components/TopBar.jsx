const CONTACT = {
  phone: "+91 97039 79806",
  phoneHref: "tel:+919703979806",
  email: "Idealinspirer@gmail.com",
  emailHref: "mailto:Idealinspirer@gmail.com",
};

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/idealinspirer/",
    icon: (
      <path d="M13.5 9H15V6.5h-1.75C11.68 6.5 10.5 7.68 10.5 9.25V11H9v2.5h1.5V19h2.5v-5.5H15l.5-2.5h-2v-1.25c0-.41.34-.75.75-.75Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/idealinspirer",
    icon: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16.2" cy="7.8" r="0.9" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/idealinspirer/",
    icon: (
      <>
        <rect x="5" y="10" width="2.4" height="8" />
        <circle cx="6.2" cy="6.5" r="1.4" />
        <path d="M10 10h2.3v1.2c.6-.9 1.6-1.4 2.8-1.4 2.2 0 3.4 1.4 3.4 4V18h-2.4v-3.7c0-1.2-.4-2-1.6-2-1 0-1.6.7-1.8 1.4-.1.2-.1.6-.1.9V18H10Z" />
      </>
    ),
  },
];

export default function TopBar() {
  return (
    <div className="hidden bg-ink text-white/80 sm:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 font-body text-xs">
        <div className="flex items-center gap-5">
          <a href={CONTACT.phoneHref} className="flex items-center gap-1.5 transition hover:text-white">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-marigold" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
            </svg>
            {CONTACT.phone}
          </a>
          <a href={CONTACT.emailHref} className="hidden items-center gap-1.5 transition hover:text-white md:flex">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-marigold" aria-hidden="true">
              <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2.4V17h16V7.4l-7.4 5-.1.1a1 1 0 0 1-1 0l-.1-.1-7.4-5Zm1.2-.4 6.8 4.6L18.8 7Z" />
            </svg>
            {CONTACT.email}
          </a>
        </div>

        <div className="flex items-center gap-3.5">
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="text-white/70 transition hover:text-marigold">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}