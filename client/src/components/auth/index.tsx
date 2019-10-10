import React from "react";
import AuthStyles from "../../interfaces/AuthStyles";
import "./styles.scss";

export default class Auth extends React.Component {
  private currentHREF: string;
  private styles: AuthStyles;
  constructor(props: any) {
    super(props);
    this.state = {};
    this.currentHREF = window.location.pathname.replace("/", "");
    if (this.currentHREF === "login") {
      this.styles = { left: "0" };
    } else {
      this.styles = { right: "0" };
    }
  }
  render() {
    return (
      <div id="auth">
        <div className="auth_inputs" style={this.styles}>
          <input type="text" className="auth_input" placeholder="Email: " />
          <input type="text" className="auth_input" placeholder="Password: " />
          {this.currentHREF === "register" ? (
            <React.Fragment>
              <input
                type="text"
                className="auth_input"
                placeholder="Confirm Password: "
              />
              <select className="auth_inputs_class">
                <option value="warrior">Warrior</option>
                <option value="hunter">Hunter</option>
                <option value="shaman">Shaman</option>
                <option value="druid">Druid</option>
                <option value="rogue">Rogue</option>
                <option value="warlock">Warlock</option>
                <option value="paladin">Paladin</option>
                <option value="priest">Priest</option>
                <option value="mage">Mage</option>
              </select>
            </React.Fragment>
          ) : (
            ""
          )}
          <button className="auth_inputs_button">{this.currentHREF}</button>
        </div>
      </div>
    );
  }
}
