'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'privacy' | 'terms'
}

export function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  const isPrivacy = type === 'privacy'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Invisible Backdrop - only for closing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-4xl max-h-[90vh] glass-dark rounded-3xl overflow-hidden border border-luxury-gold/20 shadow-2xl pointer-events-auto flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-luxury-charcoal/95 backdrop-blur-xl border-b border-luxury-off-white/5 p-8 z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block px-4 py-1.5 glass-gold rounded-full text-xs font-medium text-luxury-gold tracking-[0.2em] uppercase mb-3">
                      {isPrivacy ? 'Confidentiality' : 'Terms of Service'}
                    </span>
                    <h2 className="text-3xl font-display font-light text-luxury-off-white">
                      {isPrivacy ? (
                        <>
                          Privacy <span className="text-gradient-gold">Policy</span>
                        </>
                      ) : (
                        <>
                          Terms of <span className="text-gradient-gold">Service</span>
                        </>
                      )}
                    </h2>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center glass rounded-full hover:bg-luxury-off-white/10 transition-all duration-300 group"
                  >
                    <svg
                      className="w-5 h-5 text-luxury-off-white/70 group-hover:text-luxury-off-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto p-8 space-y-8">
                {isPrivacy ? <PrivacyContent /> : <TermsContent />}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function PrivacyContent() {
  return (
    <div className="prose prose-invert max-w-none">
      <div className="text-luxury-off-white/70 font-light leading-relaxed space-y-6">
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

        <p className="text-sm text-luxury-off-white/50 pt-4 border-t border-luxury-off-white/10">
          Last updated: January 2026
        </p>
      </div>
    </div>
  )
}

function TermsContent() {
  return (
    <div className="prose prose-invert max-w-none">
      <div className="text-luxury-off-white/70 font-light leading-relaxed space-y-6">
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

        <p className="text-sm text-luxury-off-white/50 pt-4 border-t border-luxury-off-white/10">
          Last updated: January 2026
        </p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-xl font-display font-light text-luxury-off-white mb-3">{title}</h3>
      <div className="space-y-3 text-luxury-off-white/60">{children}</div>
    </section>
  )
}
