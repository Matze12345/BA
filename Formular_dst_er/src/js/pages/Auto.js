import React from "react";
import {connect} from "react-redux"
import {fetchInit} from "../actions/initAction"
import {fetchClickData} from "../actions/clickData"
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {CirclePicker} from 'react-color'
import '../../styles/image.css'
import {Form, Message, Icon, Modal, Button} from 'semantic-ui-react'

var form;
form = [];

function validate(herst, farbe, km, bj, leistung) {
    return {
        herst: herst.length === 0,
        farbe: farbe.length === 0,
        km: km.length === 0,
        bj: bj.length === 0,
        leistung: leistung.length === 0,
    };
}

@connect((store) => {
    return {
        NewInit: store.initReducer.initR,
    };
})


export default class Auto extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            herst: "",
            farbe: "",
            km: "",
            bj: "",
            leistung: "",

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
        this.props.dispatch(fetchInit('auto'))
    }

    handleChange = (e, {name, value}) => {
        var {input} = this.state
        if (input[input.length - 1].type != "input") {
            input.push({
                type: "input",
                start: performance.now(),
                end: performance.now(),
                id: e.target.id,
                index: form[e.target.id-1].index + 1,
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

    handleChangeColor = (color) => {
        var {input} = this.state
        if (input[input.length - 1].type != "input") {
            input.push({
                type: "input",
                start: performance.now(),
                end: performance.now(),
                id: 3,
                index: form[3-1].index + 1,
                x: "",
                y: "",
                key: "mouse",
                keyCount: 1
            })
        } else {
            input[input.length - 1].end = performance.now();
            input[input.length - 1].keyCount = input[input.length - 1].keyCount + 1;
        }
        this.setState({input: input, farbe: color.hex, x: [], y: []})
    };


    handleSubmit = () => {
        const {herst, km, bj, leistung, farbe, input} = this.state
        const errors = validate(herst, farbe, km, bj, leistung)

        if (errors.herst == false && errors.km == false && errors.bj == false && errors.leistung == false) {
            var data = input
            this.setState({
                herst: "",
                farbe: "",
                km: "",
                bj: "",
                leistung: "",
                msg: false,
                errors: "",
                input: [],
                x: [],
                y: [],
                plot: []
            }, () => {
                this.props.dispatch(fetchClickData('auto', data, performance.now(), "lager"))
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
            index: form[e.target.id-1].index + 1,
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
                index: form[e.target.id-1].index  + 1,
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
        const size = this.props.NewTrain
        const modal = this.props.NewHelp
        const {herst, nname, km, bj, leistung, farbe, msg, errors, open, help, plot} = this.state

        const colors = ["#ff6600", "#ff0000", "#990000", "#00b33c", "#004d1a", "#4d4dff", "#0000ff", "#000080", "#cccccc", "#b3b3b3", "#808080", "#000000"]

        form[0] = {
            id: 1,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="1" label='Hersteller' placeholder='Hersteller' name='herst'
                                                         value={herst} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick} onChange={this.handleChange}
                                                         error={errors.herst ? "error" : ""}/></Form.Group>
        }
        form[1] = {
            id: 2,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="2" label='Leistung' placeholder='PS' name='leistung'
                                                         value={leistung}
                                                         onKeyUp={this.handleKeyUp} onClick={this.handleClick}
                                                         onChange={this.handleChange}
                                                         error={errors.leistung ? "error" : ""}/></Form.Group>
        }
        form[2] = {
            id: 3,
            index: "",
            html: <div><label>Farbe</label><CirclePicker id="3" label='Straße' name='farbe'
                                                         value={farbe} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick}
                                                         onChange={this.handleChangeColor}
                                                         error={errors.farbe ? "error" : ""}
                                                         colors={colors}
                                                         width="504px"
                                                         color={farbe}/><br/></div>
        }
        form[3] = {
            id: 4,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="4" label='Kilometer' placeholder='Kilometer' name='km'
                                                         value={km} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick} onChange={this.handleChange}
                                                         error={errors.km ? "error" : ""}/></Form.Group>
        }
        form[4] = {
            id: 5,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="5" label='Baujahr' placeholder='Baujahr' name='bj'
                                                         value={bj} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick} onChange={this.handleChange}
                                                         error={errors.bj ? "error" : ""}/></Form.Group>
        }

        return (
            <div onMouseMove={this.move}>
                <div class="container" style={{marginTop: "60px"}}>
                    <div class="row">
                        <div class="col-lg-12">
                            <Message hidden={msg} icon="checkmark" color="green">
                                <Message.Header>Erfolgreich gesendet</Message.Header>
                            </Message>
                             <div>
                                <img src={require("../../images/auto.jpg")} width="20%" height="20%"/>
                                <br/>
                                <div class="center"> Geben Sie bitte ihre Fahrzeugdaten ein </div>
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