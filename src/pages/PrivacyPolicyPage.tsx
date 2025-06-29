const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="container-max py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: December 26, 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-max max-w-4xl">
          <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
            
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you:</p>
            <ul>
              <li>Submit a contact form or request an estimate</li>
              <li>Schedule or modify services</li>
              <li>Communicate with us via phone, email, or other channels</li>
              <li>Provide feedback or reviews</li>
            </ul>

            <h3>Personal Information</h3>
            <p>This may include:</p>
            <ul>
              <li>Name and contact information (email, phone, address)</li>
              <li>Service preferences and special instructions</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Communication history and service records</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Communicate about services, offers, and events</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>

            <h2>3. Information Sharing and Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties except:</p>
            <ul>
              <li><strong>Service Providers:</strong> We may share information with contractors and service providers who assist in our operations</li>
              <li><strong>Business Management:</strong> We use Jobber software to manage customer relationships and service scheduling</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of company assets</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide services, comply with legal obligations, resolve disputes, and enforce agreements. Service records may be retained for business and tax purposes.
            </p>

            <h2>6. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your personal information</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
            </p>

            <h2>8. Third-Party Services</h2>
            <p>Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites.</p>

            <h2>9. Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p><strong>Field & Foyer</strong><br />
              Email: support@fieldandfoyer.com<br />
              Phone: (770) 547-8457<br />
              Address: Greater Metro Area, Georgia</p>
            </div>

            <h2>12. California Privacy Rights</h2>
            <p>
              California residents may have additional rights under the California Consumer Privacy Act (CCPA). Please contact us for more information about exercising these rights.
            </p>

          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicyPage
