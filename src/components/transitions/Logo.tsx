"use client";

import React, { forwardRef } from "react";

const Logo = forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        id="earXITRQEni1"
        viewBox="0 0 300 300"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        fill="none"
        {...props}
      >
        <path
          d="M123.274461,288.757658l60.93727-70.272001h74.788267v70.272001l115.758788,3.242339l61.965607-67.647111l222.31436.716048l2.961242-111.13176L555.564569,-0.000006l-90.840247-2.643911-93.931788,75.001928-75.826173-72.358017h-114.79561L12.76887,151.665076v137.092582h110.505591Z"
          transform="matrix(.431314 0 0 0.431314 4.481371 87.598336)"
          stroke="#e3e4d8"
          strokeWidth={2.5}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
);

Logo.displayName = "Logo";

export default Logo;
