import { useRef, useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import heroImgMobile from './assets/hero-mobile.png'

// Custom hook to detect when element comes into view
function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
      }
    }, {
      threshold: 0.1,
      ...options,
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isInView
}

function Section({ heading, text, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref)
  const isLeft = index % 2 === 0

  return (
    <section
      ref={ref}
      className={`w-full py-8 sm:py-12 transition-all duration-[2000ms] flex ${
        isLeft ? 'justify-start -mr-0 sm:-mr-4 md:-mr-8 lg:-mr-32' : 'justify-end -ml-0 sm:-ml-4 md:-ml-8 lg:-ml-32'
      } px-4 sm:px-6 md:px-12 lg:px-20 ${
        isInView
          ? 'opacity-100 translate-x-0'
          : isLeft
            ? 'opacity-0 translate-x-[60px] sm:translate-x-[150px] md:translate-x-[250px] lg:translate-x-[400px]'
            : 'opacity-0 -translate-x-[60px] sm:-translate-x-[150px] md:-translate-x-[250px] lg:-translate-x-[400px]'
      }`}
    >
      <div className={`w-full max-w-xs sm:max-w-sm md:max-w-xl lg:max-w-2xl ${isLeft ? 'ml-0 sm:ml-2 md:ml-8 lg:ml-16' : ''}`}>
        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-brand-accent mb-4 sm:mb-6 leading-tight">
          {heading}
        </h2>
        <p className="font-body text-brand-primary leading-relaxed text-base sm:text-lg">
          {text}
        </p>
      </div>
    </section>
  )
}

function Divider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.5 })

  return (
    <div
      ref={ref}
      className={`max-w-4xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 transition-all duration-[2000ms] ${
        isInView ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
      } origin-center`}
      style={{
        transformOrigin: 'center',
      }}
    >
      <hr className="border-brand-accent opacity-30" />
    </div>
  )
}

export default function App() {
  const heroRef = useRef(null)

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">

      {/* Hero */}
      <header ref={heroRef} className="flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-20 pt-8 sm:pt-12 md:pt-16 pb-0">
        <picture>
          <source media="(max-width: 768px)" srcSet={heroImgMobile} />
          <img
            src={heroImg}
            alt="LoveLabs – Incentivizing love on the internet"
            className="w-full max-w-5xl"
          />
        </picture>
      </header>

      <Divider />

      {/* Section 1 — Left */}
      <Section
        heading="The Internet Deserves Better"
        text="We are LoveLabs — a company built on the belief that the internet can be a more loving place. The era of extractive, hate-driven platforms is ending, and we are here to build what comes next. We create digital products and solutions that actively incentivize love, empathy, and genuine human connection."
        index={0}
      />

      <Divider />

      {/* Section 2 — Right */}
      <Section
        heading="Love as Infrastructure"
        text="Our mission is to build digital products that incentivize love on the internet. We envision a global online space powered by empathy — and we believe this moment demands exactly that. People are ready to leave behind platforms built on outrage, and our goal is to be the alternative they are looking for."
        index={1}
      />

      <Divider />

      {/* Section 3 — Left */}
      <Section
        heading="Products With Purpose"
        text="LoveLabs is a product company with a clear direction: every solution we ship is designed to bring people together in loving, safe, and global communities. We build at the intersection of technology, Web3, and community — creating products that reward positive engagement rather than exploit human attention. Our work is guided by one question: does this make the internet a little more loving?"
        index={2}
      />

      <Divider />

      {/* Section 4 — Right */}
      <Section
        heading="Built by People Who Care"
        text="Behind LoveLabs stands a team of industry-leading professionals united by a shared belief in what the internet can become. Our core team combines deep expertise in technology architecture, marketing, Web3, and community building. We show up directly — no outsourced management, no intermediaries — because we believe that integrity starts from within."
        index={3}
      />

      {/* Spacer to push footer down if content is short */}
      <div className="flex-1" />

      {/* Footer */}
      <footer className="bg-brand-accent text-white py-8 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <p className="font-heading text-lg tracking-wide mb-3">LoveLabs AB</p>
              <p className="font-body text-sm opacity-90 leading-relaxed">
                Rosenlundsgatan 50<br />
                118 63 Stockholm, Sweden
              </p>
            </div>

            {/* Contact & Legal */}
            <div>
              <p className="font-heading text-sm tracking-wide mb-3 opacity-80">CONTACT</p>
              <p className="font-body text-sm opacity-90">
                info@vibz.world
              </p>
            </div>

            {/* Registry Info */}
            <div>
              <p className="font-heading text-sm tracking-wide mb-3 opacity-80">REGISTRY</p>
              <div className="font-body text-sm opacity-90 space-y-1">
                <p>Org.nr: 559518-8078</p>
                <p>VAT: SE559518807801</p>
                <p>D-U-N-S: 351420767</p>
                <p>LEI: 63670073KLKEEYFE1D19</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white border-opacity-20 pt-6">
            <p className="font-body text-sm opacity-80">
              © {new Date().getFullYear()} LoveLabs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  )
}
