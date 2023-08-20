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
        d="M0 486C-46.1 489.4 -92.2 492.8 -125.8 469.4C-159.4 446.1 -180.4 395.9 -216 374.1C-251.6 352.3 -301.8 358.8 -341.5 341.5C-381.3 324.3 -410.6 283.3 -414.8 239.5C-419 195.7 -398 149.1 -405.7 108.7C-413.4 68.3 -449.7 34.2 -486 0L0 0Z"
        fill="#191518"
      />
    </G>
    <G transform="translate(0, 960)">
      <Path
        d="M0 -486C37.1 -456.8 74.1 -427.6 110.3 -411.5C146.4 -395.4 181.6 -392.5 220.5 -381.9C259.4 -371.4 301.8 -353.2 320.3 -320.3C338.8 -287.5 333.3 -239.9 359.4 -207.5C385.5 -175.1 443.1 -157.8 469.4 -125.8C495.8 -93.7 490.9 -46.9 486 0L0 0Z"
        fill="#191518"
      />
    </G>
  </Svg>
);
export default SVGComponent;
