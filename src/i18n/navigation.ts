import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware wrappers. Use these instead of next/link & next/navigation
// so links and the language toggle preserve locale (and the URL hash).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
