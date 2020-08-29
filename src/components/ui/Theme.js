import { createMuiTheme } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const purple = "#B86EFF";
const arcOrange = "#FFBA60";

const breakpoints = createBreakpoints({});

export default createMuiTheme({
  palette: {
    common: {
      blue: `${purple}`,
      orange: `${arcOrange}`,
      transparent: "rgba(0,0,0,0)",
    },
    type: "dark",
    primary: {
      main: `${purple}`,
    },
    secondary: {
      main: `${purple}`,
    },
  },
  typography: {
    button: {
      textTransform: "lowercase",
      fontFamily: "'Raleway', sans-serif;",
      fontWeight: 600,
    },
    tab: {
      textTransform: "lowercase",
      fontFamily: "'Raleway', sans-serif;",
      fontWeight: 600,
    },
    h6: {
      fontWeight: 400,
      [breakpoints.down("xs")]: {
        fontSize: "1rem",
      },
    },
    fontSize: 14,
  },
});
