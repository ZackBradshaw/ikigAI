import * as React from "react";
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
} from "react-native-svg";
const SVGComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    id="visual"
    viewBox="0 0 540 960"
    width={540}
    height={960}
    {...props}
  >
    <Rect x={0} y={0} width={540} height={960} fill="#b02127" />
    <Defs>
      <LinearGradient id="grad1_0" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="30%" stopColor="#b02127" stopOpacity={1} />
        <Stop offset="70%" stopColor="#b02127" stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <Defs>
      <LinearGradient id="grad2_0" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="30%" stopColor="#b02127" stopOpacity={1} />
        <Stop offset="70%" stopColor="#b02127" stopOpacity={1} />
      </LinearGradient>
    </Defs>
    <G transform="translate(540, 0)">
      <Path
        d="M0 486C-40.6 467.3 -81.2 448.5 -114.7 427.9C-148.2 407.3 -174.6 384.8 -217 375.9C-259.4 366.9 -317.8 371.5 -343.7 343.7C-369.5 315.8 -362.8 255.4 -367.2 212C-371.6 168.6 -386.9 142 -408.6 109.5C-430.2 77 -458.1 38.5 -486 0L0 0Z"
        fill="#191518"
      />
    </G>
    <G transform="translate(0, 960)">
      <Path
        d="M0 -486C41.6 -476.8 83.2 -467.5 122.2 -455.9C161.1 -444.3 197.5 -430.3 239.5 -414.8C281.5 -399.4 329.2 -382.4 343.7 -343.7C358.1 -304.9 339.4 -244.3 357.7 -206.5C376 -168.7 431.3 -153.6 458.8 -122.9C486.4 -92.3 486.2 -46.2 486 0L0 0Z"
        fill="#191518"
      />
    </G>
  </Svg>
);
export default SVGComponent;
