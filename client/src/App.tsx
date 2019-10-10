import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/landing/index";
import Auth from "./components/auth";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/register" component={Auth} />
      </Router>
    </div>
  );
};

export default App;
