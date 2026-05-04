'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { portfolioData } from '@/lib/data'
import { EXPO_EASE } from '@/lib/easing'
import {
  Mail,
  Phone,
  Linkedin,
  Calendar,
  ArrowUpRight,
  Heart,
  Code2,
} from 'lucide-react'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: '-50px' })
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: EXPO_EASE,
      },
    },
  }

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'À propos', href: '#about' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: portfolioData.personal.linkedin,
      icon: Linkedin,
    },
    {
      label: 'Malt',
      href: portfolioData.personal.malt,
      image: '/malt.png',
    },
    {
      label: 'Collective',
      href: portfolioData.personal.collective,
      image: '/collective.png',
    },
  ]

  const contactLinks = [
    {
      label: portfolioData.personal.email,
      href: `mailto:${portfolioData.personal.email}`,
      icon: Mail,
    },
    {
      label: portfolioData.personal.phone,
      href: `tel:${portfolioData.personal.phone}`,
      icon: Phone,
    },
    {
      label: 'Prendre rendez-vous',
      href: portfolioData.personal.calendly,
      icon: Calendar,
      external: true,
    },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      ref={footerRef}
      className="relative pt-20 sm:pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: `var(--foreground)`,
        color: `var(--background)`,
      }}
    >
      {/* Ligne décorative supérieure */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: `linear-gradient(90deg, var(--primary), var(--secondary), var(--accent), var(--chart-4), var(--chart-5))`,
        }}
      />

      {/* Fond texturé subtil */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-5">
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: `var(--primary)` }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-[120px]"
          style={{ background: `var(--secondary)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-14"
        >
          {/* ==================== GRILLE PRINCIPALE ==================== */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
          >
            {/* Colonne 1 : Marque */}
            <motion.div variants={itemVariants} className="space-y-5 sm:col-span-2 lg:col-span-1">
              <div>
                <h3
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                  style={{ color: `var(--background)` }}
                >
                  {portfolioData.personal.name
                    .split(' ')
                    .map((word, i) => (
                      <span key={i}>
                        {i === 0 ? (
                          <span style={{ color: `var(--secondary)` }}>{word}</span>
                        ) : (
                          ` ${word}`
                        )}
                      </span>
                    ))}
                </h3>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: `var(--background)`, opacity: 0.7 }}
              >
                Tech Lead fullstack avec 10 ans d'expertise en développement
                Java/Angular et architecture microservices. Disponible pour
                missions freelance.
              </p>

              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
                style={{
                  background: `${`var(--accent)`}20`,
                  color: `var(--accent)`,
                  borderColor: `${`var(--accent)`}40`,
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: `var(--accent)` }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: `var(--accent)` }}
                  />
                </span>
                Disponible pour missions
              </div>
            </motion.div>

            {/* Colonne 2 : Navigation */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: `var(--background)`, opacity: 0.5 }}
              >
                Navigation
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault()
                        scrollToSection(link.href)
                      }}
                      className="
                        relative inline-block text-sm transition-all duration-200
                        hover:translate-x-1
                      "
                      style={{ color: `var(--background)`, opacity: 0.7 }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                        e.currentTarget.style.color = `var(--secondary)`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7'
                        e.currentTarget.style.color = `var(--background)`
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Colonne 3 : Contact */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: `var(--background)`, opacity: 0.5 }}
              >
                Contact
              </h4>
              <ul className="space-y-3">
                {contactLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="
                          group flex items-center gap-2.5 text-sm
                          transition-all duration-200
                          hover:translate-x-1
                        "
                        style={{ color: `var(--background)`, opacity: 0.7 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1'
                          e.currentTarget.style.color = `var(--secondary)`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.7'
                          e.currentTarget.style.color = `var(--background)`
                        }}
                      >
                        <Icon
                          size={15}
                          className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                        />
                        <span className="truncate">{link.label}</span>
                        {link.external && (
                          <ArrowUpRight
                            size={12}
                            className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        )}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>

            {/* Colonne 4 : Réseaux sociaux */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4
                className="text-sm font-semibold uppercase tracking-wider"
                style={{ color: `var(--background)`, opacity: 0.5 }}
              >
                Réseaux
              </h4>
              <ul className="space-y-2.5">
                {socialLinks.map((social) => {
                  const isImage = 'image' in social
                  const Icon = !isImage ? social.icon : null

                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                          group flex items-center gap-2.5 text-sm
                          transition-all duration-200
                          hover:translate-x-1
                        "
                        style={{ color: `var(--background)`, opacity: 0.7 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '1'
                          e.currentTarget.style.color = `var(--secondary)`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '0.7'
                          e.currentTarget.style.color = `var(--background)`
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center overflow-hidden transition-colors duration-200"
                          style={{
                            background: `${`var(--background)`}10`,
                          }}
                        >
                          {isImage ? (
                            <Image
                              src={social.image!}
                              alt={social.label}
                              width={16}
                              height={16}
                              className="object-contain opacity-70 group-hover:opacity-100 transition-opacity invert"
                            />
                          ) : (
                            Icon && <Icon size={14} />
                          )}
                        </div>
                        <span>{social.label}</span>
                        <ArrowUpRight
                          size={12}
                          className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-0 group-hover:opacity-100"
                        />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.div>

          {/* ==================== SÉPARATEUR ==================== */}
          <motion.div
            variants={itemVariants}
            className="h-px"
            style={{ background: `var(--background)`, opacity: 0.1 }}
          />

          {/* ==================== BAS DE PAGE ==================== */}
          <motion.div
            variants={containerVariants}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
            style={{ color: `var(--background)`, opacity: 0.5 }}
          >
            {/* Copyright */}
            <motion.p variants={itemVariants} className="flex items-center gap-1.5">
              © {currentYear} {portfolioData.personal.name}.
              <span className="hidden sm:inline">Tous droits réservés.</span>
            </motion.p>

            {/* Fait avec ❤️ */}
            <motion.p
              variants={itemVariants}
              className="flex items-center gap-1.5"
            >
              <span>Conçu avec</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                style={{ color: `var(--chart-4)` }}
              >
                <Heart size={14} fill="currentColor" />
              </motion.span>
              <span>et</span>
              <Code2 size={14} style={{ color: `var(--secondary)` }} />
            </motion.p>

            {/* Liens rapides */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const isImage = 'image' in social
                const Icon = !isImage ? social.icon : null

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-200 hover:scale-110"
                    style={{ color: `var(--background)`, opacity: 0.5 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.color = `var(--secondary)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.5'
                      e.currentTarget.style.color = `var(--background)`
                    }}
                    aria-label={social.label}
                  >
                    {isImage ? (
                      <Image
                        src={social.image!}
                        alt={social.label}
                        width={18}
                        height={18}
                        className="object-contain opacity-50 hover:opacity-100 transition-opacity invert"
                      />
                    ) : (
                      Icon && <Icon size={18} />
                    )}
                  </a>
                )
              })}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}