import { useState, useEffect } from 'react';

const NEED_OPTIONS = [
  'Web App',
  'Freelance project',
  'Hiring / Job offer',
  'Just saying hi',
];

export default function Contact() {
  const [selectedNeed, setSelectedNeed] = useState('Web App');
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusType, setStatusType] = useState(''); // 'success' | 'error' | ''
  const [statusMessage, setStatusMessage] = useState('');

  const email = 'gandhiayush291@gmail.com';

  // Format local IST time dynamically
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(now).toLowerCase();
      setLocalTime(`${timeStr} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');
    setStatusType('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/gandhiayush291@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          need: selectedNeed,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: 'table',
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === 'true' || result.success === true)) {
        setStatusType('success');
        setStatusMessage('✓ Thank you! Your message has been sent to gandhiayush291@gmail.com.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch {
      setStatusType('error');
      setStatusMessage('Sending via your mail client...');
      const subject = encodeURIComponent(`Portfolio Message from ${formData.name} (${selectedNeed})`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nNeed: ${selectedNeed}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:gandhiayush291@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-gray-100 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Email, Stats Grid, Links */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[var(--ink)] mb-3">
              Have a project in mind?
            </h2>

            {/* Email link */}
            <a
              href={`mailto:${email}`}
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[var(--ink)] hover:text-[var(--acc)] transition-colors mb-5 block break-all"
            >
              {email}
            </a>

            {/* Copy email button */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-5 py-2 rounded-full border border-gray-300 text-xs sm:text-sm font-medium text-[var(--ink)] hover:border-gray-500 hover:bg-gray-50/80 active:scale-95 transition-all mb-8 cursor-pointer"
            >
              {copied ? '✓ Copied to clipboard' : 'Copy email'}
            </button>

            {/* 2x2 Info Grid Card */}
            <div className="w-full max-w-md border border-gray-200/90 rounded-2xl bg-white overflow-hidden shadow-2xs mb-8">
              <div className="grid grid-cols-2">
                {/* Location */}
                <div className="p-5 border-r border-b border-gray-200/90">
                  <div className="text-xs text-gray-400 font-normal mb-1">Location</div>
                  <div className="text-sm sm:text-base font-bold text-[var(--ink)]">
                    Vadodara, India
                  </div>
                </div>

                {/* Local time */}
                <div className="p-5 border-b border-gray-200/90">
                  <div className="text-xs text-gray-400 font-normal mb-1">Local time</div>
                  <div className="text-sm sm:text-base font-bold text-[var(--ink)]">
                    {localTime || '03:11 pm IST'}
                  </div>
                </div>

                {/* Replies within */}
                <div className="p-5 border-r border-gray-200/90">
                  <div className="text-xs text-gray-400 font-normal mb-1">Replies within</div>
                  <div className="text-sm sm:text-base font-bold text-[var(--ink)]">
                    24 hours
                  </div>
                </div>

                {/* Open to */}
                <div className="p-5">
                  <div className="text-xs text-gray-400 font-normal mb-1">Open to</div>
                  <div className="text-xs sm:text-sm font-bold text-[var(--ink)] leading-snug">
                    Full-time, freelance, collaboration
                  </div>
                </div>
              </div>
            </div>

            {/* Social / Link Pills */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-gray-200/90 bg-white text-xs sm:text-sm font-medium text-[var(--ink)] hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-gandhi-765899287"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full border border-gray-200/90 bg-white text-xs sm:text-sm font-medium text-[var(--ink)] hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="px-5 py-2 rounded-full border border-gray-200/90 bg-white text-xs sm:text-sm font-medium text-[var(--ink)] hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Right Column: Send a Message Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-lg rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 lg:p-10 shadow-xs">
              <h3 className="text-xl sm:text-2xl font-black text-[var(--ink)] tracking-tight mb-6">
                Send a message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Your name */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[var(--ink)] mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200/90 focus:outline-none focus:ring-2 focus:ring-[var(--acc)]/20 focus:border-[var(--acc)] text-sm transition-all bg-white"
                  />
                </div>

                {/* Your email */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[var(--ink)] mb-2">
                    Your email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200/90 focus:outline-none focus:ring-2 focus:ring-[var(--acc)]/20 focus:border-[var(--acc)] text-sm transition-all bg-white"
                  />
                </div>

                {/* What do you need? */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[var(--ink)] mb-2">
                    What do you need?
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {NEED_OPTIONS.map((option) => {
                      const isSelected = selectedNeed === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setSelectedNeed(option)}
                          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${isSelected
                            ? 'bg-[var(--ink)] text-white shadow-xs'
                            : 'bg-white text-[var(--ink)] border border-gray-200 hover:border-gray-300 hover:bg-gray-50/70'
                            }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-[var(--ink)] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200/90 focus:outline-none focus:ring-2 focus:ring-[var(--acc)]/20 focus:border-[var(--acc)] text-sm transition-all resize-y bg-white"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3.5 px-6 rounded-full bg-[var(--ink)] text-white font-medium text-sm hover:bg-black transition-all shadow-sm active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending message...' : 'Send message'}
                </button>

                {statusMessage && (
                  <p
                    className={`text-xs font-medium text-center pt-2 ${statusType === 'success' ? 'text-emerald-600' : 'text-blue-600'
                      }`}
                  >
                    {statusMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
