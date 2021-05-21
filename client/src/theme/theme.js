import { extendTheme } from "@chakra-ui/react";

const colors = {
  brandGray: {
    standard: "#454749",
    dark: "#1b1c1d"
  },
  brandYellow: {
    standard: "#e4a13c",
    standardOpacity: "#e4a13c17",
    hover: "#c58b35",
    hoverFade: "#e4a13c9d",
  }
}

const config = {
  initialColorMode: "dark"
}

const styles = {
  global: props => ({
    body: {
      color: "#fff",
      bg: "#1b1c1d",
    },
  }),
};

export const theme = extendTheme({ colors, config, styles })