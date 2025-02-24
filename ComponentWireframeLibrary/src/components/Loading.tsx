
const Loading = () => {
  return (
    <>
      <div className="w-full h-screen bg-white flex justify-center items-center">
        <svg width="500" height="500" viewBox="0 0 100 100">
          {/* <circle cx="50" cy="50" r="3" fill="black" /> */}
          <circle cx="50" cy="50" r="3" fill="black" >
            <animate
              attributeName="r"
              values="3;4.5;0;3;3"
              dur="3s"
              keyTimes="0;0.15;.3;.5;1"
              calcMode="spline"
              keySplines="0.33 1 0.68 1;0.32 0 0.67 0;0.33 1 0.68 1;0 0 0 0"
              repeatCount="indefinite"
            />
            <animate
              attributeName="visibility"
              values="hidden;visible;hidden;hidden"
              dur="6s"
              keyTimes="0;.15;.65;1"
              repeatCount="indefinite"
            />
          </circle>
          {/* <circle cx="50" cy="50" r="3" fill="black" >
            <animate
              attributeName="visibility"
              values="visible;hidden;visible;visible"
              dur="6s"
              keyTimes="0;.15;.65;1"
              repeatCount="indefinite"
            />
          </circle> */}

          {/* <rect
            x="63.5"
            y="46"
            width="25"
            height="8"
            fill="white"
          >
            <animate
              attributeName="x"
              values="62.5;37.5;12.5"
              dur="2s"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
              repeatCount="indefinite"
            />
          </rect> */}
          
          <path
            d="M50,25 A25,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="visibility"
              values="hidden;visible;hidden;hidden"
              dur="6s"
              keyTimes="0;.075;.575;1"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M50,25 A25,25 0 0,0 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="visibility"
              values="hidden;visible;hidden;hidden"
              dur="6s"
              keyTimes="0;.075;.575;1"
              repeatCount="indefinite"
            />
          </path>

          {/* <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,1 50,75;M50,25 A0,25 0 0,1 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;"
              dur="1s"
              keyTimes="0;0.5;0.5;1"
              calcMode="spline"
              keySplines="0.11 0 0.5 0;0 0 0 0;0.5 1 0.89 1"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M50,25 A12.5,25 0 0,0 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;"
              dur="1s"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.11 0 0.5 0;0 0 0 0;"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A25,25 0 0,1 50,75;M50,25 A25,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75;"
              dur="1s"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0 0 0 0;0.5 1 0.89 1"
              repeatCount="indefinite"
            />
          </path> */}
          
          {/* <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,0 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A0,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75;"
              dur="1s"
              keyTimes="0;0.5;0.5;1"
              calcMode="spline"
              keySplines="0.11 0 0.5 0;0 0 0 0;0.5 1 0.89 1"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M50,25 A12.5,25 0 0,0 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,1 50,75;M50,25 A25,25 0 0,1 50,75;M50,25 A25,25 0 0,1 50,75;"
              dur="1s"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.11 0 0.5 0;0 0 0 0;"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A25,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;"
              dur="1s"
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0 0 0 0;0.5 1 0.89 1"
              repeatCount="indefinite"
            />
          </path> */}

          <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,1 50,75;M50,25 A25,25 0 0,1 50,75;M50,25 A0,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75"
              dur="3s"
              keyTimes="0;.15;.3;.5;1"
              calcMode="spline"
              keySplines="0.33 1 0.68 1;0.32 0 0.67 0;0.33 1 0.68 1;0 0 0 0"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M50,25 A12.5,25 0 0,0 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75"
              dur="3s"
              keyTimes="0;.15;.3;.5;1"
              calcMode="spline"
              keySplines="0.33 1 0.68 1;0.32 0 0.67 0;0.33 1 0.68 1;0 0 0 0"
              repeatCount="indefinite"
            />
          </path>
          
          {/* <path
            d="M50,25 A12.5,25 0 0,0 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75"
              dur="4s"
              keyTimes="0;.1;.25;.4;.6;1"
              calcMode="spline"
              keySplines="0.32 0 0.67 0;0.32 0 0.67 0;0.33 1 0.68 1;0.65 0 0.35 1;0 0 0 0"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,1 50,75;M50,25 A25,25 0 0,1 50,75;M50,25 A0,25 0 0,1 50,75;M50,25 A25,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75"
              dur="4s"
              keyTimes="0;.1;.25;.4;.6;1"
              calcMode="spline"
              keySplines="0.32 0 0.67 0;0.32 0 0.67 0;0.33 1 0.68 1;0.65 0 0.35 1;0 0 0 0"
              repeatCount="indefinite"
            />
          </path> */}

          {/* <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,1 50,75;M50,25 A0,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75;M50,25 A25,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75;"
              dur="4s"
              keyTimes="0;.25;.5;.75;1"
              calcMode="spline"
              keySplines="0.11 0 0.5 0;0.5 1 0.89 1;0.11 0 0.5 0;0.5 1 0.89 1;"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,0 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;"
              dur="4s"
              keyTimes="0;.25;.5;.75;1"
              calcMode="spline"
              keySplines="0.11 0 0.5 0;0.5 1 0.89 1;0.11 0 0.5 0;0.5 1 0.89 1;"
              repeatCount="indefinite"
            />
          </path>
          
          <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,1 50,75;M50,25 A25,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75;M50,25 A0,25 0 0,1 50,75;M50,25 A12.5,25 0 0,1 50,75;"
              dur="4s"
              keyTimes="0;.25;.5;.75;1"
              calcMode="spline"
              keySplines="0.5 1 0.89 1;0.11 0 0.5 0;0.5 1 0.89 1;0.11 0 0.5 0;"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;"
              dur="4s"
              keyTimes="0;.25;.5;.75;1"
              calcMode="spline"
              keySplines="0.5 1 0.89 1;0.11 0 0.5 0;0.5 1 0.89 1;0.11 0 0.5 0;"
              repeatCount="indefinite"
            />
          </path> */}
          
          {/* <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,0 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75"
              dur="2s"
              keyTimes="0;.25;.5;.75;1"
              calcMode="spline"
              keySplines="0.11 0 0.5 0;0.5 1 0.89 1;0.11 0 0.5 0;0.5 1 0.89 1"
              repeatCount="indefinite"
            />
          </path> */}

          {/* <path
            d="M50,25 A12.5,25 0 0,1 50,75"
            fill="none"
            stroke="black"
            stroke-width="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="d"
              values="M50,25 A12.5,25 0 0,0 50,75;M50,25 A0,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75;M50,25 A25,25 0 0,0 50,75;M50,25 A12.5,25 0 0,0 50,75"
              dur="1s"
              keyTimes="0;.4;.5;.6;1"
              calcMode="spline"
              keySplines="0.11 0 0.5 0;1 1 1 1;1 1 1 1;0.5 1 0.89 1"
              repeatCount="indefinite"
            />
          </path> */}
        </svg>
      </div>
    </>
  );
};

export default Loading;
