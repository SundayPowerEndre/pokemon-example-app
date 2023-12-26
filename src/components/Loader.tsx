const PokeballLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin-slow">
        <svg
          className=" h-96 w-96"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="half">
              <rect x="0" y="0" width="100" height="50" />
            </clipPath>
            <linearGradient
              id="grad1"
              x1="0"
              y1="50"
              x2="100"
              y2="50"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF5555" />
              <stop offset="1" stopColor="#FF0000" />
            </linearGradient>
          </defs>

          <circle cx="50" cy="50" r="50" fill="white" />
          <circle
            cx="50"
            cy="50"
            r="50"
            fill="url(#grad1)"
            clipPath="url(#half)"
          />
          <path
            d="M50 35c8.284 0 15 6.716 15 15s-6.716 15-15 15-15-6.716-15-15 6.716-15 15-15z"
            fill="white"
            stroke="black"
            strokeWidth="2.5"
          />
          <circle cx="50" cy="50" r="10" fill="black" />
        </svg>
      </div>
    </div>
  );
};

export default PokeballLoader;
