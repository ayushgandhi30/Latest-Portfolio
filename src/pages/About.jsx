export default function About() {
  const skills = [
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Mongoose',
    'REST APIs',
    'JWT Auth',
    'Tailwind CSS',
    'Git',
    'Postman',
  ];

  const stats = [
    {
      value: '10+',
      label: 'Projects shipped',
      highlightColor: 'text-[#4e6b94]',
    },
    {
      value: '6+',
      label: 'Months in industry',
      highlightColor: 'text-[#626e82]',
    },
    {
      value: 'MERN',
      label: 'Core stack',
      highlightColor: 'text-[#626e82]',
    },
    {
      value: '100%',
      label: 'Typed with TS',
      highlightColor: 'text-[#626e82]',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-t border-gray-100 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading, Bio, and Skill Badges */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] leading-[1.08] mb-6">
              A developer who ships.
            </h2>

            <p className="text-base sm:text-lg text-[var(--mute)] leading-relaxed mb-4 max-w-xl">
              I'm a MERN-stack developer with 6+ months of professional experience building production software at an IT company.
            </p>

            <p className="text-base sm:text-lg text-[var(--mute)] leading-relaxed mb-8 max-w-xl">
              I like owning a feature end to end: modelling data in MongoDB, designing clean APIs in Express, and building typed, accessible interfaces in Next.js.
            </p>

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-2.5 max-w-xl">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-xs sm:text-sm font-medium text-[var(--ink)] bg-[#f4f4f6] rounded-full border border-gray-200/60 hover:bg-gray-200/70 hover:scale-[1.02] active:scale-95 transition-all duration-150 cursor-default select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 2x2 Stats Matrix */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-md border border-gray-200/90 bg-white shadow-xs">
              <div className="grid grid-cols-2">
                {stats.map((stat, idx) => {
                  const isRightColumn = idx % 2 === 1;
                  const isBottomRow = idx >= 2;

                  return (
                    <div
                      key={stat.label}
                      className={`p-6 sm:p-8 flex flex-col justify-center transition-colors duration-200 hover:bg-gray-50/50 ${!isRightColumn ? 'border-r border-gray-200/90' : ''
                        } ${!isBottomRow ? 'border-b border-gray-200/90' : ''}`}
                    >
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--ink)]">
                        {stat.value}
                      </span>
                      <span className={`mt-2 text-xs sm:text-sm font-medium ${stat.highlightColor || 'text-slate-500'}`}>
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
