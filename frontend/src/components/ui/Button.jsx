export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = 'px-4 py-2 rounded-full text-xs uppercase tracking-[0.25em] transition-colors';
  const variants = {
    primary: 'bg-ink text-cream hover:bg-accentDark',
    secondary: 'border border-line text-ink hover:bg-haze',
    ghost: 'text-ink/70 hover:text-ink'
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
