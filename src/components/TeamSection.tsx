'use client'

import { motion } from 'framer-motion'
import { Card3D } from '@/components/Card3D'

interface TeamMember {
  id: number
  name: string
  role: string
  image: string
  bio: string
  email: string
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Arjun Mehta',
    role: 'Private Advisor',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=800&q=80',
    bio: "Advising select families on distinguished addresses across India's most coveted locations.",
    email: 'advisory@gharsetu.com',
  },
  {
    id: 2,
    name: 'Naina Kapoor',
    role: 'Private Advisor',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
    bio: 'Facilitating discreet acquisitions for discerning clientele seeking exceptional properties.',
    email: 'advisory@gharsetu.com',
  },
]

export function TeamSection() {
  return (
    <section
      id="team"
      className="py-32 bg-gradient-to-b from-luxury-slate to-luxury-charcoal relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-[120px]" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="inline-block px-5 py-2 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-6"
          >
            Advisory
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-display font-display font-light text-luxury-off-white mb-6"
          >
            Private <span className="text-gradient-gold">Advisors</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="text-xl text-luxury-off-white/70 max-w-2xl mx-auto font-light"
          >
            Representing select clients by appointment only.
          </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 1.2 }}
              className="group"
            >
              <Card3D maxTilt={6} className="h-full">
                <div className="relative glass-dark rounded-2xl overflow-hidden border border-luxury-off-white/5 hover:border-luxury-gold/20 transition-all duration-800 h-full">
                {/* Avatar */}
                <div className="relative h-96 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-luxury-charcoal z-10" />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-display font-light text-luxury-off-white mb-2 group-hover:text-luxury-gold transition-colors duration-800">
                    {member.name}
                  </h3>
                  <p className="text-luxury-gold/80 text-xs font-light mb-6 tracking-wider uppercase">
                    {member.role}
                  </p>
                  <p className="text-luxury-off-white/60 text-sm font-light leading-relaxed mb-8">
                    {member.bio}
                  </p>

                  {/* Minimal Contact Info */}
                  <div className="space-y-3 text-sm">
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 text-luxury-off-white/50 hover:text-luxury-gold transition-colors duration-800 font-light"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
