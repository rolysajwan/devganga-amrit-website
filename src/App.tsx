import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Menu,
  Mountain,
  ShieldCheck,
  Sparkles,
  X,
  MessageCircle,
} from 'lucide-react'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'About Us', href: '#about' },
  { label: 'Devprayag', href: '#devprayag' },
  { label: 'Our Product', href: '#product' },
  { label: 'Contact', href: '#contact' },
]

const whatsappLink =
  'https://wa.me/919643345474?text=Hello%2C%20DEVGANGA%20AMRIT%20Team!%20I%20would%20like%20to%20know%20more%20about%20your%20Ganga%20Jal%20product.'

const imagePaths = {
  poster: `${import.meta.env.BASE_URL}images/devganga-amrit-poster.jpg`,
  logo: `${import.meta.env.BASE_URL}images/logo.png`,
  product: `${import.meta.env.BASE_URL}images/product-bottle.png`,
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main>
      {/* ANNOUNCEMENT BAR */}

      <div className="announcement">
        <span>A SACRED CONNECTION TO DEVPRAYAG</span>
        <span className="announcement-dot">✦</span>
        <span>ROOTED IN HERITAGE</span>
      </div>

      {/* HEADER */}

      <header className="site-header">
        <a
          href="#home"
          className="brand"
          aria-label="DevGanga Amrit home"
        >
          <span className="brand-symbol">
            <img
              className="brand-logo-image"
              src={imagePaths.logo}
              alt="DevGanga Amrit logo"
            />
          </span>

          <span className="brand-copy">
            <strong>DEVGANGA AMRIT</strong>
            <small>THE SPIRIT OF DEVPRAYAG</small>
          </span>
        </a>

        <nav
          className={
            menuOpen
              ? 'navigation navigation-open'
              : 'navigation'
          }
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#product"
            className="nav-cta"
            onClick={() => setMenuOpen(false)}
          >
            Discover <ArrowRight size={15} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* HERO SECTION */}

      <section className="hero" id="home">
        <div
          className="hero-image"
          aria-hidden="true"
          style={{
            backgroundImage: `url("${imagePaths.poster}")`,
          }}
        />

        <div className="hero-overlay" />

        <div className="hero-content">
          <div className="eyebrow hero-eyebrow">
            <span className="eyebrow-line" />
            FROM THE SACRED CONFLUENCE
          </div>

          <h1>
            Where the
            <br />
            rivers meet,
            <br />
            <em>faith flows.</em>
          </h1>

          <p className="hero-description">
            Inspired by the timeless spiritual heritage of
            Devprayag, Uttarakhand — where the sacred rivers
            come together.
          </p>

          <div className="hero-actions">
            <a href="#story" className="button button-gold">
              Discover Our Story <ArrowRight size={17} />
            </a>

            <a href="#devprayag" className="text-link">
              Explore our roots <ArrowDown size={15} />
            </a>
          </div>
        </div>

        <div className="hero-caption">
          <span>30°08' N</span>
          <span className="caption-divider" />
          <span>78°35' E</span>
          <span className="caption-place">
            DEVPRAYAG · UTTARAKHAND
          </span>
        </div>

        <div className="hero-side-note">
          A HERITAGE THAT FLOWS THROUGH GENERATIONS
        </div>

        <a
          className="scroll-indicator"
          href="#story"
          aria-label="Scroll to our story"
        >
          <span />
        </a>
      </section>

      {/* OUR STORY */}

      <section className="intro section-pad" id="story">
        <div className="intro-label">
          <span className="section-index">
            01 / OUR PHILOSOPHY
          </span>

          <span className="gold-rule" />
        </div>

        <div className="intro-grid">
          <div>
            <p className="eyebrow">
              MORE THAN A PLACE. A FEELING.
            </p>

            <h2>
              A sacred tradition,
              <br />
              <em>carried with care.</em>
            </h2>
          </div>

          <div className="intro-copy">
            <p>
              Some places are more than destinations. They hold
              memories, traditions and a sense of belonging
              that travels across generations.
            </p>

            <p>
              DevGanga Amrit draws inspiration from Devprayag,
              the revered Himalayan confluence, bringing the
              spirit of this heritage into your moments of
              prayer and devotion.
            </p>

            <a className="underlined-link" href="#devprayag">
              The story of our origin <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="values-row">
          <article className="value-item">
            <Mountain size={25} strokeWidth={1.25} />

            <div>
              <h3>Himalayan Roots</h3>
              <p>Inspired by the land of Devprayag.</p>
            </div>
          </article>

          <article className="value-item">
            <Sparkles size={25} strokeWidth={1.25} />

            <div>
              <h3>Living Heritage</h3>
              <p>Honouring traditions of devotion.</p>
            </div>
          </article>

          <article className="value-item">
            <ShieldCheck size={25} strokeWidth={1.25} />

            <div>
              <h3>Thoughtful Purpose</h3>
              <p>Created for religious and ritual use.</p>
            </div>
          </article>
        </div>
      </section>

      {/* ABOUT US */}

      <section className="about-section section-pad" id="about">
        <span className="section-index">
          ABOUT DEVGANGA AMRIT
        </span>

        <span className="gold-rule" />

        <h2>
          Rooted in faith.
          <br />
          <em>Inspired by Devprayag.</em>
        </h2>

        <p>
          DEVGANGA AMRIT is a spiritual heritage brand inspired
          by the sacred traditions and natural beauty of
          Devprayag, Uttarakhand. Our purpose is to bring an
          expression of this heritage into homes and places
          of worship through products intended for religious
          and ritual use.
        </p>

        {/* FOUNDER PROFILE */}

        <div className="founder-intro">
          <span className="eyebrow">
            THE PERSON BEHIND THE VISION
          </span>

          <h3>Meet Rahul Sajwan</h3>

          <p>Founder of DevGanga Amrit</p>

          <a
            href="https://rolysajwan.github.io/"
            className="button button-gold founder-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Meet Rahul Sajwan, founder of DevGanga Amrit — opens personal portfolio in a new tab"
          >
            Meet the Founder <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* DEVPRAyAG ORIGIN */}

      <section className="origin-section" id="devprayag">
        <div
          className="origin-image"
          role="img"
          aria-label="DevGanga Amrit brand poster featuring Devprayag"
          style={{
            backgroundImage: `url("${imagePaths.poster}")`,
          }}
        />

        <div className="origin-content">
          <span className="section-index">
            02 / OUR ORIGIN
          </span>

          <span className="gold-rule" />

          <p className="eyebrow">
            IN THE HEART OF THE HIMALAYAS
          </p>

          <h2>
            Devprayag.
            <br />
            <em>Where a sacred journey begins.</em>
          </h2>

          <p className="origin-description">
            Nestled in Uttarakhand, Devprayag is known for the
            confluence of the Bhagirathi and Alaknanda rivers,
            which together form the Ganga. Its landscape and
            spiritual traditions inspire everything our brand
            stands for.
          </p>

          <a href="#product" className="button button-outline">
            Explore the collection <ArrowRight size={16} />
          </a>

          <span className="origin-watermark">DEVPRAYAG</span>
        </div>
      </section>

      {/* PRODUCT SECTION */}

      <section
        className="product-section section-pad"
        id="product"
      >
        <div className="product-heading">
          <span className="section-index">
            03 / OUR OFFERING
          </span>

          <p className="eyebrow">A MOMENT OF DEVOTION</p>

          <h2>
            Tradition, held
            <br />
            <em>with reverence.</em>
          </h2>

          <p className="product-intro">
            An offering inspired by the spiritual heritage of
            Devprayag, intended for your sacred rituals and
            moments of prayer.
          </p>
        </div>

        <div className="product-showcase">
          <div className="product-art">
            <div className="product-halo" />

            <div className="product-orbit orbit-one" />

            <div className="product-orbit orbit-two" />

            <img
              className="real-product-image"
              src={imagePaths.product}
              alt="DevGanga Amrit Ganga Jal 250 ml bottle"
              loading="lazy"
            />

            <span className="product-art-caption">
              INSPIRED BY THE SACRED GANGA
            </span>
          </div>

          <div className="product-details">
            <p className="eyebrow">
              THE DEVGANGA COLLECTION
            </p>

            <h3>DevGanga Amrit</h3>

            <p className="product-subtitle">
              Ganga Jal · 250 ml
            </p>

            <span className="gold-rule" />

            <p className="product-description">
              Thoughtfully presented for puja, prayer and
              religious observances. A reminder of the
              spiritual connection between tradition, place
              and devotion.
            </p>

            <div className="product-spec">
              <span>PRODUCT</span>
              <span>Ganga Jal</span>
            </div>

            <div className="product-spec">
              <span>SIZE</span>
              <span>250 ml</span>
            </div>

            <div className="product-spec">
              <span>INTENDED USE</span>
              <span>Religious &amp; ritual use only</span>
            </div>

            <p className="ritual-warning">
              FOR RELIGIOUS &amp; RITUAL USE ONLY — NOT FOR
              DRINKING.
            </p>

            <a href="#contact" className="button button-dark">
              Enquire About Our Product{' '}
              <ArrowRight size={16} />
            </a>

            <p className="availability-note">
              Product availability and pricing to be confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* CLOSING SECTION */}

      <section className="closing-section">
        <div className="closing-pattern" />

        <span className="eyebrow">
          A CONNECTION THAT ENDURES
        </span>

        <h2>
          Bring tradition
          <br />
          <em>closer to home.</em>
        </h2>

        <p>
          Inspired by Devprayag. Created with reverence for
          your sacred rituals.
        </p>

        <a href="#contact" className="button button-gold">
          Connect With Us <ArrowRight size={16} />
        </a>
      </section>

      {/* FOOTER */}

      <footer className="site-footer" id="contact">
        <div className="footer-main">
          <a href="#home" className="brand footer-brand">
            <span className="brand-symbol">
              <img
                className="brand-logo-image"
                src={imagePaths.logo}
                alt="DevGanga Amrit logo"
              />
            </span>

            <span className="brand-copy">
              <strong>DEVGANGA AMRIT</strong>
              <small>THE SPIRIT OF DEVPRAYAG</small>
            </span>
          </a>

          <p className="footer-story">
            A spiritual heritage brand inspired by Devprayag,
            Uttarakhand.
          </p>

          <div className="footer-contact">
            <span className="eyebrow">GET IN TOUCH</span>

            <a href="mailto:devgangaamrit@gmail.com">
              devgangaamrit@gmail.com
            </a>

            <a href="tel:+919643345474">
              +91 96433 45474
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp Enquiry <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} DEVGANGA AMRIT
          </span>

          <span>
            INSPIRED BY DEVPRAYAG, UTTARAKHAND, INDIA
          </span>

          <div
            className="footer-legal-links"
          >
            <a
              href={`${import.meta.env.BASE_URL}?page=privacy-policy`}
            >
              PRIVACY POLICY
            </a>

            <a
              href={`${import.meta.env.BASE_URL}?page=terms`}
            >
              TERMS &amp; CONDITIONS
            </a>
          </div>

          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire about DevGanga Amrit on WhatsApp"
        className="floating-whatsapp"
      >
        <MessageCircle size={22} />

        <span>Enquire on WhatsApp</span>
      </a>
    </main>
  )
}

export default App
