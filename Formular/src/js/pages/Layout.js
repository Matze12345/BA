import React from "react";
import { Link } from "react-router";

import Nav from "../components/layout/Nav";

export default class Layout extends React.Component {
    render() {
        const { location } = this.props;
        const containerStyle = {
            marginTop: "60px"
        };
        console.log("layout");
        return (
            <div>

                <div class="jumbotron">
                    <div class="container">
                      <h1>Formular</h1>
                      <p>Berwerten Sie verschiedene Formulare</p>
                    </div>
                </div>

              <div class="container" style={containerStyle}>
                <div class="row">
                  <div class="col-lg-12">

                      {this.props.children}

                  </div>
                </div>
              </div>
            </div>

        );
    }
}
