import React from "react";
import { Link } from "react-router";
import {connect} from "react-redux"

import '../../styles/layout.css';

import Nav from "../components/layout/Nav";

@connect((store) => {  // Wenn sich irgendwas in diesem Store ändert, was für dieses Komponente relevant ist, wird dies mit
    // dieser Methode behandelt. Für alle, die mit store connected sind, werden die reducer aufgerufen
    return {
        NewInit: store.initRed.initR,
    };
})

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const formValue = this.props.NewInit;
        const { location } = this.props;
        const containerStyle = {
            marginTop: "60px"
        };
        return (
            <div>
                <div style={{backgroundColor: formValue.color}}>
                        <div class="jumbotron">
                            <div class="container">
                              <h1>Formular</h1>
                              <p>KI & Web</p>
                            </div>
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
