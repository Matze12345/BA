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

export default class Set1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false,

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

    handleChange = (e, {itemId}) => {
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
        const {load} = this.state

        var options = [
            {text: 'Test1', value: 'Test1'},
            {text: 'Test2', value: 'Test2'},
            {text: 'Test3', value: 'Test3'},
            {text: 'Test4', value: 'Test4'},
            {text: 'Test5', value: 'Test5'},
        ]

        return (
            <div onMouseMove={this.move}>
                <div class="container" style={{marginTop: "60px"}}>
                    <div class="row">
                        <div class="col-lg-12">

                            <Loader active={load} inline='centered'/>

                            <div>
                                <div class="center">
                                    <h3>
                                        Ändern Sie die Farbe des Kreises
                                    </h3>
                                </div>
                                <br/>
                            </div>

                            <br/><br/>
                            <br/>

                            <div>
                                <div class="center">
                                    <Dropdown itemId="1" placeholder='Select' selection options={options} onClick={this.handleClick} onChange={this.handleChange}/>
                                </div>
                                <br/>
                            </div>

                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}