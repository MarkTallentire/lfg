import { createMuiTheme } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const purple = "#B86EFF";
const breakpoints = createBreakpoints({});

export default createMuiTheme({
  palette: {
    common: {
      purple: `${purple}`,
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
    h2: {
      fontFamily: "'Raleway', 'sans-serif'",
    },
    h3: {
      fontFamily: "'Raleway', 'sans-serif'",
      color: `${purple}`,
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
