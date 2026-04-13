import { Metadata } from "next";
import AddressGeneratorClient from "@/components/AddressGeneratorClient";

export const metadata: Metadata = {
  title: "Fake Address Generator | Random Identity & Address by Country",
  description: "Generate highly realistic fake addresses, names, and phone numbers for testing, QA, and development. Supports US, UK, Canada, Germany, and more.",
  keywords: ["fake address generator", "random identity generator", "test data generator", "mock address", "fake phone number"],
  openGraph: {
    title: "Fake Address Generator - Professional Test Data",
    description: "Generate highly realistic fake addresses, names, and phone numbers for testing and development.",
    type: "website",
    url: "https://your-production-domain.com",
  },
  alternates: {
    canonical: "https://your-production-domain.com",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Fake Address Generator",
    "description": "A professional tool to generate fake, highly realistic identities and addresses for software testing.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Fake Address Generator
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Generate highly realistic, localized testing data instantly. Perfect for QA environments, database seeding, and application mockups.
          </p>
        </div>

        <AddressGeneratorClient />
      </div>
    </main>
  );
}
