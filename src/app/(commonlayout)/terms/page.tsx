import React from 'react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl space-y-12">
        {/* Header Section */}
        <div className="space-y-4 border-b border-border pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Terms of <span className="text-primary">Service</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Last updated: May 5, 2026
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-8 text-foreground/90 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using FoodHub, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. User Accounts</h2>
            <p>
              To use certain features of the platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Ordering and Payment</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Pricing:</strong> All prices listed on FoodHub are subject to change. The final price, including taxes and delivery fees, will be displayed at checkout.</li>
              <li><strong className="text-foreground">Payments:</strong> We accept major credit cards and other payment methods as indicated on the site. You agree to pay all charges incurred by you or any users of your account.</li>
              <li><strong className="text-foreground">Cancellations:</strong> Order cancellations must be made within the window specified by the individual restaurant partner.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Delivery</h2>
            <p>
              Delivery times are estimates and cannot be guaranteed. FoodHub is not liable for delays caused by factors outside our control, including traffic, weather conditions, or restaurant preparation times.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Prohibited Conduct</h2>
            <p>
              You agree not to engage in any of the following prohibited activities: copying, distributing, or disclosing any part of the service in any medium; using any automated system to access the service; attempting to interfere with the system integrity or security.
            </p>
          </section>

          <section className="space-y-4 p-6 bg-card border border-border rounded-lg mt-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at <a href="mailto:support@foodhub.com" className="text-primary hover:underline">support@foodhub.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}