import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 540 960"
      width={540}
      height={960}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="#001220" d="M0 0H540V960H0z" />
      <Defs>
        <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="30%" stopColor="#001220" />
          <Stop offset="70%" stopColor="#001220" />
        </LinearGradient>
      </Defs>
      <Defs>
        <LinearGradient x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="30%" stopColor="#001220" />
          <Stop offset="70%" stopColor="#001220" />
        </LinearGradient>
      </Defs>
      <Path
        d="M0 486c-68-2.3-136-4.5-186-37-49.9-32.5-81.8-95.2-118.8-144.2-36.9-49.1-79-84.5-110-133C-445.9 123.3-465.9 61.7-486 0H0z"
        fill="#FBAE3C"
        transform="translate(540)"
      />
      <Path
        d="M0-486c67.8 1.3 135.6 2.7 186 37 50.4 34.3 83.4 101.6 106.7 156.3 23.4 54.6 37 96.8 67.6 143.5C390.9-102.6 438.5-51.3 486 0H0z"
        fill="#FBAE3C"
        transform="translate(0 960)"
      />
    </Svg>
  )
}

export default SvgComponent
