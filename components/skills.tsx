'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { portfolioData } from '@/lib/data'
import { EXPO_EASE, SPRING_EASE } from '@/lib/easing'
import { Code2, Cloud, Database, TestTube, Layers, Search } from 'lucide-react'

// Mapping icône par catégorie
const categoryIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  'Développement Fullstack': Code2,
  'Architecture & Cloud': Cloud,
  'Bases de données': Database,
  'Tests & Qualité': TestTube,
  'Autres': Layers,
}

// Couleur d'accent par catégorie (utilise les variables CSS du globals.css)
const categoryAccents: Record<string, string> = {
  'Développement Fullstack': 'var(--primary)',
  'Architecture & Cloud': 'var(--secondary)',
  'Bases de données': 'var(--accent)',
  'Tests & Qualité': 'var(--chart-4)',
  'Autres': 'var(--chart-5)',
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

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

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: i * 0.03,
        ease: SPRING_EASE,
      },
    }),
  }

  // Filtrage des compétences par recherche
  const filterSkills = (skills: string[]) => {
    if (!searchTerm) return skills
    return skills.filter((skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Compteur total de compétences visibles
  const totalVisibleSkills = Object.values(portfolioData.skills).reduce(
    (acc, skills) => acc + filterSkills(skills).length,
    0
  )

  // Nombre total de catégories visibles
  const visibleCategories = Object.entries(portfolioData.skills).filter(
    ([, skills]) => {
      if (!searchTerm) return true
      return filterSkills(skills).length > 0
    }
  ).length

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Fond décoratif avec glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-8 blur-[120px]"
          style={{ background: `var(--secondary-glow)` }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-5 blur-[100px]"
          style={{ background: `var(--primary-glow)` }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
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
                background: `var(--secondary)`,
                color: `var(--secondary-foreground)`,
                borderColor: `var(--secondary)`,
              }}
            >
              <Code2 size={13} />
              Stack technique
            </span>

            {/* Titre */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: `var(--foreground)` }}
            >
              Des compétences{' '}
              <span style={{ color: `var(--primary)` }}>forgées</span> sur le
              terrain
            </h2>

            {/* Description */}
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: `var(--muted-foreground)` }}
            >
              Maîtrise complète du stack fullstack moderne avec expertise en
              architecture distribuée et leadership technique.
            </p>

            {/* Barre de recherche + compteur */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              {/* Champ de recherche */}
              <div className="relative flex items-center w-full sm:w-72">
                <Search
                  size={16}
                  className="absolute left-3 pointer-events-none"
                  style={{ color: `var(--muted-foreground)` }}
                />
                <input
                  type="text"
                  placeholder="Filtrer une technologie..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border transition-all duration-300 outline-none"
                  style={{
                    background: `var(--input)`,
                    borderColor: `var(--border)`,
                    color: `var(--foreground)`,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = `var(--primary)`
                    e.currentTarget.style.boxShadow = `0 0 0 3px var(--primary-glow)`
                    e.currentTarget.style.background = `var(--input-focus)`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = `var(--border)`
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.background = `var(--input)`
                  }}
                />
              </div>

              {/* Compteur */}
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    background: `var(--muted)`,
                    color: `var(--muted-foreground)`,
                  }}
                >
                  {totalVisibleSkills} technologie{totalVisibleSkills > 1 ? 's' : ''}
                </span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-xs font-medium transition-colors duration-200 hover:underline"
                    style={{ color: `var(--primary)` }}
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>

            {/* Message si aucun résultat */}
            {searchTerm && totalVisibleSkills === 0 && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm italic"
                style={{ color: `var(--muted-foreground)` }}
              >
                Aucune technologie ne correspond à &quot;{searchTerm}&quot;.
                Essayez un autre terme.
              </motion.p>
            )}
          </motion.div>

          {/* ==================== GRILLE CATÉGORIES ==================== */}
          {visibleCategories > 0 && (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {Object.entries(portfolioData.skills).map(
                ([category, skills]) => {
                  const filteredSkills = filterSkills(skills)
                  const Icon = categoryIcons[category] || Layers
                  const accentColor =
                    categoryAccents[category] || 'var(--primary)'
                  const isActive = activeCategory === category

                  // Masquer la catégorie si aucun résultat après filtrage
                  if (searchTerm && filteredSkills.length === 0) return null

                  return (
                    <motion.div
                      key={category}
                      variants={itemVariants}
                      layout
                      onClick={() =>
                        setActiveCategory(isActive ? null : category)
                      }
                      className="group relative p-6 sm:p-7 rounded-xl border cursor-pointer transition-all duration-300"
                      style={{
                        background: `var(--card)`,
                        borderColor: isActive
                          ? accentColor
                          : `var(--card-border)`,
                        boxShadow: isActive
                          ? `var(--shadow-lg)`
                          : `var(--card-shadow)`,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = accentColor
                          e.currentTarget.style.boxShadow = `var(--shadow-md)`
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = `var(--card-border)`
                          e.currentTarget.style.boxShadow = `var(--card-shadow)`
                        }
                      }}
                    >
                      {/* Barre latérale d'activation */}
                      <motion.div
                        className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full"
                        initial={false}
                        animate={{
                          scaleY: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: EXPO_EASE }}
                        style={{ background: accentColor }}
                      />

                      {/* En-tête catégorie */}
                      <div className="flex items-center gap-3 mb-5">
                        {/* Icône */}
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{
                            background: accentColor,
                            color: `var(--primary-foreground)`,
                          }}
                        >
                          <Icon size={19} />
                        </div>

                        {/* Nom + compteur */}
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-lg font-bold truncate"
                            style={{ color: `var(--foreground)` }}
                          >
                            {category}
                          </h3>
                          <p
                            className="text-xs"
                            style={{ color: `var(--muted-foreground)` }}
                          >
                            {filteredSkills.length} compétence
                            {filteredSkills.length > 1 ? 's' : ''}
                            {searchTerm && filteredSkills.length < skills.length && (
                              <span> (filtrée{filteredSkills.length > 1 ? 's' : ''})</span>
                            )}
                          </p>
                        </div>

                        {/* Dot d'activation */}
                        {isActive && (
                          <motion.div
                            layoutId="activeCategoryDot"
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ background: accentColor }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </div>

                      {/* Tags de compétences */}
                      <motion.div
                        className="flex flex-wrap gap-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        <AnimatePresence mode="popLayout">
                          {filteredSkills.map((skill, index) => (
                            <motion.span
                              key={skill}
                              custom={index}
                              variants={tagVariants}
                              initial="hidden"
                              animate="visible"
                              exit={{
                                opacity: 0,
                                scale: 0.8,
                                transition: { duration: 0.2 },
                              }}
                              layout
                              whileHover={{
                                scale: 1.08,
                                transition: {
                                  duration: 0.25,
                                  ease: SPRING_EASE,
                                },
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="px-3 py-1.5 text-xs font-semibold rounded-full border cursor-default transition-all duration-200 select-none"
                              style={{
                                background: `${accentColor}15`,
                                color: accentColor,
                                borderColor: `${accentColor}30`,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = `${accentColor}25`
                                e.currentTarget.style.borderColor = `${accentColor}60`
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = `${accentColor}15`
                                e.currentTarget.style.borderColor = `${accentColor}30`
                              }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </AnimatePresence>

                        {/* Message si catégorie vide après filtrage */}
                        {filteredSkills.length === 0 && !searchTerm && (
                          <p
                            className="text-sm italic"
                            style={{ color: `var(--muted-foreground)` }}
                          >
                            Aucune compétence dans cette catégorie.
                          </p>
                        )}
                      </motion.div>

                      {/* Effet de brillance au hover (uniquement si non actif) */}
                      {!isActive && (
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: `linear-gradient(135deg, ${accentColor}05 0%, transparent 50%, ${accentColor}03 100%)`,
                          }}
                        />
                      )}
                    </motion.div>
                  )
                }
              )}
            </motion.div>
          )}

          {/* ==================== LÉGENDE ==================== */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 pt-4"
          >
            <span
              className="text-xs flex items-center gap-1.5"
              style={{ color: `var(--muted-foreground)` }}
            >
              <span
                className="inline-block w-4 h-0.5 rounded-full"
                style={{ background: `var(--primary)` }}
              />
              Survoler pour explorer
            </span>
            <span
              className="text-xs flex items-center gap-1.5"
              style={{ color: `var(--muted-foreground)` }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: `var(--primary)` }}
              />
              Cliquer pour sélectionner
            </span>
            <span
              className="text-xs flex items-center gap-1.5"
              style={{ color: `var(--muted-foreground)` }}
            >
              <Search size={11} />
              Filtrer par mot-clé
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}