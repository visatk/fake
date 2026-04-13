"use client";

import { useState, useEffect } from "react";
import { Copy, RefreshCw, CheckCircle2, Globe } from "lucide-react";

type Identity = {
  fullName: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  company: string;
  jobTitle: string;
};

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
];

export default function AddressGeneratorClient() {
  const [identity, setIdentity] = useState<Identity | null>(null);
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const fetchIdentity = async (selectedCountry: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/generate?country=${selectedCountry}`);
      const data = await res.json();
      setIdentity(data);
    } catch (error) {
      console.error("Failed to generate identity");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdentity(country);
  }, []);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const FieldRow = ({ label, value, fieldId }: { label: string; value: string; fieldId: string }) => (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg group hover:border-blue-500 transition-colors">
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{label}</span>
        <span className="text-neutral-900 dark:text-neutral-100 font-medium">{value}</span>
      </div>
      <button
        onClick={() => handleCopy(value, fieldId)}
        className="p-2 text-neutral-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all"
        aria-label={`Copy ${label}`}
      >
        {copiedField === fieldId ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
      </button>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-neutral-900 p-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto relative flex-1">
          <Globe className="w-5 h-5 text-neutral-500 absolute left-3" />
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              fetchIdentity(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none font-medium"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => fetchIdentity(country)}
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-70"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
          Generate New
        </button>
      </div>

      {/* Results Board */}
      {identity && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm">1</span>
              Personal Details
            </h3>
            <FieldRow label="Full Name" value={identity.fullName} fieldId="name" />
            <FieldRow label="Gender" value={identity.gender} fieldId="gender" />
            <FieldRow label="Date of Birth" value={identity.dob} fieldId="dob" />
            <FieldRow label="Email Address" value={identity.email} fieldId="email" />
            <FieldRow label="Phone Number" value={identity.phone} fieldId="phone" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm">2</span>
              Address & Employment
            </h3>
            <FieldRow label="Street Address" value={identity.address.street} fieldId="street" />
            <FieldRow label="City" value={identity.address.city} fieldId="city" />
            <FieldRow label="State / Province" value={identity.address.state} fieldId="state" />
            <FieldRow label="Zip / Postal Code" value={identity.address.zipCode} fieldId="zip" />
            <FieldRow label="Company" value={identity.company} fieldId="company" />
          </div>
        </div>
      )}
    </div>
  );
}
