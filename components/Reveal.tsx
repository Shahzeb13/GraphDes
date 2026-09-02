"use client";

import { useEffect } from "react";

/**
 * Runs the scroll-reveal IntersectionObserver for every `.fade-up` element
 * on the page, exactly like the original client component did.
 */
export default function Reveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".fade-up").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}