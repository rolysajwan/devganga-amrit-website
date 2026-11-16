import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Menu,
  Mountain,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

const BASE = import.meta.env.BASE_URL

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Devprayag', href: '#devprayag' },
  { label: 'Our Product', href: '#product' },
  { label: 'Contact', href: '#contact' },
]

function BrandLogo() {
  return (
    <span className="brand-symbol">
      <img
        src={`${BASE}images/logo.png`}
        alt="DevGanga Amrit Logo"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </span>
  )
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
          <BrandLogo />

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
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* HERO SECTION */}

      <section className="hero" id="home">
        <div className="hero-image" aria-hidden="true" />
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
              memories, traditions and a sense of belonging that
              travels across generations.
            </p>

            <p>
              DevGanga Amrit draws inspiration from Devprayag,
              the revered Himalayan confluence, bringing the
              spirit of this heritage into your moments of prayer
              and devotion.
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

      {/* DEVPRAyAG ORIGIN */}

      <section className="origin-section" id="devprayag">
        <div className="origin-image" />

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

          <span className="origin-watermark">
            DEVPRAYAG
          </span>
        </div>
      </section>

      {/* ORIGINAL BRAND POSTER SHOWCASE */}

      <section
        className="brand-showcase"
        id="brand-showcase"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          alignItems: 'center',
          gap: 'clamp(28px, 5vw, 70px)',
          padding: 'clamp(48px, 8vw, 100px) clamp(20px, 7vw, 100px)',
          background: '#f5f0e5',
          color: '#173c30',
        }}
      >
        <div
          className="brand-showcase-content"
          style={{ maxWidth: '520px' }}
        >
          <span className="eyebrow">
            THE ESSENCE OF DEVPRAyAG
          </span>

          <h2
            style={{
              margin: '24px 0',
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.08,
            }}
          >
            Two rivers.
            <br />
            <em style={{ color: '#a17b39' }}>
              One divine flow.
            </em>
          </h2>

          <p style={{ lineHeight: 1.9, marginBottom: '28px' }}>
            Inspired by the sacred confluence of Alaknanda
            and Bhagirathi, DevGanga Amrit brings the spiritual
            heritage of Devprayag closer to your moments of
            prayer and devotion.
          </p>

          <a href="#product" className="button button-dark">
            Discover Our Product <ArrowRight size={16} />
          </a>
        </div>

        <div
          className="brand-showcase-image"
          style={{
            width: '100%',
            overflow: 'hidden',
            border: '1px solid rgba(161, 123, 57, 0.35)',
            background: '#fffdf7',
          }}
        >
          <img
            src={`${BASE}images/devganga-amrit-poster.jpg`}
            alt="DevGanga Amrit brand poster featuring Devprayag and the product bottle"
            loading="lazy"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </div>
      </section>

      {/* OUR PRODUCT */}

      <section
        className="product-section section-pad"
        id="product"
      >
        <div className="product-heading">
          <span className="section-index">
            03 / OUR OFFERING
          </span>

          <p className="eyebrow">
            A MOMENT OF DEVOTION
          </p>

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
          {/* ORIGINAL PRODUCT BOTTLE */}

          <div
            className="product-art product-art-real"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              padding: '20px',
              minWidth: 0,
            }}
          >
            <div className="product-halo" />

            <img
              src={`${BASE}images/product-bottle.png`}
              alt="DevGanga Amrit 250 ml Ganga Jal bottle with green and gold label"
              className="product-bottle-image"
              loading="lazy"
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'block',
                width: '100%',
                maxWidth: '420px',
                height: 'auto',
                maxHeight: '680px',
                objectFit: 'contain',
              }}
            />

            <span
              className="product-art-caption"
              style={{
                textAlign: 'center',
                letterSpacing: '2px',
                fontSize: '11px',
              }}
            >
              INSPIRED BY THE SACRED GANGA
            </span>
          </div>

          {/* PRODUCT DETAILS */}

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
              religious observances. A reminder of the spiritual
              connection between tradition, place and devotion.
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
              Enquire About Our Product <ArrowRight size={16} />
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
          Inspired by Devprayag. Created with reverence for your
          sacred rituals.
        </p>

        <a href="#contact" className="button button-gold">
          Connect With Us <ArrowRight size={16} />
        </a>
      </section>

      {/* FOOTER */}

      <footer className="site-footer" id="contact">
        <div className="footer-main">
          <a
            href="#home"
            className="brand footer-brand"
            aria-label="DevGanga Amrit home"
          >
            <BrandLogo />

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
            <span className="eyebrow">
              GET IN TOUCH
            </span>

            <a href="mailto:devgangaamrit@gmail.com">
              devgangaamrit@gmail.com
            </a>

            <a href="tel:+919643345474">
              +91 96433 45474
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

          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  )
}

export default App
