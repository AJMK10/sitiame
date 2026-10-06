export function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth'): boolean {
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const header = document.querySelector('header');
  const offset = (header?.getBoundingClientRect().height ?? 80) + 16;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });

  return true;
}
