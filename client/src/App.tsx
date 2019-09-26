import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/landing/index";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Landing} />
      </Router>
    </div>
  );
};

export default App;
