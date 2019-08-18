import React from "react";
import AppRouter from "../routing/AppRouter";
import AppRoutes from "../routing/routes/AppRoutes";
import Shell from "../components/shell/Shell/Shell";

export default class App extends React.Component {
  render() {
    return (
      <AppRouter>
        <Shell>
          <AppRoutes />
        </Shell>
      </AppRouter>
    );
  }
}