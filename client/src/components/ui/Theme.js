import { createMuiTheme } from "@material-ui/core/styles";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { purple } from "@material-ui/core/colors";

const breakpoints = createBreakpoints({});

export default createMuiTheme({
  palette: {
    common: {
      purple: purple[300],
      transparent: "rgba(0,0,0,0)",
    },
    type: "dark",
    primary: {
      main: purple[300],
    },
    secondary: {
      main: purple[300],
    },
    background: {
      default: "#1c2025",
      paper: "#282C34",
    },
    titleBar: {
      main: "#0d47a1",
    },
  },
  typography: {
    button: {
      fontFamily: "'Raleway', sans-serif;",
      fontWeight: 600,
      textTransform: "none",
    },
    tab: {
      fontFamily: "'Raleway', sans-serif;",
      fontWeight: 600,
      textTransform: "none",
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
    fontSize: 12,
  },
});
