import { SITE, } from '@/lib/site';
import { whatsappLink } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer id="store">
      <div className="wrap cols">
        <div>
          <h2>Visit our store</h2>
          <p>{SITE.name}<br />{SITE.address}</p>
          <p><a href={SITE.maps} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
        </div>
        <div>
          <h2>Delivery and orders</h2>
          <p>We deliver countrywide via {SITE.courier}. Delivery charges depend on your destination and are confirmed on WhatsApp.</p>
          <p><a href={whatsappLink("Hello Skyline Computers, I have a question.")} target="_blank" rel="noopener noreferrer">Chat on WhatsApp: {SITE.whatsappDisplay}</a></p>
        </div>
      </div>
      <div className="wrap small" style={{ marginTop: 24, color: '#999' }}>© {new Date().getFullYear()} {SITE.name}. Prices are retail prices in KSh. Final availability and price are confirmed on WhatsApp.</div>
    </footer>
  );
}
