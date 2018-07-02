import React from "react";
import {connect} from "react-redux"

import "../../styles/layout.css"

import {fetchClickData} from "../actions/clickData"

import {Router, Route, Link, RouteHandler} from 'react-router';

import {Form, Message, Icon, Modal, Button, Grid, Loader, Dropdown} from 'semantic-ui-react'

@connect((store) => {
    return {
        NewInit: store.initReducer.initR,
    };
})

export default class Set3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false,

            sel: "",

            input: [],
            x: [],
            y: [],
        }
    }

    componentWillMount() {

    }

    handleClick = (e, {itemId}) => {
        var {input} = this.state
        if (input.length != 0 && input[input.length - 1].type == "move") {
            input[input.length - 1].end = performance.now()
        }
        //console.log(questNo + 1)
        //console.log(e.target.id)

        input.push({
            type: "input",
            start: performance.now(),
            end: performance.now(),
            id: itemId,
            x: e.clientX,
            y: e.clientY,
            key: "mouse",
        })

        this.setState({input: input, x: [], y: []}, () => {
            // if (questNo == 4) {
            //     this.setState({load: true})
            //     this.props.dispatch(fetchClickData('set1', input, performance.now(), "set2"))
            // }
        })

        console.log(input)
    }

    handleChange = (e, {value}) => {
        this.setState({sel: value})
    }

    handleSend = () => {
        var {input} = this.state
        this.props.dispatch(fetchClickData('set3', input, performance.now(), "set4"))
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
            console.log(input)
        }
    }


    render() {
        const {load, sel} = this.state


        return (
            <div onMouseMove={this.move}>
                <div class="container" style={{marginTop: "60px"}}>
                    <div class="row">
                        <div class="col-lg-12">

                            <Loader active={load} inline='centered'/>

                            <div>
                                <div class="center">
                                    <h3>
                                        Frage
                                    </h3>
                                </div>
                                <br/>
                            </div>

                            <br/><br/>
                            <br/>


                            <div>
                                <div class="center">
                                    <Form>
                                        <Form.Group grouped>
                                            <label>Art</label>
                                            <Form.Group inline>
                                                <Form.Radio toggle itemId="1" name='art' label='Toggle1' value='toggle1'
                                                            checked={sel === 'toggle1'}
                                                    //  onKeyUp={this.handleKeyUp}
                                                            onClick={this.handleClick} onChange={this.handleChange}
                                                    //  error={errors.art ? "error" : ""}
                                                />
                                                <Form.Radio toggle itemId="1" name='art' label='Toggle2' value='toggle2'
                                                            checked={sel === 'toggle2'}
                                                    //   onKeyUp={this.handleKeyUp}
                                                            onClick={this.handleClick} onChange={this.handleChange}
                                                    //   error={errors.art ? "error" : ""}
                                                />
                                            </Form.Group>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <br/>
                            </div>
 <button onClick={this.handleSend}>senden</button>


                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}