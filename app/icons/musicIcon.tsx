import * as React from "react";

// By: gg
// See: https://v0.app/icon/gg/music
// Example: <IconGgMusic width="24px" height="24px" style={{color: "#000000"}} />

export const MusicIcon = ({
  height = "1em",
  fill = "currentColor",
  focusable = "false",
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "children">) => (
  <svg
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={height}
    focusable={focusable}
    {...props}
  >
    <path
      fill={fill}
      fillRule="evenodd"
      d="M22 6a4 4 0 0 0-4.608-3.953l-7 1.077A4 4 0 0 0 7 7.078v8.763a3.5 3.5 0 1 0 2 3.163V7.078A2 2 0 0 1 10.696 5.1l7-1.077A2 2 0 0 1 20 6.001v6.84a3.5 3.5 0 1 0 2 3.163zm-2 10.004a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0m-13 3a1.5 1.5 0 1 0-3 0a1.5 1.5 0 0 0 3 0"
      clipRule="evenodd"
    />
  </svg>
);