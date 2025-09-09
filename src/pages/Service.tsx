import React, { useState } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

type TierId = 'basic' | 'professional' | 'premium';

interface Tier {
  id: TierId;
  name: string;
  price: number;
  features: string[];
  icon: string;
}

interface Category {
  id: 'web' | 'security' | 'app';
  name: string;
  color: 'blue' | 'red' | 'green';
  tiers: Tier[];
}

const categories: Category[] = [
  {
    id: 'web',
    name: 'Web Development',
    color: 'blue',
    tiers: [
      { id: 'basic', name: 'Basic Pack', price: 8000, icon: 'lucide:layout-template', features: [
        '1–3 responsive pages',
        'Contact form with email notifications',
        'Basic on‑page SEO (meta, sitemap, robots)',
        'SSL setup and security headers',
        '1 round of revisions',
        'Delivery within 5–7 days'
      ] },
      { id: 'professional', name: 'Professional Pack', price: 15000, icon: 'lucide:rocket', features: [
        'Up to 10 pages with headless CMS',
        'Performance optimization (Lighthouse > 90)',
        'SEO schema, OpenGraph and social cards',
        'Form handling + analytics + email automation',
        '2 rounds of revisions',
        'Staging + production deployment'
      ] },
      { id: 'premium', name: 'Premium Pack', price: 25000, icon: 'lucide:crown', features: [
        'Custom full‑stack features and integrations',
        'Advanced animations and micro‑interactions',
        'Accessibility AA compliance',
        'Content migration + backup strategy',
        'Priority support for 60 days',
        'CI/CD pipeline and monitoring'
      ] }
    ]
  },
  {
    id: 'security',
    name: 'Cyber Security',
    color: 'red',
    tiers: [
      { id: 'basic', name: 'Basic Pack', price: 7000, icon: 'lucide:shield-check', features: [
        'Automated vulnerability scan',
        'Security hardening checklist',
        'Risk summary with quick wins',
        'HTTPS, HSTS and CSP review',
        'One retest after fixes',
        'Executive PDF report'
      ] },
      { id: 'professional', name: 'Professional Pack', price: 14000, icon: 'lucide:radar', features: [
        'Manual web app pentest',
        'OWASP Top 10 + business logic testing',
        'Source code review (sampled)',
        'Threat modeling workshop',
        'Fix validation with proof',
        'Detailed technical report'
      ] },
      { id: 'premium', name: 'Premium Pack', price: 24000, icon: 'lucide:shield-plus', features: [
        'Continuous monitoring and alerting',
        'Red team simulations and phishing tests',
        'SIEM dashboards and weekly health checks',
        'Compliance mapping (ISO 27001/PCI DSS)',
        'Incident response playbooks',
        'Monthly executive briefing'
      ] }
    ]
  },
  {
    id: 'app',
    name: 'App Development',
    color: 'green',
    tiers: [
      { id: 'basic', name: 'Basic Pack', price: 12000, icon: 'lucide:smartphone', features: [
        'MVP with 3–5 core screens',
        'Android or iOS build',
        'Crash analytics + basic logging',
        'Simple local storage',
        '1 revision cycle',
        'Submission guidance'
      ] },
      { id: 'professional', name: 'Professional Pack', price: 22000, icon: 'lucide:app-window', features: [
        'Cross‑platform (Android + iOS) app',
        'Auth, API integration and pagination',
        'Design system + dark mode',
        'App Store/Play Store deployment',
        'E2E and unit tests',
        'Analytics and crash reporting'
      ] },
      { id: 'premium', name: 'Premium Pack', price: 35000, icon: 'lucide:sparkle', features: [
        'Offline mode with background sync',
        'Push notifications and deep links',
        'Modular architecture with CI/CD',
        'Performance budget and profiling',
        '3 months premium support',
        'Product growth dashboards'
      ] }
    ]
  }
];

const colorStyles = {
  blue: {
    ring: 'ring-blue-200',
    header: 'text-blue-700',
    price: 'text-blue-600',
    btn: 'bg-blue-600 hover:bg-blue-700',
    chip: 'bg-blue-50 text-blue-700'
  },
  red: {
    ring: 'ring-red-200',
    header: 'text-red-700',
    price: 'text-red-600',
    btn: 'bg-red-600 hover:bg-red-700',
    chip: 'bg-red-50 text-red-700'
  },
  green: {
    ring: 'ring-green-200',
    header: 'text-green-700',
    price: 'text-green-600',
    btn: 'bg-green-600 hover:bg-green-700',
    chip: 'bg-green-50 text-green-700'
  }
};

const TierCard: React.FC<{ tier: Tier; color: keyof typeof colorStyles }>= ({ tier, color }) => (
  <Card className={`border border-foreground-200 card-hover hover:shadow-2xl transition-all ring-1 ${colorStyles[color].ring} bg-content1/60 backdrop-blur`}> 
    <CardHeader className="flex items-center gap-3 justify-center">
      <Icon icon={tier.icon} className={`${colorStyles[color].header}`} width={28} height={28} />
      <h3 className="text-xl font-semibold">{tier.name}</h3>
    </CardHeader>
    <CardBody>
      <div className="text-center mb-4">
        <span className={`text-3xl font-bold ${colorStyles[color].price}`}>৳{tier.price.toLocaleString()}</span>
        <span className="text-sm text-foreground-500"> / project</span>
      </div>
      <ul className="space-y-2 text-sm text-foreground-600">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <Icon icon="lucide:check" className="text-success" width={18} height={18} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </CardBody>
    <CardFooter className="justify-center">
      <Button as="a" href="/contact" className={`${colorStyles[color].btn} text-white`}>Hire Now</Button>
    </CardFooter>
  </Card>
);

const Service: React.FC = () => {
  const [active, setActive] = useState<Category['id']>('web');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Service Packs Charts</h1>
        <p className="text-foreground-500 mt-2">Web Development • Cyber Security • App Development</p>
      </div>

      <div className="flex justify-center mb-8 gap-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`px-5 py-2 rounded-full border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-foreground-900 ${active === c.id 
              ? 'bg-foreground-900 text-white dark:bg-content3 dark:text-foreground-50' 
              : 'text-foreground-700 border-foreground-300 hover:bg-foreground-100 dark:text-foreground-300 dark:border-foreground-700 dark:hover:bg-content2'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {categories.map((c) => (
        <div key={c.id} className={`${active === c.id ? 'block' : 'hidden'}`}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${colorStyles[c.color].header}`}>{c.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.tiers.map((t) => (
              <TierCard key={t.id} tier={t} color={c.color} />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border bg-content1">
          <Icon icon="lucide:info" />
          <span>Custom requirements? Get a tailored quote.</span>
        </div>
        <div className="mt-4">
          <Button as="a" href="/contact" color="primary" variant="flat">Get Custom Quote</Button>
        </div>
      </div>
    </div>
  );
};

export default Service;
