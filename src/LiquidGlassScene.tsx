const initialShape =
  'M 490 36 C 630 132 690 230 568 334 C 445 438 336 514 452 650 C 572 790 646 876 518 964 C 390 1050 260 924 356 790 C 444 666 566 590 468 450 C 368 310 300 202 418 112 Z'

function LiquidGlassScene() {
  return (
    <div className="liquid-glass-scene" aria-hidden="true">
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient id="liquid-material" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c5d9e8" stopOpacity=".24" />
            <stop offset="22%" stopColor="#ffffff" stopOpacity=".46" />
            <stop offset="51%" stopColor="#deebf5" stopOpacity=".2" />
            <stop offset="78%" stopColor="#ffffff" stopOpacity=".42" />
            <stop offset="100%" stopColor="#a8c1d5" stopOpacity=".3" />
          </linearGradient>
          <linearGradient
            id="liquid-reflection"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="42%" stopColor="#ffffff" stopOpacity=".18" />
            <stop offset="52%" stopColor="#ffffff" stopOpacity=".96" />
            <stop offset="63%" stopColor="#e8f5ff" stopOpacity=".32" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="liquid-rim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#91b1ca" stopOpacity=".45" />
            <stop offset="32%" stopColor="#ffffff" stopOpacity=".92" />
            <stop offset="62%" stopColor="#b6cee0" stopOpacity=".64" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity=".9" />
          </linearGradient>
        </defs>
        <g className="liquid-glass-form">
          <path
            className="liquid-glass-body"
            data-liquid-body=""
            d={initialShape}
            fill="url(#liquid-material)"
          />
          <path
            className="liquid-glass-rim"
            data-liquid-body=""
            d={initialShape}
            fill="none"
            stroke="url(#liquid-rim)"
          />
          <path
            className="liquid-glass-highlight"
            data-liquid-highlight=""
            d="M 500 95 C 570 220 450 330 440 450 C 430 590 560 690 520 850"
            fill="none"
            stroke="url(#liquid-reflection)"
          />
        </g>
      </svg>
    </div>
  )
}

export default LiquidGlassScene
