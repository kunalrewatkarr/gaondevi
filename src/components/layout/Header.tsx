"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { mobileNavigation, navigation } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const menuId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [
      ...new Set(
        [...navigation, ...mobileNavigation].map((n) => n.href.replace("#", ""))
      ),
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key !== "Tab" || !menuPanelRef.current) return;

      const focusable = menuPanelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const firstLink = menuPanelRef.current?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const onDark = !scrolled && !menuOpen;

  return (
    <>
    <header className="fixed inset-x-0 top-[3px] z-[80]">
      <div
        className={cn(
          "transition-all duration-300",
          scrolled || menuOpen
            ? "bg-ivory/95 py-2 shadow-md shadow-ink/10 backdrop-blur-xl"
            : "bg-transparent py-3"
        )}
      >
      <div className="container-main flex items-center justify-between gap-4">
        <Link
          href="#home"
          className="group rounded-lg focus-ring"
          onClick={() => {
            document.body.style.overflow = "";
            setMenuOpen(false);
          }}
        >
          <Logo
            size="sm"
            showLabel
            variant={onDark ? "light" : "dark"}
            className="transition-transform group-hover:scale-[1.02] sm:[&>div:first-child]:h-14 sm:[&>div:first-child]:w-14"
            labelClassName={cn(
              "hidden min-w-0 md:block",
              onDark ? "text-cream" : "text-ink",
              "[&_p:first-child]:max-w-[11rem] [&_p:first-child]:leading-snug xl:[&_p:first-child]:max-w-none",
              "[&_p:last-child]:text-xs",
              onDark
                ? "[&_p:last-child]:text-rose-gold"
                : "[&_p:last-child]:text-gold-ink"
            )}
          />
        </Link>

        <nav
          className="hidden items-center gap-0.5 xl:flex"
          aria-label="मुख्य नेव्हिगेशन"
        >
          {navigation.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-2.5 py-2 text-sm font-medium transition-all duration-300 focus-ring xl:px-3",
                  isActive && !onDark && "bg-gold/15 text-gold-ink",
                  isActive && onDark && "bg-gold/20 text-gold-bright",
                  !isActive &&
                    (onDark
                      ? "text-cream/75 hover:bg-cream/10 hover:text-cream"
                      : "text-ink-muted hover:bg-gold/10 hover:text-gold-ink")
                )}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-gold to-gold-bright"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
          <ThemeToggle onDark={onDark} className="ml-1" />
        </nav>

        <div className="flex items-center gap-1 xl:hidden">
          <ThemeToggle onDark={onDark} />
          <button
            ref={menuButtonRef}
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-full focus-ring",
              onDark ? "text-cream" : "text-ink"
            )}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "मेनू बंद करा" : "मेनू उघडा"}
          >
            <span className="text-2xl" aria-hidden="true">
              {menuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>
      </div>
    </header>

      <div
        id={menuId}
        ref={menuPanelRef}
        role="dialog"
        aria-modal="true"
        aria-label="मेनू"
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-[70] overflow-x-hidden bg-ivory xl:hidden",
          menuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        )}
      >
        <nav
          className="h-full overflow-y-auto overscroll-contain pt-[4.75rem] pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          aria-label="मोबाइल नेव्हिगेशन"
        >
          <ul className="flex flex-col">
            {mobileNavigation.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <li key={item.href} className="border-b border-ink/10">
                  <Link
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => {
                      document.body.style.overflow = "";
                      setMenuOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center px-5 py-4 text-base leading-snug transition-colors focus-ring sm:px-8 sm:py-[1.15rem] sm:text-lg",
                      isActive
                        ? "bg-gold/15 text-gold-ink"
                        : "text-ink hover:bg-gold/10 hover:text-gold-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
