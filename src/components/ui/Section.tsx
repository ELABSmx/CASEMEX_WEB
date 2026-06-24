import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Constrain inner content width. Default "default" (~72rem). */
  width?: "default" | "narrow" | "wide" | "full";
  /** Vertical padding rhythm. Default "default". */
  spacing?: "default" | "tight" | "none";
  as?: "section" | "div" | "footer";
  "aria-labelledby"?: string;
};

const widths: Record<NonNullable<SectionProps["width"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none",
};

const spacings: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  tight: "py-16 sm:py-20",
  default: "py-20 sm:py-28 lg:py-32",
};

/** Section shell: handles anchor offset, vertical rhythm, and inner gutter. */
export default function Section({
  id,
  children,
  className,
  width = "default",
  spacing = "default",
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag id={id} className={cn(spacings[spacing], className)} {...rest}>
      <div className={cn("mx-auto w-full px-6 sm:px-8", widths[width])}>
        {children}
      </div>
    </Tag>
  );
}
