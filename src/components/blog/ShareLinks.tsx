import { cn } from "@/lib/utils";

export default function ShareLinks({ url, title, className }: { url: string; title: string; className?: string }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "Email", href: `mailto:?subject=${t}&body=${u}` },
  ];
  return (
    <div className={cn("flex flex-wrap items-center gap-3 font-helvetica text-sm", className)}>
      <span className="uppercase tracking-widest text-white/50">Share</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/20 px-4 py-1.5 text-white/80 transition-colors hover:border-[#F65516] hover:text-white"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
