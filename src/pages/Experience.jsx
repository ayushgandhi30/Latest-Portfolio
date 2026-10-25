export default function Experience() {
  const experiences = [
    {
      role: 'Full-Stack Developer',
      company: 'Trevita Infotech',
      period: '2026 – Present',
      bullets: [
        'Built and maintained features using Next.js, Express and MongoDB.',
        'Wrote typed API layers in TypeScript and reviewed pull requests.',
        'Delivered projects from planning to deployment with the team.',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-28 border-t border-gray-100 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] mb-10 sm:mb-14">
          Experience
        </h2>

        {/* Timeline Container */}
        <div className="max-w-3xl ml-1 sm:ml-2">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative border-l border-gray-200 pl-6 sm:pl-8 pb-10 last:pb-0"
            >
              {/* Hollow Blue Timeline Node */}
              <div className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-blue-600 bg-white" />

              {/* Role & Company Header */}
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[var(--ink)]">
                {exp.role}, {exp.company}
              </h3>

              {/* Period */}
              <div className="text-xs sm:text-sm text-[var(--mute)] mt-1.5 mb-4">
                {exp.period}
              </div>

              {/* Bullet Points */}
              <ul className="space-y-2.5 text-sm sm:text-base text-gray-600 leading-relaxed">
                {exp.bullets.map((point, bulletIdx) => (
                  <li key={bulletIdx} className="flex items-start gap-3">
                    <span className="text-gray-400 select-none text-base leading-tight mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
