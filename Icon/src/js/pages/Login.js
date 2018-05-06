import React from "react";
import {connect} from "react-redux"

import "../../styles/layout.css"

import {fetchClickData} from "../actions/clickData"

import {Router, Route, Link, RouteHandler} from 'react-router';

import {Form, Message, Icon, Modal, Button, Grid} from 'semantic-ui-react'

var iconset;
iconset = [];

var array = new Array(0, 1, 2, 3, 4, 5, 6)

Array.prototype.shuffle = function () {
    var tmp, rand;
    for (var i = 0; i < this.length; i++) {
        rand = Math.floor(Math.random() * this.length);
        tmp = this[i];
        this[i] = this[rand];
        this[rand] = tmp;
    }
}

@connect((store) => {
    return {
        NewInit: store.initReducer.initR,
    };
})

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: "blue",
            width: 200,
            height: 200,
            radius: 100,
            hidden: "flex",

            input: [],
            x: [],
            y: [],
        }
    }

    componentWillMount() {
        array.shuffle();
    }

    handleClick = (e) => {
        var {input} = this.state
        if (input.length != 0 && input[input.length - 1].type == "move") {
            input[input.length - 1].end = performance.now()
        }
        input.push({
            type: "input",
            start: performance.now(),
            end: performance.now(),
            id: e.target.id,
            index: iconset[e.target.id - 1].index + 1,
            x: e.clientX,
            y: e.clientY,
            key: "mouse",
        })
        this.setState({input: input, x: [], y: []}, () => {
            this.props.dispatch(fetchClickData('home', input, performance.now(), "geld"))
        })

        console.log(input)
    }

    changeColor = (e) => {
        this.handleClick(e)
        this.setState({color: "red"})
    }

    changeSize = (e, value) => {
        this.handleClick(e)
        var {height, width, radius} = this.state
        if (height > 50 || value == +50) {
            height = height + value
            width = width + value
            radius = height / 2
            this.setState({height: height, width: width, radius: radius})
        }
    }

    changeVisibility = (e, value) => {
        this.handleClick(e)
        this.setState({hidden: value})
    }


    move = (e) => {
        var {input, x, y} = this.state

        if (x.length == 0 || Math.abs(x[x.length - 1] - e.clientX) > window.screen.availHeight * 0.03 || y.length == 0 || Math.abs(y[y.length - 1] - e.clientY) > window.screen.availWidth * 0.02) {

            x.push(e.clientX)
            y.push(e.clientY)
            if (input.length == 0 || input[input.length - 1].type != "move") {
                input.push({
                    type: "move",
                    start: performance.now(),
                    end: performance.now(),
                    id: "",
                    index: "",
                    x: x,
                    y: y,
                    key: "mouse",
                })
            }
            else {
                input[input.length - 1].end = performance.now()
                input[input.length - 1].x = x
                input[input.length - 1].y = y
            }
            this.setState({x: x, y: y, input: input})

        }
    }


    render() {
        const {color, width, height, radius, hidden} = this.state

        iconset[0] = {
            id: 1,
            index: "",
            html: <Button icon onClick={this.changeColor} id="1">
                <span class="glyphicon glyphicon-tint"></span>
            </Button>
        }
        iconset[1] = {
            id: 2,
            index: "",
            html: <Button icon onClick={(e) => this.changeVisibility(e, "none")} id="2">
                <span class="glyphicon glyphicon-eye-close"></span>
            </Button>
        }
        iconset[2] = {
            id: 3,
            index: "",
            html: <Button icon onClick={(e) => this.changeVisibility(e, "flex")} id="3">
                <span class="glyphicon glyphicon-eye-open"></span>
            </Button>
        }
        iconset[3] = {
            id: 4,
            index: "",
            html: <Button icon onClick={(e) => this.changeSize(e, -50)} id="4">
                <span class="glyphicon glyphicon-zoom-out"></span>
            </Button>
        }
        iconset[4] = {
            id: 5,
            index: "",
            html: <Button icon onClick={(e) => this.changeSize(e, +50)} id="5">
                <span class="glyphicon glyphicon-zoom-in"></span>
            </Button>
        }
        iconset[5] = {
            id: 6,
            index: "",
            html: <Button icon onClick={(e) => this.changeVisibility(e, "none")} id="6">
                <span class="glyphicon glyphicon-trash"></span>
            </Button>
        }
        iconset[6] = {
            id: 7,
            index: "",
            html: <Button icon onClick={(e) => this.changeVisibility(e, "none")} id="7">
                <span class="glyphicon glyphicon-remove"></span>
            </Button>
        }


        return (
            <div onMouseMove={this.move}>
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

                                    {
                                        array.map(function (data, index) {
                                            iconset[data].index = index
                                            return (
                                                iconset[data].html
                                            )
                                        })
                                    }

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
            </div>
        );
    }
}