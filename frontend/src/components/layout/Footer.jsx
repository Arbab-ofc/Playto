export const Footer = () => {
  return (
    <footer className="py-12 border-t border-line/60">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/60 gap-4">
        <span>Playto Community Feed</span>
        <div className="flex items-center space-x-4">
          <span>Designed and Created by Arbab Arshad</span>
          <a
            href="https://github.com/Arbab-ofc"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-line text-ink/70 hover:text-ink hover:border-ink transition-colors"
            aria-label="Arbab Arshad GitHub"
          >
            <span className="sr-only">GitHub</span>
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.38-3.37-1.38-.46-1.2-1.12-1.52-1.12-1.52-.92-.64.07-.63.07-.63 1.02.07 1.56 1.08 1.56 1.08.9 1.58 2.36 1.12 2.94.86.09-.68.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.28 9.28 0 0 1 5 0c1.9-1.33 2.74-1.05 2.74-1.05.56 1.42.21 2.47.1 2.73.64.72 1.02 1.63 1.02 2.75 0 3.93-2.34 4.8-4.57 5.05.36.33.68.98.68 1.98 0 1.43-.01 2.58-.01 2.93 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
