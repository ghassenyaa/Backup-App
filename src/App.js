import React from "react";
import { BrowserRouter } from "react-router-dom";
import routes, { renderRoutes } from "./routes";
import { AuthProvider } from "./context/JWTAuthContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(50),
  },
}));
const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>{renderRoutes(routes)}</AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
