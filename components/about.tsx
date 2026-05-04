'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { portfolioData } from '@/lib/data'
import { GraduationCap, Globe, Award, Building2, Code2, Rocket } from 'lucide-react'
import { EXPO_EASE, SPRING_EASE } from '@/lib/easing'

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

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

  const stats = [
    { label: "Ans d'expérience", value: '10+', icon: Award },
    { label: 'Grands comptes', value: '6+', icon: Building2 },
    { label: 'Technologies', value: '30+', icon: Code2 },
    { label: 'Projets réussis', value: '50+', icon: Rocket },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Fond décoratif subtil */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-1/3 -left-32 w-96 h-96 rounded-full opacity-8 blur-[120px]"
          style={{ background: `var(--secondary-glow)` }}
        />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-5 blur-[100px]"
          style={{ background: `var(--primary-glow)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
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
              <Award size={13} />
              Profil
            </span>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: `var(--foreground)` }}
            >
              Architecte logiciel{' '}
              <span style={{ color: `var(--primary)` }}>passionné</span> par la
              qualité et l'innovation
            </h2>

            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: `var(--muted-foreground)` }}
            >
              {portfolioData.about.bio}
            </p>
          </motion.div>

          {/* ==================== STATS GRID ==================== */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: EXPO_EASE } }}
                className="group relative p-5 sm:p-6 rounded-xl border cursor-default"
                style={{
                  background: `var(--card)`,
                  borderColor: `var(--card-border)`,
                  boxShadow: `var(--card-shadow)`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `var(--primary)`
                  e.currentTarget.style.boxShadow = `var(--shadow-md)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `var(--card-border)`
                  e.currentTarget.style.boxShadow = `var(--card-shadow)`
                }}
              >
                {/* Icône */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `var(--primary)`,
                    color: `var(--primary-foreground)`,
                  }}
                >
                  <stat.icon size={20} />
                </div>

                {/* Valeur avec compteur animé visuel */}
                <motion.p
                  className="text-3xl sm:text-4xl font-bold tracking-tight mb-1"
                  style={{ color: `var(--foreground)` }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.3,
                    ease: SPRING_EASE,
                  }}
                >
                  {stat.value}
                </motion.p>

                <p
                  className="text-sm font-medium"
                  style={{ color: `var(--muted-foreground)` }}
                >
                  {stat.label}
                </p>

                {/* Barre décorative au hover */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: `var(--primary-glow)` }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* ==================== EDUCATION & LANGUES ==================== */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {/* Formation */}
            <motion.div variants={itemVariants} className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: `var(--secondary)`,
                    color: `var(--secondary-foreground)`,
                  }}
                >
                  <GraduationCap size={18} />
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: `var(--foreground)` }}
                >
                  Formation
                </h3>
              </div>

              <div className="space-y-3">
                {portfolioData.education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    variants={itemVariants}
                    whileHover={{ x: 4, transition: { duration: 0.3, ease: EXPO_EASE } }}
                    className="group p-4 sm:p-5 rounded-xl border transition-all duration-300"
                    style={{
                      background: `var(--card)`,
                      borderColor: `var(--card-border)`,
                      boxShadow: `var(--card-shadow)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `var(--primary)`
                      e.currentTarget.style.boxShadow = `var(--shadow-md)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `var(--card-border)`
                      e.currentTarget.style.boxShadow = `var(--card-shadow)`
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Timeline dot */}
                      <div className="flex flex-col items-center mt-1.5">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: `var(--primary)` }}
                        />
                        {index < portfolioData.education.length - 1 && (
                          <div
                            className="w-0.5 h-full min-h-[20px] mt-1"
                            style={{ background: `var(--border)` }}
                          />
                        )}
                      </div>

                      <div>
                        <p
                          className="font-semibold text-base"
                          style={{ color: `var(--foreground)` }}
                        >
                          {edu.degree}
                        </p>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: `var(--muted-foreground)` }}
                        >
                          {edu.school}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium"
                            style={{
                              background: `var(--muted)`,
                              color: `var(--muted-foreground)`,
                            }}
                          >
                            {edu.year}
                          </span>
                          <span
                            className="text-xs"
                            style={{ color: `var(--muted-foreground)` }}
                          >
                            {edu.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Langues & Points clés */}
            <motion.div variants={itemVariants} className="space-y-5">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: `var(--accent)`,
                    color: `var(--accent-foreground)`,
                  }}
                >
                  <Globe size={18} />
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{ color: `var(--foreground)` }}
                >
                  Langues
                </h3>
              </div>

              <div className="space-y-3">
                {portfolioData.languages.map((lang) => (
                  <motion.div
                    key={lang.language}
                    variants={itemVariants}
                    whileHover={{ x: 4, transition: { duration: 0.3, ease: EXPO_EASE } }}
                    className="group p-4 sm:p-5 rounded-xl border transition-all duration-300"
                    style={{
                      background: `var(--card)`,
                      borderColor: `var(--card-border)`,
                      boxShadow: `var(--card-shadow)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `var(--accent)`
                      e.currentTarget.style.boxShadow = `var(--shadow-md)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `var(--card-border)`
                      e.currentTarget.style.boxShadow = `var(--card-shadow)`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="font-semibold text-base"
                          style={{ color: `var(--foreground)` }}
                        >
                          {lang.language}
                        </p>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: `var(--muted-foreground)` }}
                        >
                          {lang.level}
                        </p>
                      </div>

                      {/* Indicateur de niveau visuel */}
                      <div className="flex items-center gap-1">
                        {[...Array(lang.level === 'Bilingue' ? 5 : 4)].map(
                          (_, i) => (
                            <div
                              key={i}
                              className="w-2 h-6 rounded-full transition-all duration-300 group-hover:scale-y-110"
                              style={{
                                background:
                                  lang.level === 'Bilingue'
                                    ? `var(--primary)`
                                    : i < 4
                                    ? `var(--primary)`
                                    : `var(--border)`,
                                opacity: lang.level === 'Bilingue' ? 1 : i < 4 ? 1 : 0.3,
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Résumé des atouts */}
              <motion.div
                variants={itemVariants}
                className="mt-6 p-5 rounded-xl border"
                style={{
                  background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
                  borderColor: 'transparent',
                  color: `var(--primary-foreground)`,
                }}
              >
                <p className="text-sm font-medium leading-relaxed">
                  Double diplôme Ingénieur + Master MIAGE • Bilingue français •
                  Anglais professionnel • Leadership technique éprouvé sur des
                  projets critiques
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}