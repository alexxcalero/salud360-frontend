import colors from "tailwindcss/colors";

const Spinner = () => {
  return (
    <div className={`w-[96px] aspect-1/1 rounded-full`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        className="animate-spin"
      >
        <radialGradient
          id="a8"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stopColor={colors.blue["500"]}></stop>
          <stop
            offset=".3"
            stopColor={colors.blue["500"]}
            stopOpacity=".9"
          ></stop>
          <stop
            offset=".6"
            stopColor={colors.blue["500"]}
            stopOpacity=".6"
          ></stop>
          <stop
            offset=".8"
            stopColor={colors.blue["500"]}
            stopOpacity=".3"
          ></stop>
          <stop
            offset="1"
            stopColor={colors.blue["500"]}
            stopOpacity="0"
          ></stop>
        </radialGradient>
        <circle
          // @ts-ignore
          transformOrigin="center"
          fill="none"
          stroke="url(#a8)"
          strokeWidth="15"
          strokeLinecap="round"
          strokeDasharray="200 1000"
          strokeDashoffset="0"
          cx="100"
          cy="100"
          r="70"
        ></circle>
        <circle
          // @ts-ignore
          transformOrigin="center"
          fill="none"
          opacity=".2"
          stroke={colors.blue["500"]}
          strokeWidth="15"
          strokeLinecap="round"
          cx="100"
          cy="100"
          r="70"
        ></circle>
      </svg>
    </div>
  );
};

export default Spinner;
