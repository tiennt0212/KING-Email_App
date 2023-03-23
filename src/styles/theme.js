const colors = {
  black: "#1C1C1C",
  tealGreen: "#00897B",
  darkGray: "#8E8B8B",
  lightGray: "#F7F7F7",
  whiteAbs: "#FFFFFF",
};

const PAPER_THEME = {
  name: "paper",
  bgColor: colors.whiteAbs,
  primaryColor: colors.tealGreen,
  contrastColor: colors.black, // contrast to background
  subColor1: colors.darkGray, // constrast and sub for constrastColor
  subColor2: colors.lightGray,
  shadow: "0, 0, 0",
};
const WATER_THEME = {
  name: "water",
  bgColor: "transparent",
  primaryColor: colors.tealGreen,
  contrastColor: colors.whiteAbs, // contrast to background
  subColor1: colors.lightGray, // constrast and sub for constrastColor
  subColor2: colors.darkGray,
  shadow: "255, 255, 255",
};

export { PAPER_THEME, WATER_THEME };
