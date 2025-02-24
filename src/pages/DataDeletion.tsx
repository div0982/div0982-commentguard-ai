import { Helmet } from 'react-helmet-async';

export default function DataDeletion() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Data Deletion Instructions - Comment-Guard</title>
      </Helmet>
      
      <h1 className="text-3xl font-bold mb-8">Data Deletion Instructions</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Delete Your Data</h2>
          <p className="mb-4">
            Comment-Guard provides multiple ways to delete your data from our systems:
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Option 1: Through the App</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Log in to your Comment-Guard account</li>
              <li>Go to Account Settings</li>
              <li>Click on "Delete Account & Data"</li>
              <li>Confirm your decision</li>
            </ol>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-3">Option 2: Email Request</h3>
            <p className="mb-2">Send a deletion request to:</p>
            <a 
              href="mailto:linglangfake2@gmail.com"
              className="text-blue-600 hover:underline"
            >
              linglangfake2@gmail.com
            </a>
            <p className="mt-2">
              Please include your Instagram username and specify that you want your data deleted.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What Data Will Be Deleted</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Your Instagram account connection</li>
            <li>Comment moderation history</li>
            <li>Account preferences and settings</li>
            <li>Any stored Instagram access tokens</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Deletion Timeline</h2>
          <p className="mb-4">
            We will process your deletion request within 30 days. You will receive an email
            confirmation once the deletion is complete.
          </p>
          <p className="text-sm text-gray-600">
            Note: Some information might be retained for legal compliance, but will be kept
            only as required by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
          <p>
            If you have any questions about data deletion, please contact us at{' '}
            <a 
              href="mailto:linglangfake2@gmail.com"
              className="text-blue-600 hover:underline"
            >
              linglangfake2@gmail.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
} 