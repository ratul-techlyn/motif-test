import type { ComponentType } from "react";
import type { TemplateKey } from "@/lib/strapi/types";
import type { TemplateProps } from "./shared";
import TemplateClassic from "./TemplateClassic";
import TemplateFullBleed from "./TemplateFullBleed";
import TemplateMagazine from "./TemplateMagazine";
import TemplateMinimal from "./TemplateMinimal";
import TemplateSplit from "./TemplateSplit";

// Number chosen per post in Strapi ("template_1" ... "template_5")
export const TEMPLATES: Record<number, ComponentType<TemplateProps>> = {
  1: TemplateClassic,
  2: TemplateMagazine,
  3: TemplateFullBleed,
  4: TemplateSplit,
  5: TemplateMinimal,
};

// Unknown or missing template falls back to 1
export function resolveTemplate(key?: TemplateKey | string | null): ComponentType<TemplateProps> {
  const n = Number(String(key ?? "").replace("template_", ""));
  return TEMPLATES[n] ?? TEMPLATES[1];
}

export type { TemplateProps };
