import React from "react";
import {connect} from "react-redux"
import {fetchInit} from "../actions/initAction"
import {fetchClickData} from "../actions/clickData"
import {fetchHelpData} from "../actions/helpAction"
import {fetchHelpTrainData} from "../actions/helpTrain"
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {CirclePicker} from 'react-color'

import {Form, Message, Icon, Modal, Button} from 'semantic-ui-react'

var form;
form = [];

function validate(mat, vol, farbe) {
    return {
        mat: mat.length === 0,
        vol: vol.length === 0,
        farbe: farbe.length === 0,
    };
}

@connect((store) => {
    return {
        NewInit: store.initReducer.initR,
        NewHelp: store.helpReducer.help,
        NewTrain: store.helpTrainReducer.help
    };
})


export default class Therm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mat: "",
            vol: "",
            farbe: "",

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
        this.props.dispatch(fetchInit('therm'))
    }

    handleChange = (e, {name, value}) => {
        console.log(name, value)
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

    handleChangeColor = (e, color) => {
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
        this.setState({input: input, farbe: color.hex, x: [], y: []})
    };

    handleSubmit = () => {
        const {mat, vol, hnr, plz, ort, farbe, input} = this.state
        const errors = validate(mat, vol, farbe, hnr, plz, ort)

        if (errors.mat == false && errors.vol == false && errors.farbe == false) {
            var data = input
            this.setState({
                mat: "",
                vol: "",
                farbe: "",
                msg: false,
                errors: "",
                input: [],
                x: [],
                y: [],
                plot: []
            }, () => {
                this.props.dispatch(fetchClickData('therm', data, performance.now()))
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
        console.log(input)
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
        const {mat, vol, hnr, plz, ort, farbe, msg, errors, open, help, plot} = this.state

        form[0] = {
            id: 1,
            index: "",
            html: <Form.Group inline><label>Material</label>
                <Form.Radio id="1_l" name='mat' label='Metall' value='metall' checked={mat === 'metall'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.mat ? "error" : ""}/>
                <Form.Radio id="1_s" name='mat' label='Glas' value='glas' checked={mat === 'glas'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.mat ? "error" : ""}/>
            </Form.Group>
        }
        form[1] = {
            id: 2,
            index: "",
            html: <Form.Group inline><label>Größe</label>
                <Form.Radio id="1_0.5" name='vol' label='0.5 Liter' value='0.5' checked={vol === '0.5'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.vol ? "error" : ""}/>
                <Form.Radio id="1_1.0" name='vol' label='1.0 Liter' value='1.0' checked={vol === '1.0'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.vol ? "error" : ""}/>
                <Form.Radio id="1_1.5" name='vol' label='1.5 Liter' value='1.5' checked={vol === '1.5'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.vol ? "error" : ""}/>
                <Form.Radio id="1_2.0" name='vol' label='2.0 Liter' value='2.0' checked={vol === '2.0'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.vol ? "error" : ""}/>
            </Form.Group>
        }
        form[2] = {
            id: 3,
            index: "",
            html: <div><Form.Field label='Farbe'></Form.Field><CirclePicker id="3" label='Straße' name='farbe'
                                                                            value={farbe} onKeyUp={this.handleKeyUp}
                                                                            onClick={this.handleClick}
                                                                            onChange={this.handleChangeColor}
                                                                            error={errors.farbe ? "error" : ""}
                                                                            color={farbe}/></div>
        }
        form[3] = {
            id: 4,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="4" label='Gravur' placeholder='Gravur' name='hnr'
                                                         width={4} value={hnr} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick} onChange={this.handleChange}
                                                         error={errors.hnr ? "error" : ""}/></Form.Group>
        }
        form[4] = {
            id: 5,
            index: "",
            html: <Form.Group inline><label>Material</label>
                <Form.Radio id="5_l" name='plz' label='Leder' value='leder' checked={plz === 'leder'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.plz ? "error" : ""}/>
                <Form.Radio id="5_s" name='plz' label='Stoff' value='stoff' checked={plz === 'stoff'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.plz ? "error" : ""}/>
            </Form.Group>
        }
        form[5] = {
            id: 6,
            index: "",
            html: <Form.Group widths='equal'><Form.Input id="6" label='Ort' placeholder='Ort' name='ort' value={ort}
                                                         onKeyUp={this.handleKeyUp} onClick={this.handleClick}
                                                         onChange={this.handleChange}
                                                         error={errors.ort ? "error" : ""}/></Form.Group>
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
                                <Form.Button primary content="Senden" size={size.size}/>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}