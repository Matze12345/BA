import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux"

import '../../styles/layout.css';

@connect((store) => {
    return {};
})

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <div>
                    <div class="jumbotron" style={{backgroundColor: "#2185d0" }}>
                        <div class="container">
                            <h1>Formular</h1>
                            <p>KI & Web</p>
                        </div>
                    </div>
                </div>

                <div class="container" style={{marginTop: "60px"}}>
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
