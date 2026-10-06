/** Fond décoratif des sections héro : quadrillage discret et halos qui dérivent lentement. */
export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-grid-light absolute inset-0" />
      <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] animate-drift rounded-full bg-secondary/15 blur-3xl" />
      <div
        className="absolute -bottom-40 -left-24 h-[24rem] w-[24rem] animate-drift rounded-full bg-sky-400/10 blur-3xl"
        style={{ animationDelay: '-9s', animationDirection: 'reverse' }}
      />
    </div>
  );
}
