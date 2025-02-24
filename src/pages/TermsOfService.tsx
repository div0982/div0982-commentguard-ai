import { Helmet } from 'react-helmet-async';

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Terms of Service - Comment-Guard</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using Comment-Guard, you accept and agree to be bound by the terms
            and conditions of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            Comment-Guard provides AI-powered comment moderation services for Instagram accounts.
            We help users manage and moderate comments on their Instagram posts using artificial
            intelligence and customizable rules.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Instagram Platform Rules</h2>
          <p className="mb-4">
            Users must comply with Instagram's Platform Policy and Terms of Use. Comment-Guard
            is not affiliated with Instagram and users are responsible for ensuring their use
            of our service complies with Instagram's policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Maintain the security of your account credentials</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Not use the service for any illegal or unauthorized purpose</li>
            <li>Not interfere with the proper operation of the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Data Usage and Privacy</h2>
          <p className="mb-4">
            Your use of Comment-Guard is also governed by our Privacy Policy. By using
            Comment-Guard, you agree to our collection and use of information as detailed
            in the Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. We will notify users
            of any material changes via email or through the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
          <p>
            For questions about these Terms, contact us at{' '}
            <a href="mailto:linglangfake2@gmail.com" className="text-blue-600 hover:underline">
              linglangfake2@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
} 