/**
 * Tiny UI primitives for consistency and shorter page files.
 * No external UI libraries—just Tailwind classnames.
 */
export function Card({ children }) {
  return (
    <section className="card">
      <div className="card-inner">{children}</div>
    </section>
  );
}

export function Badge({ children, className = "" }) {
  return <span className={`badge ${className}`.trim()}>{children}</span>;
}

export function Label({ children }) {
  return <label className="label">{children}</label>;
}

export function Input({ className = "", ...props }) {
  return <input {...props} className={`input ${className}`.trim()} />;
}

export function Helper({ children }) {
  return <p className="helper">{children}</p>;
}

export function Button({ variant = "primary", className = "", ...props }) {
  const styles = variant === "secondary" ? "btn-secondary" : "btn-primary";
  return <button {...props} className={`${styles} ${className}`.trim()} />;
}

export function Spinner() {
  return (
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
  );
}