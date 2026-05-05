import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Header Section */}
        <div className="space-y-4 border-b border-border pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Effective Date: May 5, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section className="space-y-4">
            <p>
              At FoodHub, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our food delivery services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>We collect information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us, or otherwise when you contact us.</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Personal Data:</strong> Name, email address, delivery address, and phone number.</li>
              <li><strong className="text-foreground">Payment Data:</strong> Credit card numbers and billing information (processed securely via our third-party payment gateways).</li>
              <li><strong className="text-foreground">Usage Data:</strong> Information about how you interact with our website, including order history and preferred restaurants.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>We use personal information collected via our platform for a variety of business purposes described below:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To facilitate account creation and logon process.</li>
              <li>To fulfill and manage your orders, payments, returns, and exchanges.</li>
              <li>To deliver the requested food orders to your location.</li>
              <li>To send administrative information to you, such as order confirmations and updates.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Sharing Your Information</h2>
            <p>
              We only share information with your consent, to comply with laws, to provide you with services (such as sharing your address with our delivery drivers and restaurant partners), to protect your rights, or to fulfill business obligations. We do not sell your personal data to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please navigate to your account settings or contact support.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}