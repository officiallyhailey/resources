import GlassCard from './GlassCard';

const admin = [
  'Policy & Procedures',
  'Operations / Workflows',
  'Schedules / Payroll',
  'Data Entry / Analysis',
  'Data Visualization',
  'Task Management Systems',
  'Training Guides',
  "Vendor Management"
];

const tech = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'Airtable',
  'Slack / Teams',
  'Canva',
  'Google Workspace',
  'Microsoft 365',
  'Shopify',
  'Square',
  'Automations',
  'AI Agents',
  'Claude',
  'Zapier'
];

export default function Skills() {
  return (
    <div className="section-wrap" id="skills">
    
      <div className="skills-grid">
        <GlassCard className="skills-group reveal reveal-delay-1">
          <h3 className="skills-group-title">Admin & Operations</h3>
          <div className="tags">
            {admin.map((s) => (
              <span className="tag" key={s}>{s}</span>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="skills-group reveal reveal-delay-2">
          <h3 className="skills-group-title">Technical</h3>
          <div className="tags">
            {tech.map((s) => (
              <span className="tag" key={s}>{s}</span>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
