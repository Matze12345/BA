import React from "react";
import {connect} from "react-redux"

import "../../styles/layout.css"

import {Router, Route, Link, RouteHandler} from 'react-router';

import {Form, Message, Icon, Modal, Button, Grid} from 'semantic-ui-react'



export default class End extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
    }


    render() {

        return (
            <div onMouseMove={this.move}>
                <div class="container" style={{marginTop: "60px"}}>
                    <div class="row">
                        <div class="col-lg-12">


                            <Message icon="checkmark" color="green">
                                <Message.Header>vielen Dank für Ihre Teilnahme</Message.Header>
                            </Message>


                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}