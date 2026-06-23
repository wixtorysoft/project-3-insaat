'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, Users, HardHat, MapPin } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { stats as statsData } from '@/data/content'

const iconMap = {
  completedProjects: Building2,
  happyClients: Users,
  yearsExperience: HardHat,
  cities: MapPin,
} as const

function CounterValue({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000
    const increment = value / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text tabular-nums">
      {count.toLocaleString('tr-TR')}{suffix}
    </span>
  )
}

export default function Stats() {
  const { t } = useI18n()

  const statLabels = {
    completedProjects: t.stats.completedProjects,
    happyClients: t.stats.happyClients,
    yearsExperience: t.stats.yearsExperience,
    cities: t.stats.cities,
  }

  const statDescs = {
    completedProjects: t.stats.completedDesc,
    happyClients: t.stats.happyClientsDesc,
    yearsExperience: t.stats.yearsDesc,
    cities: t.stats.citiesDesc,
  }

  return (
    <section className="relative py-16 sm:py-20">
      <div className="section-divider mb-16" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsData.map((stat, index) => {
            const Icon = iconMap[stat.key]
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="glass card-hover shine-effect rounded-2xl p-5 sm:p-6 lg:p-8 flex flex-col items-center text-center h-full">
                  {/* Icon - centered above number */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>

                  {/* Number - fixed height container */}
                  <div className="h-12 sm:h-14 lg:h-16 flex items-center justify-center mb-3">
                    <CounterValue value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-foreground leading-tight">
                    {statLabels[stat.key]}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-snug">
                    {statDescs[stat.key]}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
