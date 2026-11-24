import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import {
  ArrowRight,
  Droplets,
  Flame,
  Flower2,
  Hand,
  Landmark,
  Menu,
  MessageCircle,
  Mountain,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import GoldDust from './GoldDust'
import {
  useActiveSection,
  usePointerParallax,
  useReveal,
  useScrollEffects,
  useTilt,
} from './effects'

const base = import.meta.env.BASE_URL
const navItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Our Story', href: '#story', id: 'story' },
  { label: 'Devprayag', href: '#devprayag', id: 'devprayag' },
  { label: 'The Product', href: '#product', id: 'product' },
  { label: 'Founder', href: `${base}founder/`, id: '' },
]
const sectionIds = navItems.filter((item) => item.id).map((item) => item.id)

const whatsappLink =
  'https://wa.me/919643345474?text=Hello%2C%20DEVGANGA%20AMRIT%20Team!%20I%20would%20like%20to%20know%20more%20about%20your%20Ganga%20Jal%20product.'

const img = {
  logo: `${base}images/logo-512.png`,
  product: `${base}images/product-bottle.webp`,
  product768: `${base}images/product-bottle-768.webp`,
  aerial: `${base}images/devprayag-aerial.webp`,
}

const occasions = [
  { label: 'Puja', Icon: Flower2 },
  { label: 'Abhishek', Icon: Droplets },
  { label: 'Havan', Icon: Flame },
  { label: 'Tarpan', Icon: Hand },
  { label: 'Shraddh', Icon: Landmark },
  { label: 'Festivals', Icon: Sparkles },
]

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

function BottleImage({ eager = false }: { eager?: boolean }) {
  return (
    <img
      src={img.product768}
      srcSet={`${img.product768} 768w, ${img.product} 1024w`}
      sizes="(max-width: 900px) 72vw, 420px"
      width={1024}
      height={1535}
      alt="DEVGANGA AMRIT 250 ml Ganga Jal bottle concept visual, shown against the Devprayag river landscape"
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...(eager ? { fetchPriority: 'high' as const } : {})}
    />
  )
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={footer ? 'brand footer-brand' : 'brand'}
      aria-label="DevGanga Amrit home"
    >
      <span className="brand-symbol">
        <img
          className="brand-logo-image"
          src={img.logo}
          width={512}
          height={512}
          alt="DevGanga Amrit logo"
        />
      </span>
      <span className="brand-copy">
        <strong>DEVGANGA AMRIT</strong>
        <small>THE SPIRIT OF DEVPRAYAG</small>
      </span>
    </a>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const heroRef = useRef<HTMLElement>(null)

  const onScrolled = useCallback((value: boolean) => setScrolled(value), [])

  useReveal()
  useTilt()
  useScrollEffects(onScrolled)
  useActiveSection(sectionIds, setActive)
  usePointerParallax(heroRef)

  // Lock page scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#story">
        Skip to content
      </a>

      {/* HEADER */}

      <header
        className={`site-header${scrolled ? ' is-scrolled' : ''}${
          menuOpen ? ' is-open' : ''
        }`}
      >
        <Brand />

        <nav
          id="site-navigation"
          className={
            menuOpen ? 'navigation navigation-open' : 'navigation'
          }
          aria-label="Primary"
        >
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={active === item.id ? 'is-active' : undefined}
              aria-current={active === item.id ? 'true' : undefined}
              style={delay(80 + i * 55)}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}

          <a
            href={`${base}founder/`}
            className="nav-cta"
            style={delay(80 + navItems.length * 55)}
            onClick={closeMenu}
          >
            Meet the Founder <ArrowRight size={15} />
          </a>
        </nav>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="main">
        {/* HERO */}

        <section className="hero" id="home" ref={heroRef}>
          <div className="hero-bg" aria-hidden="true">
            <div
              className="hero-aerial"
              style={{ backgroundImage: `url("${img.aerial}")` }}
            />
            <div className="hero-fog fog-a" />
            <div className="hero-fog fog-b" />
            <div className="hero-beams">
              <i />
              <i />
              <i />
            </div>
            <div className="hero-vignette" />
          </div>

          <GoldDust />

          <div className="hero-inner">
            <div className="hero-content">
              <div className="eyebrow hero-eyebrow">
                <span className="eyebrow-line" />
                INSPIRED BY THE SACRED CONFLUENCE
                <span className="eyebrow-line" />
              </div>

              <h1>
                <span className="line">
                  <span>DEVGANGA AMRIT</span>
                </span>
              </h1>

              <p className="hero-subtitle">A sacred connection to Devprayag</p>
              <p className="hero-description">
                Inspired by the confluence of the Alaknanda and Bhagirathi,
                for your puja and sacred rituals.
              </p>

              <div className="hero-actions">
                <a href="#devprayag" className="button button-gold">
                  Explore the Origin <ArrowRight size={17} />
                </a>
              </div>
            </div>

            <div className="hero-feature-glass" aria-label="Brand highlights">
              <article className="hero-glass-tile">
                <span className="hero-tile-icon"><Droplets size={26} strokeWidth={1.35} /></span>
                <strong>From Devprayag</strong>
                <small>At the meeting of two sacred rivers</small>
              </article>
              <article className="hero-glass-tile">
                <span className="hero-tile-icon"><Flower2 size={27} strokeWidth={1.35} /></span>
                <strong>For Puja</strong>
                <small>For your sacred rituals and worship</small>
              </article>
              <article className="hero-glass-tile">
                <span className="hero-tile-icon"><Mountain size={27} strokeWidth={1.35} /></span>
                <strong>Himalayan Heritage</strong>
                <small>Rooted in the spiritual landscape of Uttarakhand</small>
              </article>
            </div>

            <div className="hero-stage">
              <div className="stage-halo" aria-hidden="true" />
              <div className="stage-ring" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>

              <div className="stage-float">
                <div className="stage-tilt">
                  <div className="arch-outline" aria-hidden="true" />

                  <figure className="bottle-card">
                    <BottleImage eager />
                    <span className="card-sheen" aria-hidden="true" />
                  </figure>

                  <div className="bottle-reflection" aria-hidden="true">
                    <img src={img.product768} alt="" decoding="async" />
                  </div>

                  <div className="chip chip-a" aria-hidden="true">
                    <small>SIZE</small>
                    <strong>250 ml</strong>
                  </div>
                  <div className="chip chip-b" aria-hidden="true">
                    <small>STATUS</small>
                    <strong>Concept visual</strong>
                  </div>
                </div>
              </div>

              <div className="stage-shadow" aria-hidden="true" />
            </div>
          </div>

          <div className="hero-caption">
            <span>30°08&apos; N</span>
            <span className="caption-divider" />
            <span>78°35&apos; E</span>
            <span className="caption-place">DEVPRAYAG · UTTARAKHAND</span>
          </div>

          <div className="hero-side-note">
            A HERITAGE THAT FLOWS THROUGH GENERATIONS
          </div>

          <div className="hero-ribbon" aria-hidden="true">
            <span>A SACRED CONNECTION TO DEVPRAYAG</span>
            <span className="announcement-dot">✦</span>
            <span>ROOTED IN HERITAGE</span>
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
          <div className="intro-label" data-reveal>
            <span className="section-index">01 / OUR PHILOSOPHY</span>
            <span className="gold-rule" />
          </div>

          <div className="intro-grid">
            <div data-reveal style={delay(60)}>
              <p className="eyebrow">MORE THAN A PLACE. A FEELING.</p>
              <h2>
                A sacred tradition,
                <br />
                <em>carried with care.</em>
              </h2>
            </div>

            <div className="intro-copy" data-reveal style={delay(160)}>
              <p>
                Some places are more than destinations. They hold memories,
                traditions and a sense of belonging that travels across
                generations.
              </p>
              <p>
                DevGanga Amrit draws inspiration from Devprayag, the revered
                Himalayan confluence, bringing the spirit of this heritage into
                your moments of prayer and devotion.
              </p>
              <a className="underlined-link" href="#devprayag">
                The story of our origin <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="values-row">
            <article className="value-item" data-tilt data-reveal>
              <Mountain size={26} strokeWidth={1.25} />
              <div>
                <h3>Himalayan Roots</h3>
                <p>Inspired by the land of Devprayag.</p>
              </div>
            </article>

            <article
              className="value-item"
              data-tilt
              data-reveal
              style={delay(110)}
            >
              <Sparkles size={26} strokeWidth={1.25} />
              <div>
                <h3>Living Heritage</h3>
                <p>Honouring traditions of devotion.</p>
              </div>
            </article>

            <article
              className="value-item"
              data-tilt
              data-reveal
              style={delay(220)}
            >
              <ShieldCheck size={26} strokeWidth={1.25} />
              <div>
                <h3>Thoughtful Purpose</h3>
                <p>Created for religious and ritual use.</p>
              </div>
            </article>
          </div>
        </section>

        {/* ABOUT */}

        <section className="about-section section-pad" id="about">
          <div className="about-glow" aria-hidden="true" />

          <div className="about-grid">
            <div data-reveal>
              <span className="section-index">ABOUT DEVGANGA AMRIT</span>
              <span className="gold-rule" />

              <h2>
                Rooted in faith.
                <br />
                <em>Inspired by Devprayag.</em>
              </h2>

              <p className="about-copy">
                DEVGANGA AMRIT is a spiritual heritage brand inspired by the
                sacred traditions and natural beauty of Devprayag, Uttarakhand.
                Our purpose is to bring an expression of this heritage into
                homes and places of worship through products intended for
                religious and ritual use.
              </p>
            </div>

            <div
              className="founder-intro"
              data-tilt
              data-reveal
              style={delay(140)}
            >
              <span className="eyebrow">THE PERSON BEHIND THE VISION</span>
              <h3>Meet Rahul Sajwan</h3>
              <p>Founder of DevGanga Amrit</p>
              <a
                href={`${base}founder/`}
                className="button button-gold founder-button"
                aria-label="Meet Rahul Sajwan, founder of DevGanga Amrit"
              >
                Meet the Founder <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* DEVPRAYAG */}

        <section className="origin-section" id="devprayag" data-parallax>
          <div
            className="origin-image"
            role="img"
            aria-label="Aerial view of Devprayag, where the Bhagirathi and Alaknanda rivers meet to form the Ganga"
            style={{ backgroundImage: `url("${img.aerial}")` }}
          />
          <div className="origin-shade" aria-hidden="true" />

          <span className="origin-watermark" aria-hidden="true">
            DEVPRAYAG
          </span>

          <div className="origin-content" data-reveal>
            <span className="section-index">02 / OUR ORIGIN</span>
            <span className="gold-rule" />
            <p className="eyebrow">IN THE HEART OF THE HIMALAYAS</p>

            <h2>
              Devprayag.
              <br />
              <em>Where a sacred journey begins.</em>
            </h2>

            <p className="origin-description">
              Nestled in Uttarakhand, Devprayag is known for the confluence of
              the Bhagirathi and Alaknanda rivers, which together form the
              Ganga. Its landscape and spiritual traditions inspire everything
              our brand stands for.
            </p>

            <a href="#product" className="button button-outline">
              Explore the collection <ArrowRight size={16} />
            </a>
          </div>
        </section>

        {/* PRODUCT */}

        <section className="product-section section-pad" id="product">
          <div className="product-heading" data-reveal>
            <span className="section-index">03 / OUR OFFERING</span>
            <p className="eyebrow">A MOMENT OF DEVOTION</p>
            <h2>
              Tradition, held
              <br />
              <em>with reverence.</em>
            </h2>
            <p className="product-intro">
              An offering inspired by the spiritual heritage of Devprayag,
              intended for your sacred rituals and moments of prayer.
            </p>
          </div>

          <div className="product-showcase">
            <div className="product-art">
              <GoldDust density={0.5} />
              <div className="spot-cone" aria-hidden="true" />
              <div className="product-halo" aria-hidden="true" />
              <div className="product-orbit orbit-one" aria-hidden="true" />
              <div className="product-orbit orbit-two" aria-hidden="true" />

              <div className="product-pedestal" aria-hidden="true" />

              <figure className="product-card" data-tilt data-reveal>
                <BottleImage />
                <span className="card-sheen" aria-hidden="true" />
              </figure>

              <span className="product-art-caption">
                INSPIRED BY THE SACRED GANGA
              </span>
            </div>

            <div
              className="product-details"
              data-reveal
              style={delay(120)}
            >
              <p className="eyebrow">THE DEVGANGA COLLECTION</p>
              <h3>DevGanga Amrit</h3>
              <p className="product-subtitle">Ganga Jal · 250 ml</p>
              <span className="gold-rule" />

              <p className="product-description">
                Thoughtfully presented for puja, prayer and religious
                observances. A reminder of the spiritual connection between
                tradition, place and devotion.
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
                FOR RELIGIOUS &amp; RITUAL USE ONLY — NOT FOR DRINKING.
              </p>

              <a href="#contact" className="button button-gold">
                Enquire About Our Product <ArrowRight size={16} />
              </a>

              <p className="availability-note">
                Visual concept only. Product availability and pricing are not confirmed.
              </p>
            </div>
          </div>

          <ul className="occasions" data-reveal aria-label="Observances">
            {occasions.map(({ label, Icon }) => (
              <li key={label}>
                <Icon size={22} strokeWidth={1.2} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CLOSING */}

        <section className="closing-section">
          <div className="closing-pattern" aria-hidden="true" />

          <div data-reveal>
            <span className="eyebrow">A CONNECTION THAT ENDURES</span>
            <h2>
              Bring tradition
              <br />
              <em>closer to home.</em>
            </h2>
            <p>
              Inspired by Devprayag. Created with reverence for your sacred
              rituals.
            </p>
            <a href="#contact" className="button button-dark">
              Connect With Us <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="site-footer" id="contact">
        <div className="footer-main">
          <div className="footer-brandblock">
            <Brand footer />
            <p className="footer-story">
              A spiritual heritage brand inspired by Devprayag, Uttarakhand.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <span className="eyebrow">EXPLORE</span>
            {navItems.slice(1, 5).map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="footer-contact">
            <span className="eyebrow">GET IN TOUCH</span>
            <a href="mailto:devgangaamrit@gmail.com">
              devgangaamrit@gmail.com
            </a>
            <a href="tel:+919643345474">+91 96433 45474</a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              WhatsApp Enquiry <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DEVGANGA AMRIT</span>
          <span>INSPIRED BY DEVPRAYAG, UTTARAKHAND, INDIA</span>

          <div className="footer-legal-links">
            <a href={`${base}?page=privacy-policy`}>PRIVACY POLICY</a>
            <a href={`${base}?page=terms`}>TERMS &amp; CONDITIONS</a>
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
    </>
  )
}

export default App
