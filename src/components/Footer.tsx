import { InstagramLogo, FacebookLogo, TwitterLogo, LinkedinLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { dealershipName } from "@/lib/data";

const columns = [
  {
    title: "Explore",
    links: [
      { label: "Vehicles", href: "#inventory" },
      { label: "Brands", href: "#brands" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#experience" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Test Drive", href: "#test-drive" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Warranty Terms", href: "#" },
    ],
  },
];

const social = [InstagramLogo, FacebookLogo, TwitterLogo, LinkedinLogo, YoutubeLogo];

export function Footer() {
  return (
    <footer className="border-t border-border-hair bg-black">
      <div className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-teal shadow-[0_0_10px_2px_rgba(0,140,145,0.6)]" />
              <span className="font-display text-lg font-semibold tracking-tight text-off-white">
                {dealershipName.slice(0, 4).toUpperCase()}
                <span className="text-teal-light">{dealershipName.slice(4)}</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-titanium/60">
              A graphite-and-titanium showroom for the vehicles that define
              performance, presented one at a time.
            </p>
            <div className="mt-6 flex gap-3">
              {social.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border-hair text-titanium transition-colors duration-200 hover:border-teal/40 hover:text-teal-light"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-titanium/50">
                {col.title}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-titanium/70 transition-colors duration-200 hover:text-teal-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-border-hair pt-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-titanium/40">
            © {new Date().getFullYear()} {dealershipName}. All rights reserved.
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-light">
            Drive the Extraordinary.
          </p>
        </div>
      </div>
    </footer>
  );
}
