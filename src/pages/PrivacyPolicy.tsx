import { Helmet } from 'react-helmet-async';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Privacy Policy - Comment-Guard</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">When you use Comment-Guard, we collect:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Instagram account information (when you connect your account)</li>
            <li>Comment data from your Instagram posts</li>
            <li>Settings and preferences you configure in Comment-Guard</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide comment moderation services</li>
            <li>Improve our AI moderation algorithms</li>
            <li>Send you important notifications about your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
          <p className="mb-4">
            We implement industry-standard security measures to protect your data.
            Your Instagram access tokens are encrypted and stored securely.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Deletion</h2>
          <p className="mb-4">
            You can request deletion of your data by:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Using the "Delete Account" option in your account settings</li>
            <li>Emailing our support team at linglangfake2@gmail.com</li>
            <li>Disconnecting your Instagram account from Comment-Guard</li>
          </ul>
          <p>
            We will process deletion requests within 30 days. Some data may be retained
            for legal compliance purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:linglangfake2@gmail.com" className="text-blue-600 hover:underline">
              linglangfake2@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
} 