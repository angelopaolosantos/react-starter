import React from "react";
import { render } from 'react-dom';
import Layout from "./components/layout";
import Style from "../public/stylesheets/style.css";

const mountApp = document.getElementById('app');

render(<Layout />, mountApp);




