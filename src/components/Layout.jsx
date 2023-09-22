import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

function Layout() {
  console.log("in layout");
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
  );
}

export default Layout;
