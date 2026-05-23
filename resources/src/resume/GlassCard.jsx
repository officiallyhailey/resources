export default function GlassCard({ children, className = '', style }) {
  return (
    <div className={`glass ${className}`} style={style}>
      {children}
    </div>
  );
}
