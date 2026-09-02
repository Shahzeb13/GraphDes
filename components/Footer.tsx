import type { Footer as FooterData } from "@/lib/types";

export default function Footer({ text, highlight }: FooterData) {
  const [before, after] = text.split("{name}");

  return (
    <footer>
      <p>
        {before}
        <span>{highlight}</span>
        {after || null}
      </p>
    </footer>
  );
}