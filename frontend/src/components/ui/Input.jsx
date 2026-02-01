export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full bg-cream border border-line rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 ${className}`}
      {...props}
    />
  );
};
