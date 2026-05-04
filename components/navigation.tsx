'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Menu, X, Calendar, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { portfolioData } from '@/lib/data'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Détecte le scroll pour l'effet de bordure/flou conditionnel
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20)
  })

  // Ferme le menu mobile au scroll
  useEffect(() => {
    if (!isOpen) return
    const handleScroll = () => setIsOpen(false)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  // Verrouille le scroll body quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Intersection Observer pour la section active
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const navItems = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.19, 1, 0.22, 1], // ease-out-expo
          delay: 0.1,
        }}
        className={`
          fixed top-0 inset-x-0 z-50
          transition-all duration-300 ease-out-expo
          ${isScrolled
            ? 'bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm'
            : 'bg-transparent backdrop-blur-0 border-b border-transparent'
          }
        `}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo avec animation au hover */}
            <Link
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#hero')
              }}
              className="group relative"
            >
              <span className="text-xl font-bold text-primary transition-colors duration-200 group-hover:text-primary-hover">
                PORTFOLIO
              </span>
              <motion.span
                layoutId="nav-active-dot"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full origin-left"
                initial={false}
                animate={{
                  scaleX: activeSection === 'hero' ? 1 : 0,
                  opacity: activeSection === 'hero' ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '')
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }}
                    className="relative px-4 py-2"
                  >
                    <span
                      className={`
                        text-sm font-medium transition-colors duration-200
                        ${isActive ? 'text-primary' : 'text-foreground-soft hover:text-foreground'}
                      `}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden md:block">
              <motion.a
                href={portfolioData.personal.calendly}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  group relative inline-flex items-center gap-2
                  bg-primary text-primary-foreground
                  px-5 py-2.5 rounded-lg font-medium text-sm
                  shadow-sm shadow-primary/20
                  hover:shadow-md hover:shadow-primary/25
                  transition-shadow duration-300
                  overflow-hidden
                "
              >
                {/* Effet de brillance au hover */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <Calendar size={16} className="relative z-10" />
                <span className="relative z-10">Prendre rendez-vous</span>
                <ArrowUpRight size={14} className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-foreground hover:bg-muted transition-colors"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Overlay mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{
              duration: 0.4,
              ease: [0.19, 1, 0.22, 1], // ease-out-expo
            }}
            className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-background border-l border-border shadow-2xl md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex justify-between items-center px-6 h-16 border-b border-border">
                <span className="text-lg font-bold text-primary">Ismail</span>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  <X size={22} />
                </motion.button>
              </div>

              {/* Mobile Nav Items */}
              <div className="flex-1 flex flex-col gap-1 px-4 py-6">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '')
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.19, 1, 0.22, 1],
                        delay: 0.1 + index * 0.05,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          scrollToSection(item.href)
                        }}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg
                          text-base font-medium transition-all duration-200
                          ${isActive
                            ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                            : 'text-foreground-soft hover:text-foreground hover:bg-muted'
                          }
                        `}
                      >
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="mobile-active-dot"
                            className="ml-auto w-2 h-2 rounded-full bg-primary-foreground"
                          />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Mobile CTA */}
              <div className="px-4 py-6 border-t border-border">
                <motion.a
                  href={portfolioData.personal.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    group flex items-center justify-center gap-2 w-full
                    bg-primary text-primary-foreground
                    px-6 py-3.5 rounded-lg font-medium
                    shadow-sm shadow-primary/20
                    hover:shadow-md hover:shadow-primary/25
                    transition-shadow duration-300
                    overflow-hidden relative
                  "
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <Calendar size={18} className="relative z-10" />
                  <span className="relative z-10">Prendre rendez-vous</span>
                  <ArrowUpRight size={14} className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}