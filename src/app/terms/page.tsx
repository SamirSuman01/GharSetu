'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TermsPage() {
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
            Terms of Service
          </span>
          <h1 className="text-5xl font-display font-light text-luxury-off-white mb-6">
            Terms of <span className="text-gradient-gold">Service</span>
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
              GharSetu provides exclusive advisory services for distinguished real estate investments
              across India. These terms establish the foundation of our professional relationship.
            </p>

            <Section title="Nature of Service">
              <p>
                GharSetu operates as a private advisory service, not a traditional real estate
                brokerage. Our role is consultative—we curate opportunities, provide market insights,
                and facilitate introductions. We do not list properties publicly nor represent sellers
                in conventional transactions.
              </p>
              <p className="text-luxury-gold/80 italic">
                Our clients value discretion, expertise, and access. We provide all three.
              </p>
            </Section>

            <Section title="Eligibility and Engagement">
              <p>
                Our services are offered by appointment only to qualified individuals seeking
                properties valued at ₹10 crore and above. Engagements begin with an initial
                consultation to ensure mutual alignment on expectations, timelines, and investment
                philosophy.
              </p>
              <p>
                We reserve the right to decline advisory relationships that do not align with our
                service model or capacity.
              </p>
            </Section>

            <Section title="Advisory Fees">
              <p>
                Consultation fees and advisory retainers are discussed privately and tailored to the
                scope of services. Success fees apply upon completed transactions and are detailed in
                individual advisory agreements.
              </p>
              <p>
                All financial terms are transparent and agreed upon in writing before services
                commence.
              </p>
            </Section>

            <Section title="Property Information">
              <p>
                While we exercise diligence in verifying property details, clients are encouraged to
                conduct independent due diligence. GharSetu provides advisory guidance, not legal or
                financial counsel. We recommend engaging qualified attorneys and financial advisors for
                transaction execution.
              </p>
            </Section>

            <Section title="Confidentiality Obligations">
              <p>
                Information shared during consultations—your interests, financial position, and
                portfolio strategy—remains confidential. Similarly, details of properties we present,
                including seller identities and pricing, must not be disclosed without permission.
              </p>
              <p className="text-luxury-off-white/60">
                Mutual discretion protects everyone's interests and preserves market integrity.
              </p>
            </Section>

            <Section title="Limitation of Liability">
              <p>
                GharSetu's liability is limited to the advisory fees paid for services rendered. We are
                not liable for market fluctuations, regulatory changes, or third-party actions beyond
                our control. Investment decisions remain the client's responsibility.
              </p>
            </Section>

            <Section title="Intellectual Property">
              <p>
                Market analyses, property dossiers, and strategic recommendations prepared by GharSetu
                are proprietary. These materials are provided exclusively for client use and may not be
                reproduced or shared without authorization.
              </p>
            </Section>

            <Section title="Termination">
              <p>
                Either party may conclude the advisory relationship with written notice. Outstanding
                fees remain due, and confidentiality obligations persist indefinitely.
              </p>
            </Section>

            <Section title="Representations and Warranties">
              <p>
                Clients represent that they have the financial capacity to acquire properties within
                their stated investment range. GharSetu assumes good faith in all client
                representations regarding intent and ability to transact.
              </p>
              <p>
                We make no warranties regarding future property appreciation, market conditions, or
                investment returns. Real estate markets fluctuate, and past performance does not
                guarantee future results.
              </p>
            </Section>

            <Section title="Exclusivity and Non-Circumvention">
              <p>
                Properties presented through GharSetu's advisory services are subject to exclusivity
                agreements. Clients agree not to circumvent our introduction by directly approaching
                sellers or their representatives without our involvement.
              </p>
              <p>
                Violation of non-circumvention terms may result in claims for advisory fees and legal
                remedies.
              </p>
            </Section>

            <Section title="Professional Conduct">
              <p>
                We maintain professional standards in all interactions. Clients are expected to conduct
                themselves professionally in property viewings, negotiations, and communications with
                third parties introduced through our services.
              </p>
            </Section>

            <Section title="Force Majeure">
              <p>
                Neither party is liable for delays or failures due to circumstances beyond reasonable
                control—including natural disasters, regulatory changes, market disruptions, or
                political instability.
              </p>
            </Section>

            <Section title="Severability">
              <p>
                If any provision of these terms is found unenforceable, the remaining provisions
                continue in full effect. Invalid terms will be modified minimally to become
                enforceable while preserving intent.
              </p>
            </Section>

            <Section title="Entire Agreement">
              <p>
                These terms, together with individual advisory agreements, constitute the complete
                understanding between parties. Oral representations or prior agreements are superseded
                by these written terms.
              </p>
            </Section>

            <Section title="Amendments">
              <p>
                We may update these terms periodically. Material changes affecting existing clients
                will be communicated directly. Continued engagement after amendments constitutes
                acceptance.
              </p>
            </Section>

            <Section title="Governing Law">
              <p>
                These terms are governed by Indian law. Disputes are resolved through private
                arbitration in New Delhi under the Arbitration and Conciliation Act, 1996, maintaining
                confidentiality throughout proceedings.
              </p>
              <p>
                Arbitration awards are final and binding. The parties waive rights to court litigation
                except for enforcement of arbitration awards.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                For questions regarding these terms, contact us at{' '}
                <a href="mailto:legal@gharsetu.com" className="text-luxury-gold hover:underline">
                  legal@gharsetu.com
                </a>
                . We respond to all inquiries within 48 hours.
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
