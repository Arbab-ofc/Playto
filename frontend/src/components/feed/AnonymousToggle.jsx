import { useAnon } from '../../context/AnonContext';

export const AnonymousToggle = () => {
  const { anonymous, setAnonymous } = useAnon();

  return (
    <div className="flex items-center justify-between border border-line rounded-2xl p-4 bg-cream">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Anonymous mode</p>
        <p className="text-sm text-ink/70 mt-1">
          Post and comment without showing your name.
        </p>
      </div>
      <button
        onClick={() => setAnonymous(!anonymous)}
        className="relative w-14 h-8 rounded-full border border-line bg-cream flex items-center px-1"
        aria-label="Toggle anonymous mode"
      >
        <span
          className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform ${
            anonymous ? 'translate-x-6 bg-ink' : 'translate-x-0 bg-ink'
          }`}
        />
        <span className="absolute left-2 text-[10px] uppercase tracking-[0.2em] text-ink/60">Off</span>
        <span className="absolute right-2 text-[10px] uppercase tracking-[0.2em] text-ink/60">On</span>
      </button>
    </div>
  );
};
