"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import mr from "../../locales/mr.json";
import hi from "../../locales/hi.json";
import en from "../../locales/en.json";

export type Language = "mr" | "hi" | "en";

export const LANGUAGE_STORAGE_KEY = "siteLanguage";

const dictionaries: Record<Language, Dictionary> = { mr, hi, en };

type Dictionary = { [key: string]: string | Dictionary };

function lookup(dict: Dictionary, key: string): string | undefined {
  const value = key.split(".").reduce<unknown>((node, part) => {
    if (node && typeof node === "object" && part in (node as Dictionary)) {
      return (node as Dictionary)[part];
    }
    return undefined;
  }, dict);

  return typeof value === "string" ? value : undefined;
}

function fill(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    vars[name] !== undefined ? String(vars[name]) : match
  );
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function isLanguage(value: string | null): value is Language {
  return value === "mr" || value === "hi" || value === "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("mr");

  useEffect(() => {
    let next: Language = "mr";
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (isLanguage(stored)) next = stored;
    } catch {
      // ignore
    }
    setLanguageState(next);
    document.documentElement.lang = next;
  }, []);

  const setLanguage = useCallback((value: Language) => {
    setLanguageState(value);
    document.documentElement.lang = value;
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const value =
        lookup(dictionaries[language], key) ?? lookup(dictionaries.mr, key) ?? key;
      return fill(value, vars);
    },
    [language]
  );

  const contextValue = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function useTranslation() {
  const { t, language } = useLanguage();
  return { t, language };
}
