import React from "react";
import {connect} from "react-redux"
import {fetchInit} from "../actions/initAction"
import {fetchClickData} from "../actions/clickData"
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import '../../styles/image.css'
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
                index: form[e.target.id - 1].index + 1,
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
        const {artnr, lager, anz, input} = this.state
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
                this.props.dispatch(fetchClickData('lager', data, performance.now(), "lager"))
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
            index: form[e.target.id - 1].index + 1,
            x: e.clientX,
            y: e.clientY,
            key: "mouse",
            keyCount: 0
        })
        this.setState({input: input, x: [], y: []})
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
                index: "",
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
                index: form[e.target.id - 1].index + 1,
                x: "",
                y: "",
                key: "tab",
                keyCount: 0
            })
            this.setState({input: input})
        }
    }

    move = (e) => {
        var {input, x, y, plot} = this.state

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
        const {artnr, lager, anz, msg, errors} = this.state

        form[0] = {
            id: 1,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="1" label='Artikelnummer' placeholder='Artikelnummer'
                                                         name='artnr'
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
                                <Message.Header>vielen Dank für Ihre Teilnahme</Message.Header>
                            </Message>
                            <div>
                                <img src={require("../../images/lager_2.jpg")} width="80%" height="80%"/>
                                <br/>
                                <div class="center"> Geben Sie den aktuellen Lagerbestand ein</div>
                            </div>
                            <Form loading={array.status} onSubmit={this.handleSubmit} size="medium">
                                {
                                    array.form.map(function (data, index) {
                                        form[data].index = index
                                        return (
                                            form[data].html
                                        )
                                    })
                                }
                                <Form.Button primary content="Senden" size="medium"/>
                            </Form>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}