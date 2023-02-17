import { extendTheme } from "@chakra-ui/react";
import BACKGROUND_IMAGE from "lib/assets/background/thorfox.webp";

import { config } from "./config";

export const theme = extendTheme({
  fonts: {
    heading: "Plus Jakarta Sans, sans-serif",
    body: "Plus Jakarta Sans, sans-serif",
  },
  components: {
    // Button: {
    // }
  },
  body: {
    // backgroundColor: mode('gray.50', 'gray.800')(props),
    backgroundImage: BACKGROUND_IMAGE,
    backgroundSize: "cover",
  },
  config,
});
