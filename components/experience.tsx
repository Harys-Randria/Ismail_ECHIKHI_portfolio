'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@/lib/data'
import { EXPO_EASE, SPRING_EASE } from '@/lib/easing'
import {
  ChevronRight,
  ChevronDown,
  MapPin,
  Calendar,
  Briefcase,
  Building2,
  ExternalLink,
} from 'lucide-react'

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [expandedJobs, setExpandedJobs] = useState<number[]>([])

  const toggleJob = (index: number) => {
    setExpandedJobs((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    )
  }

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: EXPO_EASE,
      },
    },
  }

  // Compter le nombre total de highlights
  const totalHighlights = portfolioData.experience.reduce(
    (acc, job) => acc + job.highlights.length,
    0
  )

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-1/2 -left-32 w-96 h-96 rounded-full opacity-5 blur-[120px]"
          style={{ background: `var(--primary-glow)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-8 blur-[100px]"
          style={{ background: `var(--secondary-glow)` }}
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-14"
        >
          {/* ==================== HEADER ==================== */}
          <motion.div variants={itemVariants} className="space-y-5 max-w-3xl">
            {/* Badge section */}
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
              style={{
                background: `var(--primary)`,
                color: `var(--primary-foreground)`,
                borderColor: `var(--primary)`,
              }}
            >
              <Briefcase size={13} />
              Parcours
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: `var(--foreground)` }}
            >
              Expérience{' '}
              <span style={{ color: `var(--primary)` }}>professionnelle</span>
            </h2>

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: `var(--muted-foreground)` }}
            >
              10 ans d'expertise dans le développement fullstack pour des
              projets critiques avec les plus grands comptes.{' '}
              <span style={{ color: `var(--foreground-soft)` }}>
                {portfolioData.experience.length} expériences •{' '}
                {totalHighlights} réalisations majeures
              </span>
            </p>
          </motion.div>

          {/* ==================== TIMELINE ==================== */}
          <motion.div variants={containerVariants} className="space-y-0">
            {portfolioData.experience.map((job, index) => {
              const isExpanded = expandedJobs.includes(index)
              const isLast = index === portfolioData.experience.length - 1
              const isFirst = index === 0

              // Couleur d'accent basée sur la position (alternance subtile)
              const accentColor =
                index % 2 === 0
                  ? 'var(--primary)'
                  : 'var(--secondary)'

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative pb-0"
                >
                  {/* Ligne verticale de timeline */}
                  {!isLast && (
                    <div
                      className="absolute left-[19px] top-12 bottom-0 w-0.5"
                      style={{ background: `var(--border)` }}
                    />
                  )}

                  <div className="flex gap-6">
                    {/* Colonne timeline (dot + ligne) */}
                    <div className="relative flex flex-col items-center pt-1.5">
                      {/* Dot principal */}
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.3, ease: SPRING_EASE }}
                        className="relative z-10 w-[14px] h-[14px] rounded-full border-[3px] flex-shrink-0"
                        style={{
                          background: isFirst
                            ? `var(--primary)`
                            : `var(--background)`,
                          borderColor: accentColor,
                          boxShadow: isFirst
                            ? `0 0 12px var(--primary-glow)`
                            : 'none',
                        }}
                      >
                        {/* Pulse pour le poste actuel */}
                        {isFirst && (
                          <span
                            className="absolute inset-0 rounded-full animate-ping opacity-40"
                            style={{ background: `var(--primary-glow)` }}
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* Contenu de la carte */}
                    <motion.div
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.3, ease: EXPO_EASE }}
                      className="flex-1 pb-10"
                    >
                      <div
                        className="p-5 sm:p-7 rounded-xl border cursor-pointer transition-all duration-300"
                        style={{
                          background: `var(--card)`,
                          borderColor: isExpanded
                            ? accentColor
                            : `var(--card-border)`,
                          boxShadow: isExpanded
                            ? `var(--shadow-lg)`
                            : `var(--card-shadow)`,
                        }}
                        onClick={() => toggleJob(index)}
                        onMouseEnter={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.borderColor = accentColor
                            e.currentTarget.style.boxShadow = `var(--shadow-md)`
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isExpanded) {
                            e.currentTarget.style.borderColor = `var(--card-border)`
                            e.currentTarget.style.boxShadow = `var(--card-shadow)`
                          }
                        }}
                      >
                        {/* En-tête de la carte */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                          <div className="flex-1 min-w-0">
                            {/* Poste */}
                            <h3
                              className="text-lg sm:text-xl font-bold leading-tight"
                              style={{ color: `var(--foreground)` }}
                            >
                              {job.position}
                            </h3>

                            {/* Entreprise + localisation */}
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span
                                className="inline-flex items-center gap-1.5 text-sm font-semibold"
                                style={{ color: accentColor }}
                              >
                                <Building2 size={14} />
                                {job.company}
                              </span>
                              {job.location && (
                                <span
                                  className="inline-flex items-center gap-1 text-xs"
                                  style={{ color: `var(--muted-foreground)` }}
                                >
                                  <MapPin size={11} />
                                  {job.location}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Période + bouton expand */}
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span
                              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{
                                background: `var(--muted)`,
                                color: `var(--muted-foreground)`,
                              }}
                            >
                              <Calendar size={11} />
                              {job.period}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{
                                duration: 0.3,
                                ease: EXPO_EASE,
                              }}
                            >
                              <ChevronDown
                                size={18}
                                style={{ color: `var(--muted-foreground)` }}
                              />
                            </motion.div>
                          </div>
                        </div>

                        {/* Description */}
                        <p
                          className="text-sm leading-relaxed mb-4"
                          style={{ color: `var(--muted-foreground)` }}
                        >
                          {job.description}
                        </p>

                        {/* Highlights (visibles uniquement si expanded) */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                duration: 0.4,
                                ease: EXPO_EASE,
                              }}
                              className="overflow-hidden"
                            >
                              <div
                                className="pt-4 mb-4 border-t"
                                style={{ borderColor: `var(--border)` }}
                              >
                                <p
                                  className="text-xs font-semibold uppercase tracking-wider mb-3"
                                  style={{ color: `var(--muted-foreground)` }}
                                >
                                  Réalisations clés
                                </p>
                                <div className="space-y-2.5">
                                  {job.highlights.map((highlight, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.4,
                                        delay: idx * 0.05,
                                        ease: EXPO_EASE,
                                      }}
                                      className="flex gap-3 group/highlight"
                                    >
                                      <ChevronRight
                                        size={15}
                                        className="flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover/highlight:translate-x-0.5"
                                        style={{ color: accentColor }}
                                      />
                                      <p
                                        className="text-sm leading-relaxed"
                                        style={{
                                          color: `var(--foreground-soft)`,
                                        }}
                                      >
                                        {highlight}
                                      </p>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Technologies (toujours visibles) */}
                        <div className="flex flex-wrap gap-1.5">
                          {job.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-all duration-200 cursor-default"
                              style={{
                                background: `${accentColor}10`,
                                color: accentColor,
                                borderColor: `${accentColor}25`,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = `${accentColor}20`
                                e.currentTarget.style.borderColor = `${accentColor}50`
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = `${accentColor}10`
                                e.currentTarget.style.borderColor = `${accentColor}25`
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Indicateur "Cliquer pour déplier" */}
                        {!isExpanded && job.highlights.length > 0 && (
                          <div
                            className="mt-4 text-xs flex items-center gap-1.5"
                            style={{ color: `var(--muted-foreground)` }}
                          >
                            <ExternalLink size={11} />
                            {job.highlights.length} réalisation
                            {job.highlights.length > 1 ? 's' : ''} — Cliquer
                            pour déplier
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* ==================== LÉGENDE ==================== */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 pt-2"
          >
            <span
              className="text-xs flex items-center gap-1.5"
              style={{ color: `var(--muted-foreground)` }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: `var(--primary)`,
                  boxShadow: `0 0 6px var(--primary-glow)`,
                }}
              />
              Poste actuel
            </span>
            <span
              className="text-xs flex items-center gap-1.5"
              style={{ color: `var(--muted-foreground)` }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full border-2"
                style={{ borderColor: `var(--primary)` }}
              />
              Poste précédent
            </span>
            <span
              className="text-xs flex items-center gap-1.5"
              style={{ color: `var(--muted-foreground)` }}
            >
              <ChevronDown size={11} />
              Cliquer pour déplier les détails
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}