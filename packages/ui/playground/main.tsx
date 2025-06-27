import React from "react";
import ReactDOM from "react-dom/client";
import { Button } from "../src/button";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Button appName='masst'>Test Button</Button>
  </React.StrictMode>
);
