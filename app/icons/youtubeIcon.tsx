import * as React from "react";

// By: fe
// See: https://v0.app/icon/fe/youtube
// Example: <IconFeYoutube width="24px" height="24px" style={{color: "#000000"}} />

export const YoutubeIcon = ({
  height = "2em", // Changed from "1em" to "2em" for a larger default height
  width = "2em",  // Added default width
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
      d="M9.935 14.628v-5.62l5.403 2.82zM21.8 8.035s-.195-1.379-.795-1.986c-.76-.796-1.613-.8-2.004-.847C16.203 5 12.004 5 12.004 5h-.008s-4.198 0-6.997.202c-.391.047-1.243.05-2.004.847c-.6.607-.795 1.986-.795 1.986S2 9.653 2 11.272v1.517c0 1.618.2 3.237.2 3.237s.195 1.378.795 1.985c.76.797 1.76.771 2.205.855c1.6.153 6.8.2 6.8.2s4.203-.006 7.001-.208c.391-.047 1.244-.05 2.004-.847c.6-.607.795-1.985.795-1.985s.2-1.619.2-3.237v-1.517c0-1.619-.2-3.237-.2-3.237"
    />
  </svg>
);
