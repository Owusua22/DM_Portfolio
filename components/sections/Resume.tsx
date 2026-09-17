import SectionTitle from "@/components/SectionTitle";

type TimelineItem = {
  company: string;
  period: string;
  position: string;
  description: string;
  achievements?: string[];
  delay: string;
};

const EXPERIENCE: TimelineItem[] = [
 {
company: "Generation Ghana",

period: "May 2026 – Present",

position: "Digital Marketing Bootcamp Trainee",

description:
"Gaining hands-on experience in SEO, content strategy, social media and campaign planning through practical projects and real client briefs.",

achievements: [
"Conducted keyword research and SEO audits to identify content opportunities, technical issues and areas for improving online visibility.",


"Developed practical content strategies and content calendars based on audience needs, search intent and business goals.",

"Created an SEO audit for an e-commerce business, reviewing keywords, titles, meta descriptions, headings, image optimisation and internal linking.",

"Worked with a team to develop and present digital campaign strategies, turning research and audience insights into practical marketing ideas."


],

delay: "200",
},

{

company: "Wemomprenuer",

period: "2023 – Present",

position: "Social Media Manager",

description:
"Manage the brand's social media presence by planning content, creating engaging posts and helping maintain a consistent online presence.",

achievements: [
"Created and managed content calendars to keep the brand's social media activity consistent and relevant.",


"Developed social media content around audience interests, brand messaging and key business objectives.",

"Used platform insights and engagement data to understand what content resonated with the audience and adjust future content accordingly.",

"Supported campaign planning and promotional activities by combining creative content with practical audience-focused strategies."
],
delay: "300",
},


  
];

const EDUCATION: TimelineItem[] = [
  {
    company: "Generation Ghana",
    period: "May 2026 – Present",
    position: "Digital Marketing Bootcamp",
    description:
      "Practical training focused on SEO, content strategy, social media marketing, analytics, audience research, and digital campaign planning.",
    delay: "200",
  },
  {
    company: "ALX",
    period: "2024",
    position: "AI Career Essentials",
    description:
      "Developed practical knowledge of artificial intelligence, digital productivity, problem-solving, and future-ready workplace skills.",
    delay: "300",
  },
  {
    company: "Google / Coursera",
    period: "2024",
    position: "Google Ads",
    description:
      "Training in search advertising, campaign structure, keyword targeting, ad creation, and performance optimization.",
    delay: "300",
  },
  {
    company: "Accra Technical University",
    period: "2023 – 2024",
    position: "Bachelor of Technology in Secretaryship and Management Studies",
    description:
      "Advanced studies in management, communication, administration, business operations, and organizational support.",
    delay: "400",
  },
  {
    company: "Accra Technical University",
    period: "2019 – 2023",
    position: "Bilingual Secretaryship and Management Studies",
    description:
      "Built a strong foundation in business communication, office administration, professional writing, and management support.",
    delay: "500",
  },
];

function DownloadIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 21H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 4 }}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.map((item) => (
        <div
          className="timeline-item"
          key={`${item.company}-${item.period}-${item.position}`}
          data-aos="fade-up"
          data-aos-delay={item.delay}
        >
          <div className="timeline-left">
            <h4 className="company">{item.company}</h4>
            <span className="period">{item.period}</span>
          </div>

          <div className="timeline-dot" />

          <div className="timeline-right">
            <h3 className="position">{item.position}</h3>

            <p className="description">{item.description}</p>

            {item.achievements && item.achievements.length > 0 ? (
              <>
                <span
                  style={{
                    display: "inline-block",
                    marginBottom: 8,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#f97316",
                  }}
                >
                  Key achievements
                </span>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {item.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      style={{ display: "flex", gap: 10, marginBottom: 8, color: "inherit" }}
                    >
                      <span style={{ color: "#f97316", display: "inline-flex" }}>
                        <TrophyIcon />
                      </span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Resume() {
  return (
    <section id="resume" className="resume section">
      <SectionTitle
        title="Resume"
        description="A summary of my professional experience, education, and practical training in digital marketing and business communication."
      />

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-12">
            <div className="resume-wrapper">
              {/* Work Experience */}
              <div className="resume-block" data-aos="fade-up">
                <h2>Work Experience</h2>

                <p className="lead">
                  Results from digital marketing training, social media
                  management and brand design  measured in audience growth,
                  engagement and delivered work.
                </p>

                <Timeline items={EXPERIENCE} />
              </div>

              {/* Education and Training */}
              <div className="resume-block" data-aos="fade-up" data-aos-delay="100">
                <h2>Education &amp; Training</h2>

                <p className="lead">
                  Continuous learning has helped me build a strong foundation
                  in digital marketing, communication, administration, and
                  emerging technologies.
                </p>

                <Timeline items={EDUCATION} />
              </div>
            </div>
          </div>
        </div>

        {/* Resume Download Button */}
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: "55px" }}
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <a
             href="https://docs.google.com/document/d/1Pmcbvd40JZOOOif5ZDMEN1pvnzQQ4RLF/edit?usp=sharing&ouid=107535406430937442471&rtpof=true&sd=true"
    target="_blank"
            download="Sarah-Nkansah-Full-Resume.pdf"
            aria-label="Download Sarah Nkansah's full resume"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              minHeight: "52px",
              padding: "14px 28px",
              borderRadius: "999px",
              backgroundColor: "#f97316",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 700,
              lineHeight: 1,
              textDecoration: "none",
              boxShadow: "0 10px 24px rgba(249, 115, 22, 0.25)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease",
            }}
          >
            <DownloadIcon />
            <span> Download C.V</span>
          </a>
        </div>
      </div>
    </section>
  );
}