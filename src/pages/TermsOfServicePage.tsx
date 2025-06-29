const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container-max py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">Last updated: December 26, 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
            
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Field & Foyer website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Field & Foyer provides premium pet waste removal and home care services. Our website allows customers to request estimates, schedule services, and manage their accounts.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>Users agree to:</p>
            <ul>
              <li>Provide accurate and complete information when submitting forms</li>
              <li>Maintain the confidentiality of any account credentials</li>
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to interfere with the proper functioning of the website</li>
            </ul>

            <h2>4. Service Availability</h2>
            <p>
              We strive to maintain continuous service availability but do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
            </p>

            <h2>5. Privacy and Data Collection</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your information.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              Field & Foyer shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
            </p>

            <h2>7. Service Terms</h2>
            <p>
              Specific terms for our pet waste removal and home care services, including scheduling, cancellation policies, and service guarantees, are provided separately upon service agreement.
            </p>

            <h2>8. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of Field & Foyer and is protected by copyright and other intellectual property laws.
            </p>

            <h2>9. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Your continued use of the service constitutes acceptance of any modifications.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the State of Georgia, without regard to its conflict of law provisions.
            </p>

            <h2>11. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Field & Foyer</strong><br />
              Email: customersupport@fieldandfoyer.com<br />
              Phone: (770) 547-8457</p>
            </div>

            <h2>12. Severability</h2>
            <p>
              If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining terms will remain in full force and effect.
            </p>

          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsOfServicePage
