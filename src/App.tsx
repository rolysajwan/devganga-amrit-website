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
  Facebook,
  Flame,
  Flower2,
  Hand,
  Instagram,
  Landmark,
  Menu,
  MessageCircle,
  Mountain,
  ShieldCheck,
  Sparkles,
  Store,
  X,
} from 'lucide-react'
import {
  useActiveSection,
  usePointerInteractions,
  usePointerParallax,
  useReveal,
  useScrollEffects,
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
  logo128: `${base}images/logo-128.png`,
  logo512: `${base}images/logo-512.png`,
  product: `${base}images/product-bottle.webp`,
  product768: `${base}images/product-bottle-768.webp`,
  poster: `${base}images/devganga-amrit-poster.png`,
  aerial: `${base}images/devprayag-aerial.webp`,
  founder: `${base}images/founder-thumb.webp`,
}

const occasions = [
  { label: 'Puja', Icon: Flower2 },
  { label: 'Abhishek', Icon: Droplets },
  { label: 'Havan', Icon: Flame },
  { label: 'Tarpan', Icon: Hand },
  { label: 'Shraddh', Icon: Landmark },
  { label: 'Festivals', Icon: Sparkles },
]

type Marketplace = 'amazon' | 'flipkart' | 'meesho'

// Marketplace names and the existing CTA copy. Official Flipkart / Meesho
// logo files can be supplied via `logoSrc` (e.g. `${base}images/marketplaces/flipkart.svg`).
const marketplaces: { id: Marketplace; name: string; logoSrc?: string }[] = [
  { id: 'amazon', name: 'Amazon' },
  { id: 'flipkart', name: 'Flipkart' },
  { id: 'meesho', name: 'Meesho' },
]

// Amazon "a" glyph — Font Awesome Free (CC BY 4.0), fontawesome.com
function AmazonLogo() {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z" />
    </svg>
  )
}

const highlights = [
  {
    Icon: Droplets,
    title: 'From Devprayag',
    text: 'At the meeting of two sacred rivers',
  },
  {
    Icon: Flower2,
    title: 'For Puja',
    text: 'For your sacred rituals and worship',
  },
  {
    Icon: Mountain,
    title: 'Himalayan Heritage',
    text: 'Rooted in the spiritual landscape of Uttarakhand',
  },
]

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      href="#home"
      className={footer ? 'brand footer-brand' : 'brand'}
      aria-label="DevGanga Amrit home"
    >
      <span className="brand-symbol">
        <img
          src={footer ? img.logo512 : img.logo128}
          width={footer ? 512 : 128}
          height={footer ? 512 : 128}
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

function MarketplaceButtons({ onSelect }: { onSelect: () => void }) {
  return (
    <div
      className="marketplace-buttons"
      role="group"
      aria-label="Marketplace launch updates"
    >
      {marketplaces.map(({ id, name, logoSrc }) => (
        <button
          key={id}
          type="button"
          className={`mp-btn mp-btn--${id}`}
          aria-haspopup="dialog"
          onClick={onSelect}
        >
          <span className="mp-btn__logo" aria-hidden="true">
            {id === 'amazon' ? (
              <AmazonLogo />
            ) : logoSrc ? (
              <img src={logoSrc} alt="" />
            ) : (
              <Store size={20} strokeWidth={1.6} />
            )}
          </span>
          <span className="mp-btn__divider" aria-hidden="true" />
          <span className="mp-btn__label">Buy on {name}</span>
          <span className="mp-btn__arrow" aria-hidden="true">
            <ArrowRight size={15} strokeWidth={2} />
          </span>
        </button>
      ))}
    </div>
  )
}

function ComingSoonDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
  }, [open])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const closeDialog = () => dialogRef.current?.close()

  return (
    <dialog
      ref={dialogRef}
      className="coming-soon-dialog"
      aria-labelledby="coming-soon-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog()
      }}
    >
      <div className="coming-soon-content">
        <button
          className="coming-soon-close"
          type="button"
          aria-label="Close coming soon message"
          onClick={closeDialog}
          autoFocus
        >
          <X size={19} aria-hidden="true" />
        </button>
        <span className="coming-soon-badge">Coming Soon</span>
        <p className="coming-soon-eyebrow">A little something is on its way</p>
        <h2 id="coming-soon-title">A Sacred Journey Is About to Begin.</h2>
        <div className="coming-soon-copy">
          <p>Thank you for your interest in DevGanga Amrit.</p>
          <p>
            We're preparing to bring our sacred offering to this marketplace.
            Our launch is coming soon, and we'd love for you to be part of the
            journey.
          </p>
        </div>
        <p className="coming-soon-closing">
          Stay connected. The wait will be worth it.
        </p>
        <p className="coming-soon-signature">
          With devotion,
          <strong>Team DevGanga Amrit</strong>
        </p>
      </div>
    </dialog>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [marketplaceDialogOpen, setMarketplaceDialogOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const heroRef = useRef<HTMLElement>(null)
  const productRef = useRef<HTMLElement>(null)

  const onScrolled = useCallback((value: boolean) => setScrolled(value), [])

  useReveal()
  useScrollEffects(onScrolled)
  usePointerInteractions()
  useActiveSection(sectionIds, setActive)
  usePointerParallax(heroRef)
  usePointerParallax(productRef)

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
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>

      <a className="skip-link" href="#main">
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
          className={menuOpen ? 'navigation navigation-open' : 'navigation'}
          aria-label="Primary"
        >
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={active === item.id ? 'is-active' : undefined}
              aria-current={active === item.id ? 'true' : undefined}
              style={delay(60 + i * 45)}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}

          <a
            href={`${base}founder/`}
            className="nav-cta"
            style={delay(60 + navItems.length * 45)}
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
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main id="main">
        {/* HERO */}

        <section className="hero" id="home" ref={heroRef} data-parallax>
          <div className="hero-glow" aria-hidden="true" />

          <div className="wrap hero-inner">
            <div className="hero-copy">
              <p className="eyebrow rise" style={delay(80)}>
                Inspired by the sacred confluence
              </p>

              <h1>
                <span className="rise" style={delay(160)}>
                  DEVGANGA
                </span>
                <span className="rise" style={delay(260)}>
                  AMRIT
                </span>
              </h1>

              <p className="hero-subtitle rise" style={delay(380)}>
                A sacred connection to Devprayag
              </p>
              <p className="hero-description rise" style={delay(450)}>
                Inspired by the confluence of the Alaknanda and Bhagirathi, for
                your puja and sacred rituals.
              </p>

              <div className="hero-actions rise" style={delay(540)}>
                <a href="#devprayag" className="btn btn-primary">
                  Explore the Origin <ArrowRight size={17} />
                </a>
                <a href="#story" className="btn btn-glass">
                  Our Story
                </a>
              </div>

              <p className="hero-note rise" style={delay(640)}>
                A heritage that flows through generations
                <span aria-hidden="true"> · </span>
                Rooted in heritage
              </p>
            </div>

            <div className="hero-stage rise-stage" style={delay(200)}>
              <div className="stage-tilt">
                <div className="stage-frame">
                  <img
                    className="stage-img"
                    src={img.aerial}
                    width={864}
                    height={1536}
                    alt="Aerial view of Devprayag, where the Bhagirathi and Alaknanda rivers meet to form the Ganga"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                  <div className="stage-wash" aria-hidden="true" />

                  <div className="glass stage-panel" aria-label="Brand highlights">
                    {highlights.map(({ Icon, title, text }) => (
                      <div className="stage-row" key={title}>
                        <span className="stage-icon" aria-hidden="true">
                          <Icon size={19} strokeWidth={1.5} />
                        </span>
                        <span>
                          <strong>{title}</strong>
                          <small>{text}</small>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass stage-coords" aria-hidden="true">
                  <span>
                    30°08&apos; N <i /> 78°35&apos; E
                  </span>
                  <small>DEVPRAYAG · UTTARAKHAND</small>
                </div>

                <div className="glass stage-badge" aria-hidden="true">
                  <img src={img.logo512} width={512} height={512} alt="" />
                </div>
              </div>
            </div>
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

        <section className="story section" id="story">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <span className="section-index">01 / Our philosophy</span>
            </div>

            <div className="story-grid">
              <div data-reveal style={delay(60)}>
                <p className="eyebrow">More than a place. A feeling.</p>
                <h2>
                  A sacred tradition,
                  <br />
                  <em>carried with care.</em>
                </h2>
              </div>

              <div className="story-copy" data-reveal style={delay(160)}>
                <p>
                  Some places are more than destinations. They hold memories,
                  traditions and a sense of belonging that travels across
                  generations.
                </p>
                <p>
                  DevGanga Amrit draws inspiration from Devprayag, the revered
                  Himalayan confluence, bringing the spirit of this heritage
                  into your moments of prayer and devotion.
                </p>
                <a className="link-arrow" href="#devprayag">
                  The story of our origin <ArrowRight size={16} />
                </a>
              </div>
            </div>

            <ul className="values" aria-label="Brand values">
              <li data-reveal>
                <Mountain size={26} strokeWidth={1.25} aria-hidden="true" />
                <h3>Himalayan Roots</h3>
                <p>Inspired by the land of Devprayag.</p>
              </li>
              <li data-reveal style={delay(100)}>
                <Sparkles size={26} strokeWidth={1.25} aria-hidden="true" />
                <h3>Living Heritage</h3>
                <p>Honouring traditions of devotion.</p>
              </li>
              <li data-reveal style={delay(200)}>
                <ShieldCheck size={26} strokeWidth={1.25} aria-hidden="true" />
                <h3>Thoughtful Purpose</h3>
                <p>Created for religious and ritual use.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* ABOUT */}

        <section className="about section section-tint" id="about">
          <div className="wrap about-grid">
            <div data-reveal>
              <span className="section-index">About DEVGANGA AMRIT</span>
              <h2>
                Rooted in faith.
                <br />
                <em>Inspired by Devprayag.</em>
              </h2>
              <p className="lede">
                DEVGANGA AMRIT is a spiritual heritage brand inspired by the
                sacred traditions and natural beauty of Devprayag,
                Uttarakhand. Our purpose is to bring an expression of this
                heritage into homes and places of worship through products
                intended for religious and ritual use.
              </p>
            </div>

            <aside className="glass founder-card" data-reveal style={delay(140)}>
              <img
                className="founder-avatar"
                src={img.founder}
                width={320}
                height={320}
                alt="Rahul Sajwan, founder of DevGanga Amrit"
                loading="lazy"
                decoding="async"
              />
              <span className="eyebrow">The person behind the vision</span>
              <h3>Meet Rahul Sajwan</h3>
              <p>Founder of DevGanga Amrit</p>
              <a
                href={`${base}founder/`}
                className="btn btn-primary"
                aria-label="Meet Rahul Sajwan, founder of DevGanga Amrit"
              >
                Meet the Founder <ArrowRight size={16} />
              </a>
            </aside>
          </div>
        </section>

        {/* DEVPRAYAG */}

        <section className="origin section" id="devprayag">
          <div className="wrap origin-grid">
            <div className="origin-figure" data-reveal>
              <div className="origin-frame" data-parallax>
                <img
                  className="origin-img"
                  src={img.aerial}
                  width={864}
                  height={1536}
                  alt="Aerial view of Devprayag, where the Bhagirathi and Alaknanda rivers meet to form the Ganga"
                  loading="lazy"
                  decoding="async"
                />
                <div className="glass origin-chip">
                  <small>The confluence</small>
                  <strong>Bhagirathi &amp; Alaknanda</strong>
                </div>
              </div>
            </div>

            <div className="origin-copy" data-reveal style={delay(120)}>
              <span className="section-index">02 / Our origin</span>
              <p className="eyebrow">In the heart of the Himalayas</p>
              <h2>
                Devprayag.
                <br />
                <em>Where a sacred journey begins.</em>
              </h2>
              <p className="lede">
                Nestled in Uttarakhand, Devprayag is known for the confluence
                of the Bhagirathi and Alaknanda rivers, which together form
                the Ganga. Its landscape and spiritual traditions inspire
                everything our brand stands for.
              </p>
              <a href="#product" className="btn btn-glass">
                Explore the collection <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* PRODUCT */}

        <section
          className="product section section-tint"
          id="product"
          ref={productRef}
        >
          <div className="wrap">
            <div className="product-heading" data-reveal>
              <span className="section-index">03 / Our offering</span>
              <p className="eyebrow">A moment of devotion</p>
              <h2>
                Tradition, held
                <br />
                <em>with reverence.</em>
              </h2>
              <p className="lede">
                An offering inspired by the spiritual heritage of Devprayag,
                intended for your sacred rituals and moments of prayer.
              </p>
            </div>

            <div className="product-stage">
              <figure className="product-frame" data-reveal>
                <img
                  src={img.product768}
                  srcSet={`${img.product768} 768w, ${img.product} 1024w`}
                  sizes="(max-width: 900px) 86vw, 460px"
                  width={1024}
                  height={1535}
                  alt="DEVGANGA AMRIT 250 ml Ganga Jal bottle concept visual, shown against the Devprayag river landscape"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="glass product-caption">
                  <small>Concept visual</small>
                  <strong>Inspired by the sacred Ganga</strong>
                </figcaption>
              </figure>

              <div
                className="glass product-details"
                data-reveal
                style={delay(120)}
              >
                <p className="eyebrow">The DevGanga collection</p>
                <h3>DevGanga Amrit</h3>
                <p className="product-subtitle">Ganga Jal · 250 ml</p>

                <p className="product-description">
                  Thoughtfully presented for puja, prayer and religious
                  observances. A reminder of the spiritual connection between
                  tradition, place and devotion.
                </p>

                <dl className="specs">
                  <div>
                    <dt>Product</dt>
                    <dd>Ganga Jal</dd>
                  </div>
                  <div>
                    <dt>Size</dt>
                    <dd>250 ml</dd>
                  </div>
                  <div>
                    <dt>Intended use</dt>
                    <dd>Religious &amp; ritual use only</dd>
                  </div>
                </dl>

                <p className="ritual-warning">
                  For religious &amp; ritual use only — not for drinking.
                </p>

                <a href="#contact" className="btn btn-primary">
                  Enquire About Our Product <ArrowRight size={16} />
                </a>

                <p className="availability-note">
                  Visual concept only. Product availability and pricing are not
                  confirmed.
                </p>
                <div className="marketplace-launch">
                  <p className="eyebrow">Our marketplace launch</p>
                  <p className="marketplace-note">
                    We are not listed yet. Choose a marketplace to hear about
                    our upcoming launch.
                  </p>
                  <MarketplaceButtons
                    onSelect={() => setMarketplaceDialogOpen(true)}
                  />
                </div>
              </div>
            </div>

            <figure className="brand-poster" data-reveal>
              <img
                src={img.poster}
                width={1024}
                height={1536}
                alt="DEVGANGA AMRIT brand poster"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <ul className="occasions" data-reveal aria-label="Observances">
              {occasions.map(({ label, Icon }) => (
                <li key={label}>
                  <Icon size={22} strokeWidth={1.3} aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CLOSING */}

        <section className="closing section">
          <div className="wrap closing-inner" data-reveal>
            <p className="eyebrow">A connection that endures</p>
            <h2>
              Bring tradition
              <br />
              <em>closer to home.</em>
            </h2>
            <p className="lede">
              Inspired by Devprayag. Created with reverence for your sacred
              rituals.
            </p>
            <a href="#contact" className="btn btn-primary">
              Connect With Us <ArrowRight size={16} />
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}

      <footer className="site-footer" id="contact">
        <div className="wrap">
          <div className="footer-main">
            <div className="footer-brandblock">
              <Brand footer />
              <p className="footer-story">
                A spiritual heritage brand inspired by Devprayag, Uttarakhand.
              </p>
            </div>

            <nav className="footer-col" aria-label="Footer">
              <span className="eyebrow">Explore</span>
              {navItems.slice(1, 5).map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="footer-col">
              <span className="eyebrow">Get in touch</span>
              <a href="mailto:devgangaamrit@gmail.com">
                devgangaamrit@gmail.com
              </a>
              <a href="tel:+919643345474">+91 96433 45474</a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Enquiry <ArrowRight size={14} />
              </a>
            </div>

            <nav className="footer-col footer-social" aria-label="Social media">
              <span className="eyebrow">Follow us</span>
              <a
                href="https://www.instagram.com/devgangaamrit/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow DEVGANGA AMRIT on Instagram (@devgangaamrit)"
              >
                <Instagram size={18} strokeWidth={1.7} aria-hidden="true" />
                <span>@devgangaamrit</span>
              </a>
              <a
                href="https://www.facebook.com/devgangaamrit/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow DEVGANGA AMRIT on Facebook (@devgangaamrit)"
              >
                <Facebook size={18} strokeWidth={1.7} aria-hidden="true" />
                <span>@devgangaamrit</span>
              </a>
            </nav>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} DEVGANGA AMRIT</span>
            <span>Inspired by Devprayag, Uttarakhand, India</span>
            <div className="footer-legal-links">
              <a href={`${base}?page=privacy-policy`}>Privacy Policy</a>
              <a href={`${base}?page=terms`}>Terms &amp; Conditions</a>
            </div>
            <a href="#home">Back to top ↑</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire about DevGanga Amrit on WhatsApp"
        className="glass floating-whatsapp"
      >
        <MessageCircle size={21} />
        <span>Enquire on WhatsApp</span>
      </a>

      <ComingSoonDialog
        open={marketplaceDialogOpen}
        onClose={() => setMarketplaceDialogOpen(false)}
      />
    </>
  )
}

export default App
