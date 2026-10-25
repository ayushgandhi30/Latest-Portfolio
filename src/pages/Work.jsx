import project1Img from '../assets/ProjectImg/Project1.png';
import project2Img from '../assets/ProjectImg/Project2.png';
import project3Img from '../assets/ProjectImg/Project3.png';
import project4Img from '../assets/ProjectImg/Project4.png';

const PROJECTS = [
  {
    id: 1,
    title: 'EstateFlow',
    description:
      'Full-Stack Real Estate Saas for managing properties, tenants, leases, rent, maintenance',
    tags: ['React', 'Node.js', 'REST'],
    image: project1Img,
    liveUrl: 'https://estatepilot-app.netlify.app/',
    sourceUrl: '#',
    bgGradient: 'from-[#ece7fd] to-[#e4dcfe]',
  },
  {
    id: 2,
    title: 'StyleKaart',
    description:
      'Implemented source authentication, modular backend archetecture.',
    tags: ['React', 'Node.js', 'REST'],
    image: project2Img,
    liveUrl: 'https://stylekaart.netlify.app/',
    sourceUrl: '#',
    bgGradient: 'from-[#fae7f6] to-[#f4d1f0]',
  },
  {
    id: 3,
    title: 'Tanisq',
    description:
      'Built a responsive Tanishq-inspired e-commerce web app.',
    tags: ['React', 'Node.js', 'REST'],
    image: project3Img,
    liveUrl: 'https://tanisq.netlify.app/',
    sourceUrl: '#',
    bgGradient: 'from-[#fef0e7] to-[#fedfcb]',
  },
  {
    id: 4,
    title: 'Grabit',
    description:
      'Developed a social media application in React with.',
    tags: ['React', 'Node.js', 'REST'],
    image: project4Img,
    liveUrl: 'https://grabitcom.netlify.app/',
    sourceUrl: '#',
    bgGradient: 'from-[#f4fbe6] to-[#e6f7cc]',
  },
];

export default function Work() {
  const featuredProject = PROJECTS[0];
  const gridProjects = PROJECTS.slice(1);

  return (
    <section id="work" className="py-20 md:py-28 border-t border-gray-100 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] mb-10 sm:mb-12">
          Selected work
        </h2>

        {/* Projects Layout */}
        <div className="space-y-6 sm:space-y-8">
          {/* Featured Hero Card (Project One) */}
          {featuredProject && (
            <div className="rounded-3xl border border-gray-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                {/* Visual image banner */}
                <div
                  className={`lg:col-span-6 bg-gradient-to-br ${featuredProject.bgGradient} p-6 sm:p-10 lg:p-12 flex items-center justify-center min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] overflow-hidden`}
                >
                  <div className="w-full max-w-[420px] bg-white rounded-xl overflow-hidden shadow-lg border border-white/80 transition-transform duration-300 group-hover:scale-[1.02]">
                    {/* Browser window header */}
                    <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white border-b border-gray-100">
                      <span className="w-2 h-2 rounded-full bg-gray-300" />
                      <span className="w-2 h-2 rounded-full bg-gray-300" />
                      <span className="w-2 h-2 rounded-full bg-gray-300" />
                    </div>
                    {/* Project Screenshot */}
                    <img
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      className="w-full h-52 sm:h-64 object-cover object-top block transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-6 p-8 sm:p-10 lg:p-14 flex flex-col justify-center items-start">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--ink)] tracking-tight mb-3">
                    {featuredProject.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[var(--mute)] leading-relaxed mb-6 max-w-lg">
                    {featuredProject.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featuredProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1 text-xs font-medium text-[var(--ink)] bg-[#f4f4f6] rounded-full border border-gray-200/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-6">
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink)] hover:text-[var(--acc)] transition-colors group/link"
                    >
                      <span>Live demo</span>
                      <span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                    <a
                      href={featuredProject.sourceUrl}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink)] hover:text-[var(--acc)] transition-colors group/link"
                    >
                      <span>Source code</span>
                      <span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom 3-Card Grid (Project Two, Three, Four) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-3xl border border-gray-200/90 bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Visual Banner */}
                <div
                  className={`bg-gradient-to-br ${project.bgGradient} p-5 sm:p-7 flex items-center justify-center min-h-[200px] sm:min-h-[220px] overflow-hidden`}
                >
                  <div className="w-full max-w-[320px] bg-white rounded-xl overflow-hidden shadow-md border border-white/80 transition-transform duration-300 group-hover:scale-[1.02]">
                    {/* Browser window header */}
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-white border-b border-gray-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                    </div>
                    {/* Project Screenshot */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-36 sm:h-40 object-cover object-top block transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--ink)] tracking-tight mb-3">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--mute)] leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium text-[var(--ink)] bg-[#f4f4f6] rounded-full border border-gray-200/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-5 pt-2 border-t border-gray-100/80">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[var(--ink)] hover:text-[var(--acc)] transition-colors group/link"
                      >
                        <span>Live demo</span>
                        <span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                          ↗
                        </span>
                      </a>
                      <a
                        href={project.sourceUrl}
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[var(--ink)] hover:text-[var(--acc)] transition-colors group/link"
                      >
                        <span>Source code</span>
                        <span className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                          ↗
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
