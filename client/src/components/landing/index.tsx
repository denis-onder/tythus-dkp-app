import React from "react";
import "./styles.scss";

const Landing: React.FC = () => {
  return (
    <div id="landing">
      <div className="landing_wrapper">
        <h1 className="landing_wrapper_header">Tythus</h1>
        <h4 className="landing_wrapper_tagline">
          A WoW guild and DKP management app.
        </h4>
        <button className="landing_wrapper_button">Get Started</button>
        <i
          className="fa fa-github landing_wrapper_github"
          aria-hidden="true"
          onClick={(): void =>
            window.location.assign(
              "https://www.github.com/denis-onder/tythus-dkp-app"
            )
          }
        ></i>
      </div>
    </div>
  );
};

export default Landing;
