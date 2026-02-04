'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-luxury-charcoal py-24">
      <div className="container-luxury max-w-4xl">
        {/* Back Button */}
        <Link href="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="mb-8 flex items-center gap-2 text-luxury-off-white/70 hover:text-luxury-gold transition-colors duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="inline-block px-4 py-1.5 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-4">
            Confidentiality
          </span>
          <h1 className="text-5xl font-display font-light text-luxury-off-white mb-6">
            Privacy <span className="text-gradient-gold">Policy</span>
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <div className="text-luxury-off-white/70 font-light leading-relaxed space-y-8">
            <p className="text-lg text-luxury-off-white/80">
              At GharSetu, discretion is fundamental to our service. We understand that privacy is not
              a luxury—it is a necessity for discerning clientele.
            </p>

            <Section title="Our Commitment to Confidentiality">
              <p>
                Your engagement with GharSetu is handled with the utmost confidentiality. Every
                inquiry, consultation, and transaction is protected by strict internal protocols
                designed to safeguard your personal information and property interests.
              </p>
              <p>
                We collect only essential information required to provide exceptional advisory
                services: your name, contact details, property preferences, and investment criteria.
                This information is never shared, sold, or disclosed to third parties without your
                explicit consent.
              </p>
            </Section>

            <Section title="How We Protect Your Information">
              <ul className="list-disc list-inside space-y-2 text-luxury-off-white/60">
                <li>End-to-end encryption for all digital communications</li>
                <li>Secure, private servers with multi-factor authentication</li>
                <li>Limited access protocols—only senior advisors handle client data</li>
                <li>Regular security audits by independent third parties</li>
                <li>Confidential documentation with watermarked materials</li>
              </ul>
            </Section>

            <Section title="Data Collection and Usage">
              <p>
                We collect information solely to serve you better. Your preferences, investment
                parameters, and location interests help us curate a selection of properties that align
                with your vision. This data remains within our advisory team and is never used for
                marketing purposes beyond your explicit requests.
              </p>
              <p className="text-luxury-gold/80 italic">
                Your portfolio remains yours alone. We do not track, analyze, or monetize your
                browsing behavior.
              </p>
            </Section>

            <Section title="Third-Party Services">
              <p>
                On rare occasions, we may engage specialized legal or financial professionals to
                facilitate transactions. These partners are bound by the same confidentiality
                agreements we uphold and are selected for their discretion and expertise.
              </p>
            </Section>

            <Section title="Your Rights">
              <p>
                You maintain complete control over your information. At any time, you may:
              </p>
              <ul className="list-disc list-inside space-y-2 text-luxury-off-white/60">
                <li>Request a complete record of data we hold</li>
                <li>Update or correct any information</li>
                <li>Request deletion of your data from our systems</li>
                <li>Withdraw consent for future communications</li>
              </ul>
            </Section>

            <Section title="Retention and Deletion">
              <p>
                We retain your information only as long as necessary to provide services or as required
                by law. Inactive client records are archived after 24 months and permanently deleted
                after 5 years, unless ongoing advisory relationships exist.
              </p>
              <p>
                Transaction records are maintained for legal and tax purposes as mandated by Indian
                regulatory authorities. These records are stored securely and accessed only when
                required.
              </p>
            </Section>

            <Section title="International Data Transfer">
              <p>
                Your data remains within India. We do not transfer personal information to
                international servers or third parties outside Indian jurisdiction. All data storage
                and processing occurs within secure Indian facilities.
              </p>
            </Section>

            <Section title="Cookies and Tracking">
              <p>
                Our website uses minimal, essential cookies for functionality. We do not employ
                tracking pixels, advertising cookies, or analytics that identify individual users. Your
                browsing activity remains private.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                We may update this policy to reflect changes in our practices or legal requirements.
                Significant changes will be communicated directly to active clients. Continued use of
                our services after updates constitutes acceptance of revised terms.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                For any privacy-related inquiries, please contact our privacy officer directly at{' '}
                <a href="mailto:privacy@gharsetu.com" className="text-luxury-gold hover:underline">
                  privacy@gharsetu.com
                </a>
                . Your concerns will be addressed promptly and personally.
              </p>
            </Section>

            <p className="text-sm text-luxury-off-white/50 pt-8 border-t border-luxury-off-white/10">
              Last updated: January 2025
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-display font-light text-luxury-off-white mb-4">{title}</h2>
      <div className="space-y-4 text-luxury-off-white/60">{children}</div>
    </section>
  )
}
