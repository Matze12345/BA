import React from "react";
import {connect} from "react-redux"

import "../../styles/layout.css"

import {Router, Route, Link, RouteHandler} from 'react-router';

import {Form, Message, Icon, Modal, Button, Grid} from 'semantic-ui-react'

function validate(pw) {
    return {
        pw: pw !== '123456',
    };
}

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pw: "",
            error: "",
            color: "blue",
            width: 200,
            height: 200,
            radius: 100,
            hidden: "flex",
        }
    }

    componentWillMount() {
    }

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value})
    }

    handleSubmit = () => {
        const {pw} = this.state
        const error = validate(pw)
        console.log(error)
        if (error.pw == false) {

            this.setState({
                pw: "",
                error: "",
            }, () => {
                window.location.assign("/#/" + "home")
            })
        } else {
            this.setState({error: error})
        }
    }

    handleClick = (e) => {

    }

    changeColor = () => {
        this.setState({color: "red"})
    }

    changeSize = (e, value) => {
        var {height, width, radius} = this.state
        if (height > 50 || value == +50) {
            height = height + value
            width = width + value
            radius = height / 2
            this.setState({height: height, width: width, radius: radius})
        }
    }

    changeVisibility = (e, value) => {
        this.setState({hidden: value})
    }


    render() {
        const {error, pw, color, width, height, radius, hidden} = this.state

        return (
            <div class="container" style={{marginTop: "60px"}}>
                <div class="row">
                    <div class="col-lg-12">

                        <div>
                            <div class="center">
                            </div>
                            <br/>
                        </div>

                        <br/><br/>


                        <div>
                            <div class="center">

                                <Button icon onClick={this.changeColor}>
                                    <span class="glyphicon glyphicon-tint"></span>
                                </Button>
                                <Button icon onClick={(e) => this.changeVisibility(e, "none")}>
                                    <span class="glyphicon glyphicon-eye-close"></span>
                                </Button>
                                <Button icon onClick={(e) => this.changeVisibility(e, "flex")}>
                                    <span class="glyphicon glyphicon-eye-open"></span>
                                </Button>
                                <Button icon onClick={(e) => this.changeSize(e, -50)}>
                                    <span class="glyphicon glyphicon-zoom-out"></span>
                                </Button>
                                <Button icon onClick={(e) => this.changeSize(e, +50)}>
                                    <span class="glyphicon glyphicon-zoom-in"></span>
                                </Button>
                                <Button icon onClick={(e) => this.changeVisibility(e, "none")}>
                                    <span class="glyphicon glyphicon-trash"></span>
                                </Button>
                                <Button icon onClick={(e) => this.changeVisibility(e, "none")}>
                                    <span class="glyphicon glyphicon-remove"></span>
                                </Button>
                            </div>
                            <br/>
                        </div>


                        <br/>
                        <br/>


                        <div id="box2" style={{
                            backgroundColor: color,
                            width: width,
                            height: height,
                            borderRadius: radius,
                            display: hidden
                        }}>
                        </div>


                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}