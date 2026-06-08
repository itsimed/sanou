import { FOOTER_SECTIONS, SOCIAL_LINKS, ASSOCIATION_INFO } from '../constants';
import { fonts } from '../config/fonts';

export function Footer() {
  return (
    <footer
      className="w-full text-white bg-black"
      role="contentinfo"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
          {/* Brand section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3
              className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white"
              style={{ fontFamily: fonts.heading }}
            >
              {ASSOCIATION_INFO.name}
            </h3>
            <p
              className="text-gray-100 mb-4 sm:mb-6 leading-relaxed text-sm"
              style={{ fontFamily: fonts.body }}
            >
              {ASSOCIATION_INFO.description.substring(0, 120)}...
            </p>
            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4" role="list" aria-label="Liens réseaux sociaux">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 sm:w-11 h-10 sm:h-11 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black focus:bg-white focus:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white transition duration-200"
                  aria-label={`Visitez ${ASSOCIATION_INFO.name} sur ${social.platform}`}
                  role="listitem"
                >
                  <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <svg fill="#ffffff" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M128,84a44,44,0,1,0,44,44A44.04978,44.04978,0,0,0,128,84Zm0,80a36,36,0,1,1,36-36A36.04061,36.04061,0,0,1,128,164ZM172,32H84A52.059,52.059,0,0,0,32,84v88a52.059,52.059,0,0,0,52,52h88a52.059,52.059,0,0,0,52-52V84A52.059,52.059,0,0,0,172,32Zm44,140a44.04978,44.04978,0,0,1-44,44H84a44.04978,44.04978,0,0,1-44-44V84A44.04978,44.04978,0,0,1,84,40h88a44.04978,44.04978,0,0,1,44,44ZM188,76a8,8,0,1,1-8-8A8.00917,8.00917,0,0,1,188,76Z"></path> </g></svg>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} role="navigation" aria-label={`${section.title}`}>
              <h4
                className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-white"
                style={{ fontFamily: fonts.heading }}
              >
                {section.title}
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-100 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition duration-200 inline-block text-sm"
                      style={{ fontFamily: fonts.body }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-30 mb-6 sm:mb-8" />
      </div>
    </footer>
  );
}
