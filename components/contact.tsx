'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { portfolioData } from '@/lib/data'
import { EXPO_EASE, SPRING_EASE } from '@/lib/easing'
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowUpRight,
  Linkedin,
  Clock,
  CheckCircle,
  Copy,
  Check,
} from 'lucide-react'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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
        ease: EXPO_EASE,
      },
    },
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: portfolioData.personal.email,
      href: `mailto:${portfolioData.personal.email}`,
      copyValue: portfolioData.personal.email,
      color: 'var(--primary)',
      description: 'Réponse sous 24h ouvrées',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: portfolioData.personal.phone,
      href: `tel:${portfolioData.personal.phone}`,
      copyValue: portfolioData.personal.phone,
      color: 'var(--secondary)',
      description: 'Appel ou SMS',
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'France',
      href: '#',
      copyValue: 'France',
      color: 'var(--accent)',
      description: 'Remote / Hybride',
    },
  ]

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: portfolioData.personal.linkedin,
      icon: Linkedin,
      color: 'var(--primary)',
      description: 'Profil professionnel',
    },
    {
      label: 'Malt',
      href: portfolioData.personal.malt,
      image: '/malt.png',
      color: 'var(--secondary)',
      description: 'Plateforme freelance',
    },
    {
      label: 'Collective',
      href: portfolioData.personal.collective,
      image: '/collective.png',
      color: 'var(--accent)',
      description: 'Communauté tech',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-8 blur-[150px]"
          style={{ background: `var(--primary-glow)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-5 blur-[120px]"
          style={{ background: `var(--secondary-glow)` }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full opacity-3 blur-[150px]"
          style={{
            background: `radial-gradient(ellipse at center, var(--primary), transparent 70%)`,
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* ==================== HEADER ==================== */}
          <motion.div
            variants={itemVariants}
            className="space-y-5 text-center max-w-3xl mx-auto"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                background: `var(--accent)`,
                color: `var(--accent-foreground)`,
                borderColor: `var(--accent)`,
              }}
            >
              <Calendar size={13} />
              Disponible
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: `var(--foreground)` }}
            >
              Travaillons{' '}
              <span style={{ color: `var(--primary)` }}>ensemble</span>
            </h2>

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: `var(--muted-foreground)` }}
            >
              Je suis ouvert aux missions freelance, projets tech et
              collaborations. Discutons de votre besoin et voyons comment je
              peux vous aider à le concrétiser.
            </p>
          </motion.div>

          {/* ==================== CARTE PRINCIPALE CALENDLY ==================== */}
          <motion.div variants={itemVariants} className="relative">
            <div
              className="relative p-8 sm:p-12 rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(145deg, #0010d9 0%, #0010d9 40%, #6eadf5 100%)`,
                boxShadow: `0 25px 70px -25px rgba(0, 16, 217, 0.35)`,
              }}
            >
              {/* Grain/texture subtile */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
              />
              {/* Motifs lumineux */}
              <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-8 blur-[80px] bg-white pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full opacity-6 blur-[60px] bg-white pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Texte */}
                <div className="flex-1 text-center lg:text-left space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
                    <Clock size={13} />
                    Créneau en 30 secondes
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Planifiez un appel directement
                  </h3>

                  <p className="text-base leading-relaxed text-white/85">
                    Choisissez le créneau qui vous convient sur mon Calendly.
                    Consultation gratuite, sans engagement.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
                    {[
                      'Consultation gratuite',
                      'Créneaux flexibles',
                      'Sans engagement',
                    ].map((benefit) => (
                      <span
                        key={benefit}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80"
                      >
                        <CheckCircle size={14} className="opacity-75" />
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bouton CTA */}
                <motion.a
                  href={portfolioData.personal.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    group relative flex-shrink-0
                    inline-flex items-center gap-3
                    px-10 py-5 rounded-xl
                    text-lg font-bold
                    shadow-2xl
                    transition-all duration-300
                    overflow-hidden
                  "
                  style={{
                    background: `var(--accent)`,
                    color: `var(--accent-foreground)`,
                    boxShadow: `0 10px 40px -10px rgba(0,0,0,0.3)`,
                  }}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <Calendar size={22} className="relative z-10" />
                  <span className="relative z-10">Prendre rendez-vous</span>
                  <ArrowUpRight
                    size={18}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* ==================== CONTACT METHODS ==================== */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
          >
            {contactMethods.map((method) => {
              const Icon = method.icon
              const isCopied = copiedField === method.label

              return (
                <motion.div
                  key={method.label}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: EXPO_EASE }}
                  className="group relative p-5 sm:p-6 rounded-xl border cursor-pointer transition-all duration-300"
                  style={{
                    background: `var(--card)`,
                    borderColor: `var(--card-border)`,
                    boxShadow: `var(--card-shadow)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = method.color
                    e.currentTarget.style.boxShadow = `var(--shadow-md)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `var(--card-border)`
                    e.currentTarget.style.boxShadow = `var(--card-shadow)`
                  }}
                  onClick={() => {
                    if (method.href === '#') return
                    if (method.label === 'Email' || method.label === 'Téléphone') {
                      copyToClipboard(method.copyValue, method.label)
                    }
                  }}
                >
                  {/* Bouton copie rapide */}
                  {(method.label === 'Email' || method.label === 'Téléphone') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(method.copyValue, method.label)
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-md transition-all duration-200 opacity-0 group-hover:opacity-100"
                      style={{
                        background: `var(--muted)`,
                        color: `var(--muted-foreground)`,
                      }}
                      title="Copier"
                    >
                      {isCopied ? (
                        <Check size={14} style={{ color: `var(--accent)` }} />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  )}

                  {/* Icône */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${method.color}15`,
                      color: method.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Contenu */}
                  <h3
                    className="font-semibold text-base mb-1"
                    style={{ color: `var(--foreground)` }}
                  >
                    {method.label}
                  </h3>
                  <p
                    className="text-sm break-all"
                    style={{ color: `var(--muted-foreground)` }}
                  >
                    {method.value}
                  </p>
                  <p
                    className="text-xs mt-2"
                    style={{ color: `var(--muted-foreground)`, opacity: 0.7 }}
                  >
                    {method.description}
                  </p>

                  {/* Indicateur de copie réussie */}
                  {isCopied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute bottom-3 right-3 px-2 py-1 rounded-md text-xs font-medium"
                      style={{
                        background: `var(--accent)`,
                        color: `var(--accent-foreground)`,
                      }}
                    >
                      Copié !
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          {/* ==================== RÉSEAUX SOCIAUX ==================== */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center">
              <h3
                className="text-lg font-bold"
                style={{ color: `var(--foreground)` }}
              >
                Retrouvez-moi sur
              </h3>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((social) => {
                const isImage = 'image' in social
                const Icon = !isImage ? social.icon : null

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3, ease: SPRING_EASE }}
                    className="group flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300"
                    style={{
                      background: `var(--card)`,
                      borderColor: `var(--card-border)`,
                      color: `var(--foreground)`,
                      boxShadow: `var(--card-shadow)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = social.color
                      e.currentTarget.style.boxShadow = `var(--shadow-md)`
                      e.currentTarget.style.color = social.color
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `var(--card-border)`
                      e.currentTarget.style.boxShadow = `var(--card-shadow)`
                      e.currentTarget.style.color = `var(--foreground)`
                    }}
                  >
                    {/* Icône ou image */}
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden transition-colors duration-300"
                      style={{
                        background: `${social.color}15`,
                        color: social.color,
                      }}
                    >
                      {isImage ? (
                        <Image
                          src={social.image!}
                          alt={social.label}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                      ) : (
                        Icon && <Icon size={16} />
                      )}
                    </div>

                    <div className="text-left">
                      <span className="text-sm font-semibold block leading-tight">
                        {social.label}
                      </span>
                      <span
                        className="text-xs block"
                        style={{ color: `var(--muted-foreground)` }}
                      >
                        {social.description}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: `var(--muted-foreground)` }}
                    />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}