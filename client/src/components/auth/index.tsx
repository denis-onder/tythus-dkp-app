import React from "react";
import "./styles.scss";

export default class Auth extends React.Component {
  private currentHREF: string;
  constructor(props: any) {
    super(props);
    this.state = {};
    this.currentHREF = window.location.pathname.replace("/", "");
  }
  render() {
    return (
      <div id="auth">
        <div className="auth_inputs" style={{}}>
          <input type="text" className="auth_input" placeholder="Email: " />
          <input type="text" className="auth_input" placeholder="Password: " />
          <button className="auth_inputs_button">{this.currentHREF}</button>
        </div>
      </div>
    );
  }
}
