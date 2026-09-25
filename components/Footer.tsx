import { MapPin } from 'lucide-react';
import { SITE } from '@/lib/site';
import { whatsappLink } from '@/lib/whatsapp';
import { WhatsAppIcon } from './icons';

export default function Footer() {
  const waHref = whatsappLink('Hello Skyline Computers, I have a question.');
  return (
    <footer id="store-footer">
      <div className="wrap footer-grid">
        <div>
          <h3>Visit our store</h3>
          <p style={{ color: 'var(--text)', fontWeight: 600 }}>{SITE.name}</p>
          <address style={{ fontStyle: 'normal', color: 'var(--text-2)', lineHeight: 1.65 }}>
            Terry House, Mfangano Street
            <br />
            Shop G15, Ground Floor
            <br />
            Nairobi CBD, Kenya
          </address>
          <p style={{ marginTop: 12 }}>
            <a
              href={SITE.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-link"
            >
              <MapPin size={14} />
              Get directions to our Terry House showroom
            </a>
          </p>
        </div>

        <div>
          <h3>Delivery &amp; orders</h3>
          <p>
            Countrywide delivery available via {SITE.courier}. Delivery charges depend on your
            destination and are confirmed on WhatsApp.
          </p>
          <p style={{ marginTop: 12 }}>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="wa-link">
              <WhatsAppIcon size={14} />
              Chat on WhatsApp — {SITE.whatsappDisplay}
            </a>
          </p>
        </div>

        <div>
          <h3>Shop</h3>
          <p><a href="/#catalogue">Browse catalogue</a></p>
          <p><a href="/?cat=Computers#catalogue">Computers</a></p>
          <p><a href="/?cat=Computer%20Accessories#catalogue">Accessories</a></p>
          <p><a href="/?cat=Security#catalogue">Security &amp; CCTV</a></p>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} {SITE.name}. Prices are retail prices in KSh.
        </span>
        <span>Final availability and price are confirmed on WhatsApp.</span>
      </div>
    </footer>
  );
}