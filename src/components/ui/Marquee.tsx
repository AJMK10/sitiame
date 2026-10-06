interface MarqueeProps {
  items: string[];
}

/** Bandeau défilant en boucle ; s'arrête au survol. */
export default function Marquee({ items }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center whitespace-nowrap px-6 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground"
        >
          {item}
          <span className="ml-12 h-1.5 w-1.5 rotate-45 bg-secondary" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className="group overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]"
      aria-label={items.join(', ')}
      role="group"
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
