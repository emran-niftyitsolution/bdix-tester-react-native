import Svg, { Path } from "react-native-svg";

// Tik (Checkmark) Icon
export const TikIcon = ({ size = 24, color = "green" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 18L4 12L5.5 10.5L9 14.5L18.5 5L20 6.5L9 18Z" fill={color} />
  </Svg>
);

// Cross (X) Icon
export const CrossIcon = ({ size = 24, color = "red" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 6L6 18M6 6L18 18"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
