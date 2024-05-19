import { lazy } from "react";
import { type IconName, icons } from "../../icons";

const sizes = {
  small: 24,
  medium: 64,
  large: 96,
};

const widths = {
  small: 64,
  medium: "100%",
  large: "100%",
};

const heights = {
  small: 64,
  medium: 128,
  large: 240,
};

export default function IconDisplay({
  icon,
  size,
  bgColor,
  fgColor,
}: {
  icon: IconName;
  size: "small" | "medium" | "large";
  bgColor: string;
  fgColor: string;
}) {
  const LucideIcon = lazy(icons[icon]);

  return (
    <div
      style={{
        width: widths[size],
        height: heights[size],
        backgroundColor: bgColor,
        color: fgColor,
        display: "grid",
        placeItems: "center",
        borderRadius: "10px",
        flexShrink: 0,
      }}
    >
      <LucideIcon size={sizes[size]} />
    </div>
  );
}
