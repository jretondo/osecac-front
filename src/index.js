import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import ChqBolProvider from './context/chqBol/Provider';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";


require('dotenv').config()

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path={process.env.PUBLIC_URL + "/auth"} render={props => <AuthLayout {...props} />} />

      <Route path={process.env.PUBLIC_URL + "/admin"} render={props => <ChqBolProvider> <AdminLayout {...props} /> </ChqBolProvider>} />

      <Redirect from={process.env.PUBLIC_URL + "/"} to={process.env.PUBLIC_URL + "/auth/login"} />
      {
        process.env.NODE_ENV === "development" ?
          <Redirect to={process.env.PUBLIC_URL + "/auth/login"} /> : null
      }
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
