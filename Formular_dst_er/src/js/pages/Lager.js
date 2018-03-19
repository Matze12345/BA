import React from "react";
import {connect} from "react-redux"
import {fetchInit} from "../actions/initAction"
import {fetchClickData} from "../actions/clickData"
import {fetchHelpData} from "../actions/helpAction"
import {fetchHelpTrainData} from "../actions/helpTrain"
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import {Router, Route, Link, RouteHandler} from 'react-router';

import {Form, Message, Icon, Modal, Button} from 'semantic-ui-react'

var form;
form = [];

function validate(artnr, lager, anz) {
    return {
        artnr: artnr.length === 0,
        lager: lager.length === 0,
        anz: anz.length === 0,
    };
}

@connect((store) => {
    return {
        NewInit: store.initReducer.initR,
        NewHelp: store.helpReducer.help,
        NewTrain: store.helpTrainReducer.help
    };
})


export default class Lager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            artnr: "",
            lager: "",
            anz: "",

            msg: true,
            errors: "",
            open: true,
            click: "",
            clickTime: "",
            help: false,

            input: [],
            x: [],
            y: [],
            plot: [],
        }
    }

    componentWillMount() {
        this.props.dispatch(fetchInit('lager'))
    }

    handleChange = (e, {name, value}) => {
        var {input} = this.state
        if (input[input.length - 1].type != "input") {
            input.push({
                type: "input",
                start: performance.now(),
                end: performance.now(),
                id: e.target.id,
                x: e.clientX,
                y: e.clientY,
                key: "mouse",
                keyCount: 1
            })
        } else {
            input[input.length - 1].end = performance.now();
            input[input.length - 1].keyCount = input[input.length - 1].keyCount + 1;
        }
        this.setState({input: input, [name]: value, x: [], y: []})
    }

    handleSubmit = () => {
        const {artnr, lager, hnr, plz, ort, anz, input} = this.state
        const errors = validate(artnr, lager, anz)

        if (errors.artnr == false && errors.lager == false && errors.anz == false) {
            var data = input
            this.setState({
                artnr: "",
                lager: "",
                anz: "",
                msg: false,
                errors: "",
                input: [],
                x: [],
                y: [],
                plot: []
            }, () => {
                this.props.dispatch(fetchClickData('lager', data, performance.now()))
                //this.props.history.push("/geld")
            })
        } else {
            this.setState({errors: errors})
        }
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
            x: e.clientX,
            y: e.clientY,
            key: "mouse",
            keyCount: 0
        })
        this.setState({input: input, x: [], y: []})
        //console.log(input)
    }


    handleKeyUp = (e) => {
        if (e.keyCode == 9) //Tab = 9
        {
            // move und input
            var {input} = this.state
            if (input.length != 0 && input[input.length - 1].type == "move") {
                input[input.length - 1].end = performance.now()
            }
            input.push({
                type: "move",
                start: performance.now(),
                end: performance.now(),
                id: "",
                x: "",
                y: "",
                key: "tab",
                keyCount: 0
            })
            input.push({
                type: "input",
                start: performance.now(),
                end: performance.now(),
                id: e.target.id,
                x: "",
                y: "",
                key: "tab",
                keyCount: 0
            })
            this.setState({input: input})
            //console.log(input)
        }
    }

    show = () => {
        this.setState({open: true})
    }
    close = () => {
        this.setState({open: false})
    }
    modal = (e) => {
        this.props.dispatch(fetchHelpTrainData(this.state.click, this.state.clickTime, e.target.value))
        this.setState({open: false})
    }
    helpDown = () => {
        this.setState({clickTime: performance.now(), click: performance.now()})
    }
    helpUp = (e) => {
        var {click, clickTime} = this.state
        clickTime = performance.now() - this.state.clickTime
        //this.props.dispatch(fetchHelpData( click, clickTime, e.clientX, e.clientY))
        this.setState({help: true, clickTime: clickTime})
    }
    move = (e) => {
        var {input, x, y, plot} = this.state

        if (x.length == 0 || Math.abs(x[x.length - 1] - e.clientX) > window.screen.availHeight * 0.03 || y.length == 0 || Math.abs(y[y.length - 1] - e.clientY) > window.screen.availWidth * 0.02) {

            //strecke berechnen
            //if(x.length > 1 && y.length > 1){
            //   console.log(Math.sqrt( Math.pow(Math.abs(x[x.length-1])-Math.abs(e.clientX), 2) + Math.pow(Math.abs(y[y.length-1])-Math.abs(e.clientY), 2) ))
            //}

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
                    keyCount: 0
                })
            }
            else {
                input[input.length - 1].end = performance.now()
                input[input.length - 1].x = x
                input[input.length - 1].y = y
            }
            plot.push({x: e.clientX, y: (e.clientY * (-1))})
            this.setState({x: x, y: y, input: input, plot: plot})
        }
    }


    render() {
        const array = this.props.NewInit
        const size = this.props.NewTrain
        const modal = this.props.NewHelp
        const {artnr, lager, hnr, plz, ort, anz, msg, errors, open, help, plot} = this.state

        form[0] = {
            id: 1,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="1" label='Artikelnummer' placeholder='Artikelnummer' name='artnr'
                                                         value={artnr} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick} onChange={this.handleChange}
                                                         error={errors.artnr ? "error" : ""}/></Form.Group>
        }
        form[1] = {
            id: 2,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="2" label='Lager' placeholder='Lager' name='lager'
                                                         value={lager} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick} onChange={this.handleChange}
                                                         error={errors.lager ? "error" : ""}/></Form.Group>
        }
        form[2] = {
            id: 3,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="3" label='Anzahl' placeholder='Anzahl' name='anz'
                                                         value={anz} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick} onChange={this.handleChange}
                                                         error={errors.anz ? "error" : ""}/></Form.Group>
        }

        return (
            <div onMouseMove={this.move}>
                <div class="container" style={{marginTop: "60px"}}>
                    <div class="row">
                        <div class="col-lg-12">
                            <Message hidden={msg} icon="checkmark" color="green">
                                <Message.Header>Erfolgreich gesendet</Message.Header>
                            </Message>
                            <Form loading={array.status} onSubmit={this.handleSubmit} size={size.size}>
                                {
                                    array.form.map(function (data, index) {
                                        form[data].index = index
                                        return (
                                            form[data].html
                                        )
                                    })
                                }
                                <Form.Button primary content="Senden" size={size.size}></Form.Button>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}