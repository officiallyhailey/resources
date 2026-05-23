import GlassCard from './GlassCard';

const jobs = [
  {
    title: 'DevOps Manager/Procurement',
    company: 'Silk City Coffee',
    period: '2023 – Present',
    bullets: [
      'Utilized Airtable and AI Agents to build backend data structures / frontend dashboard with robust automations and workflows for: Task Management, Recruiting, HR/Payroll,  Data Analytics/Reports, Staff Development. B2B Insights, Vendor Management, SOP guides, and more. ',
      'Managed scheduling, labor modeling, and payroll for high volume, multi location / department teams, within target margins',
      'Saved over $25k through vendor management and secured an additional $35k through grant proposals',
    ],
  },
  {
    title: 'Administrative Intern',
    company: 'The Underground NE',
    period: '2019 – 2022',
    bullets: [
      'Contributed to a 4-year collaborative project to build and improve services for adult survivors of human trafficking in New England',
      'Worked alongside non-profits, social services, state agencies, and law enforcement including the FBI',
    ],
  },
];

export default function Experience() {
  return (
    <div className="section-wrap" id="experience">
      <div className="reveal">
        <p className="section-label">Experience</p>
        <h2 className="section-title">Where I've worked</h2>
      </div>

      <div className="timeline">
        {jobs.map((job, i) => (
          <GlassCard
            key={i}
            className={`timeline-card reveal reveal-delay-${i + 1}`}
          >
            <div className="timeline-header">
              <div>
                <h3 className="job-title">{job.title}</h3>
                <p className="job-company">{job.company}</p>
              </div>
              <span className="job-period">{job.period}</span>
            </div>
            <ul className="job-bullets">
              {job.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
