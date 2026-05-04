'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { portfolioData } from '@/lib/data'
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  Sparkles,
  Linkedin,
} from 'lucide-react'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const expoEase: [number, number, number, number] = [0.19, 1, 0.22, 1]
  const springEase: [number, number, number, number] = [0.34, 1.56, 0.64, 1]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: expoEase,
      },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, rotate: -1 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.9,
        ease: expoEase,
        delay: 0.4,
      },
    },
  }

  const quickBadges = [
    { icon: Briefcase, label: "10 ans d'expérience" },
    { icon: MapPin, label: 'France' },
    { icon: Sparkles, label: 'Tech Lead' },
  ]

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{ background: `var(--primary-glow)` }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{ background: `var(--secondary-glow)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-5 blur-[150px]"
          style={{
            background: `radial-gradient(ellipse at center, var(--primary), transparent 70%)`,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* ==================== COLONNE TEXTE ==================== */}
          <div className="space-y-6 order-2 md:order-1">
            {/* Badge Disponible */}
            <motion.div variants={itemVariants}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: `var(--primary)`,
                  color: `var(--primary-foreground)`,
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
              </span>
            </motion.div>

            {/* Nom */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight"
            >
              {portfolioData.personal.name
                .split(' ')
                .map((word, i) => (
                  <span key={i}>
                    {i === 0 ? (
                      <span className="text-primary">{word}</span>
                    ) : (
                      ` ${word}`
                    )}
                  </span>
                ))}
            </motion.h1>

            {/* Titre */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-foreground-soft font-medium"
            >
              {portfolioData.personal.title}
            </motion.p>

            {/* Badges rapides */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3"
            >
              {quickBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border"
                  style={{
                    background: `var(--muted)`,
                    color: `var(--muted-foreground)`,
                    borderColor: `var(--border)`,
                  }}
                >
                  <badge.icon size={13} />
                  {badge.label}
                </span>
              ))}
            </motion.div>

            {/* Summary */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-foreground leading-relaxed max-w-lg"
            >
              {portfolioData.about.summary}
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={itemVariants}
              className="text-sm text-muted-foreground leading-relaxed max-w-lg line-clamp-3 hover:line-clamp-none transition-all duration-500 cursor-default"
              title={portfolioData.about.bio}
            >
              {portfolioData.about.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-4"
            >
              {/* CTA Principal */}
              <motion.a
                href={portfolioData.personal.calendly}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  group relative inline-flex items-center gap-2.5
                  px-7 py-3.5 rounded-lg font-semibold text-sm
                  shadow-sm hover:shadow-md
                  transition-shadow duration-300
                  overflow-hidden
                "
                style={{
                  background: `var(--primary)`,
                  color: `var(--primary-foreground)`,
                  boxShadow: `0 4px 14px 0 var(--primary-glow)`,
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <Calendar size={17} className="relative z-10" />
                <span className="relative z-10">Prendre rendez-vous</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.a>

              {/* CTA Secondaire */}
              <motion.a
                href={`mailto:${portfolioData.personal.email}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  group inline-flex items-center gap-2.5
                  px-7 py-3.5 rounded-lg font-semibold text-sm
                  border transition-all duration-300
                  hover:shadow-sm
                "
                style={{
                  color: `var(--foreground)`,
                  borderColor: `var(--border)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `var(--muted)`
                  e.currentTarget.style.borderColor = `var(--border-hover)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = `var(--border)`
                }}
              >
                <Mail size={17} />
                <span>Envoyer un email</span>
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.a>
            </motion.div>

            {/* Liens sociaux */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-2"
            >
              {[
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
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium transition-all duration-200 hover:opacity-100 flex items-center gap-1.5"
                  style={{ color: `var(--muted-foreground)`, opacity: 0.7 }}
                >
                  {'icon' in social && social.icon ? (
                    <social.icon size={14} />
                  ) : 'image' in social && social.image ? (
                    <Image
                      src={social.image}
                      alt={social.label}
                      width={14}
                      height={14}
                      className="rounded-sm"
                    />
                  ) : null}
                  {social.label}
                  <ArrowUpRight size={10} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* ==================== COLONNE IMAGE ==================== */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative order-1 md:order-2"
          >
            <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Anneaux décoratifs */}
              <div
                className="absolute -inset-4 rounded-full opacity-30 blur-sm"
                style={{
                  background: `conic-gradient(from 0deg, var(--primary), var(--secondary), var(--accent), var(--primary))`,
                  animation: 'spin 8s linear infinite',
                }}
              />
              <div
                className="absolute -inset-2 rounded-full opacity-20 blur-md"
                style={{
                  background: `conic-gradient(from 180deg, var(--primary), var(--secondary), var(--accent), var(--primary))`,
                  animation: 'spin 12s linear infinite reverse',
                }}
              />

              {/* Image */}
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg ring-1"
                style={{
                  boxShadow: `var(--shadow-lg)`,
                  borderColor: `var(--border)`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
                    opacity: 0.05,
                  }}
                />
                <Image
                  src={portfolioData.personal.image}
                  alt={portfolioData.personal.name}
                  fill
                  className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
                  style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
                  priority
                  sizes="(max-width: 768px) 16rem, (max-width: 1024px) 20rem, 24rem"
                />
              </div>

              {/* Étiquette Expérience */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 20, scale: 0.9 }
                }
                transition={{ duration: 0.6, delay: 0.8, ease: springEase }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 px-4 py-2.5 rounded-xl shadow-lg backdrop-blur-md border"
                style={{
                  background: `var(--card)`,
                  borderColor: `var(--card-border)`,
                  boxShadow: `var(--shadow-lg)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                      background: `var(--primary)`,
                      color: `var(--primary-foreground)`,
                    }}
                  >
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-medium" style={{ color: `var(--muted-foreground)` }}>
                      Expérience
                    </p>
                    <p className="text-lg font-bold" style={{ color: `var(--foreground)` }}>
                      10+
                      <span className="text-sm font-normal" style={{ color: `var(--muted-foreground)` }}> ans</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Étiquette Freelance */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: -20, scale: 0.9 }
                }
                transition={{ duration: 0.6, delay: 1, ease: springEase }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 px-4 py-2.5 rounded-xl shadow-lg backdrop-blur-md border"
                style={{
                  background: `var(--card)`,
                  borderColor: `var(--card-border)`,
                  boxShadow: `var(--shadow-lg)`,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ background: `var(--accent)` }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ background: `var(--accent)` }}
                    />
                  </span>
                  <span className="text-sm font-semibold" style={{ color: `var(--foreground)` }}>
                    Freelance
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}