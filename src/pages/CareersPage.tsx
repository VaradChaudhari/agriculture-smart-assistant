import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Clock,
  MapPin,
  Sparkles,
  Globe,
  Heart,
  BookOpen,
  Users,
  ShieldCheck,
  Trophy,
  CheckCircle,
  Mail,
} from 'lucide-react';
import CareersPopupModal from '@/components/CareersPopupModal';

const heroStats = [
  { label: 'Talented team members', value: '120+' },
  { label: 'Countries served', value: '10' },
  { label: 'Open roles', value: '14' },
];

const careerValues = [
  {
    title: 'Mission-driven work',
    description: 'Build AI-enabled tools that help small farmers increase yield, access markets, and reduce risk.',
    icon: Sparkles,
  },
  {
    title: 'Flexible collaboration',
    description: 'Work remotely, stay connected, and join flexible teams that adapt to farming seasons.',
    icon: Globe,
  },
  {
    title: 'Data-inspired products',
    description: 'Turn field insights into simple tools for better decisions and smarter operations.',
    icon: Briefcase,
  },
  {
    title: 'Impact for agriculture',
    description: 'Deliver tools that help communities scale sustainably and improve crop resilience.',
    icon: Heart,
  },
  {
    title: 'Growth & mentorship',
    description: 'Learn from product, AI, and agri experts while you help build the next generation of farm technology.',
    icon: BookOpen,
  },
  {
    title: 'High-performance culture',
    description: 'Join a supportive team that moves fast, stays curious, and celebrates every milestone.',
    icon: Trophy,
  },
];

const openPositions = [
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote / India',
    employment: 'Full-time',
    badge: 'Design',
  },
  {
    title: 'Software Engineer - Frontend',
    department: 'Engineering',
    location: 'Remote / India',
    employment: 'Full-time',
    badge: 'Engineering',
  },
  {
    title: 'Machine Learning Engineer',
    department: 'Engineering',
    location: 'Remote / India',
    employment: 'Full-time',
    badge: 'AI',
  },
  {
    title: 'Growth Marketing Lead',
    department: 'Marketing',
    location: 'Hybrid / Delhi',
    employment: 'Full-time',
    badge: 'Marketing',
  },
  {
    title: 'Customer Success Manager',
    department: 'Customer',
    location: 'Remote / India',
    employment: 'Full-time',
    badge: 'Customer',
  },
  {
    title: 'Field Operations Specialist',
    department: 'Operations',
    location: 'Gujarat, India',
    employment: 'Full-time',
    badge: 'Operations',
  },
];

const cultureHighlights = [
  {
    title: 'Open collaboration',
    description: 'We share ideas across product, engineering, and field teams to build better solutions together.',
    icon: Users,
  },
  {
    title: 'Data-backed decisions',
    description: 'We use farmer feedback and regional data to shape every roadmap decision.',
    icon: CheckCircle,
  },
  {
    title: 'Empowerment by trust',
    description: 'Every team member owns their work and delivers impact with autonomy and support.',
    icon: ShieldCheck,
  },
  {
    title: 'Sustainable innovation',
    description: 'We build products that protect livelihoods and preserve natural resources.',
    icon: Heart,
  },
];

const hiringSteps = [
  {
    step: '1. Quick application',
    description: 'Share your resume and a short note about why AgriSmart is the right place for you.',
  },
  {
    step: '2. Values interview',
    description: 'Meet with hiring managers to discuss experience, ownership, and product fit.',
  },
  {
    step: '3. Work sample review',
    description: 'Show your best work, whether it is design prototypes, code demos, or customer success stories.',
  },
  {
    step: '4. Team match',
    description: 'Join a final conversation with the team you will collaborate with day-to-day.',
  },
];

const employeePerks = [
  {
    title: 'Flexible work style',
    description: 'Remote-first collaboration with optional in-person sessions and field visits.',
    icon: Clock,
  },
  {
    title: 'Health & wellness',
    description: 'Competitive health coverage and wellness support for you and your family.',
    icon: Heart,
  },
  {
    title: 'Learning stipend',
    description: 'Monthly access to courses, mentorship, and conferences to grow your skills.',
    icon: BookOpen,
  },
  {
    title: 'Farm innovation budget',
    description: 'Resources to run piloting programs with farmers and test new product ideas.',
    icon: Sparkles,
  },
  {
    title: 'Recognition & rewards',
    description: 'Regular performance reviews and incentive programs for exceptional outcomes.',
    icon: Trophy,
  },
];

const teamImpact = [
  { value: '30K+', label: 'Farmers supported' },
  { value: '6M+', label: 'Acres monitored' },
  { value: '4.9/5', label: 'Partner satisfaction' },
  { value: '75%', label: 'Growth year-over-year' },
];

export default function CareersPage() {
  const [filter, setFilter] = useState('All');
  const [activePopup, setActivePopup] = useState<'openRoles' | 'talkTalent' | 'applicationInstructions' | 'contactHiring' | 'currentPositions' | null>(null);
  const departments = useMemo(
    () => ['All', ...Array.from(new Set(openPositions.map((position) => position.department)))],
    []
  );

  const filteredPositions = useMemo(
    () => (filter === 'All' ? openPositions : openPositions.filter((position) => position.department === filter)),
    [filter]
  );

  return (
    <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-lime-500 py-20 sm:py-28">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.25),_transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                  Build technology for the future of agriculture
                </span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }} className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Careers at AgriSmart
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.16 }} className="max-w-2xl text-base leading-8 text-emerald-100 sm:text-lg">
                Join a team that combines AI, product design, and on-the-ground agriculture expertise to deliver tools farmers can trust.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.24 }} className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setActivePopup('openRoles')}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Explore open roles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActivePopup('talkTalent')}
                  className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/20"
                >
                  Talk to talent team
                </button>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-2xl shadow-slate-950/10 backdrop-blur-xl sm:p-10">
              <div className="space-y-6">
                <div className="rounded-3xl border border-white/15 bg-white/10 p-6 text-white">
                  <p className="text-sm uppercase tracking-[0.35em] text-emerald-100">Why join AgriSmart</p>
                  <p className="mt-4 text-3xl font-semibold">Impact-driven roles with measurable field outcomes.</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {heroStats.map((stat) => (
                    <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/10 p-5 text-white">
                      <p className="text-3xl font-semibold">{stat.value}</p>
                      <p className="mt-2 text-sm text-emerald-100">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Our culture</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Designed for bold thinkers who want to move agriculture forward.</h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">We invest in people who can connect technology with farmer needs, deliver clarity across teams, and drive measurable outcomes.</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {careerValues.map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="open-roles" className="bg-white py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Open positions</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Find the role that fits your strengths.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {departments.map((department) => (
                <button
                  key={department}
                  onClick={() => setFilter(department)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${filter === department ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-slate-300 bg-white text-slate-600 hover:border-emerald-500 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500'}`}
                >
                  {department}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {filteredPositions.map((role) => (
              <motion.article
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">{role.badge}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{role.title}</h3>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">{role.employment}</span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm dark:bg-slate-950 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-white">Location</p>
                    <p className="mt-2">{role.location}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm dark:bg-slate-950 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-white">Department</p>
                    <p className="mt-2">{role.department}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 text-sm text-slate-600 shadow-sm dark:bg-slate-950 dark:text-slate-300">
                    <p className="font-semibold text-slate-900 dark:text-white">Team size</p>
                    <p className="mt-2">10–15 collaborators</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={() => setActivePopup('applicationInstructions')}
                    className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-500"
                  >
                    Apply now
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePopup('talkTalent')}
                    className="text-sm font-medium text-slate-600 transition hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400"
                  >
                    Learn about culture
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="company-culture" className="bg-slate-50 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Company culture</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">A culture built around curiosity, trust, and farmer impact.</h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">We encourage experimentation, clear ownership, and long-term thinking in every product decision.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cultureHighlights.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/20">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_0.7fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Hiring process</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">A simple, transparent process for every candidate.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">We move quickly, respect your time, and keep every interview focused on skills, values, and the problems you want to solve.</p>
            </div>

            <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
              {hiringSteps.map((item) => (
                <motion.div key={item.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-950">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">{item.step}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Employee benefits</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Perks that support your growth, health, and long-term success.</h2>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">Our benefits package is designed to help every team member thrive both personally and professionally.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {employeePerks.map((perk) => (
              <motion.div key={perk.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-emerald-600 text-white shadow-lg shadow-emerald-500/20">
                  <perk.icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{perk.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-10 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-10 lg:grid-cols-4">
              {teamImpact.map((stat) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }} className="rounded-[1.5rem] border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950">
                  <p className="text-4xl font-semibold text-slate-900 dark:text-white">{stat.value}</p>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.25em] text-emerald-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100">Ready to make an impact?</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Start your application with AgriSmart today.</h2>
              <p className="max-w-2xl text-base leading-8 text-emerald-100/90">Whether you are a product builder, engineer, or operations expert, you can help us build better tools for farmers across India and beyond.</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setActivePopup('contactHiring')}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-lg shadow-emerald-900/10 transition hover:bg-slate-100"
              >
                Contact hiring team
              </button>
              <button
                type="button"
                onClick={() => setActivePopup('currentPositions')}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                View open roles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Popup Modal */}
      <CareersPopupModal
        isOpen={activePopup !== null}
        onClose={() => setActivePopup(null)}
        popupType={activePopup}
      />
    </main>
  );
}
