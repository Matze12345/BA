import React from "react";
import {connect} from "react-redux"
import {fetchInit} from "../actions/initAction"
import {fetchClickData} from "../actions/clickData"
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {CirclePicker} from 'react-color'

import {Form, Message, Icon, Modal, Button} from 'semantic-ui-react'

var form;
form = [];

function validate(art, anz, farbe, gravur, mat) {
    return {
        art: art.length === 0,
        anz: anz.length === 0,
        farbe: farbe.length === 0,
        gravur: gravur.length === 0,
        mat: mat.length === 0,
    };
}

@connect((store) => {
    return {
        NewInit: store.initReducer.initR,
        NewHelp: store.helpReducer.help,
        NewTrain: store.helpTrainReducer.help
    };
})


export default class Geld extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            art: "",
            anz: "",
            farbe: "",
            gravur: "",
            mat: "",

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
        this.props.dispatch(fetchInit('geld'))
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
        const {art, anz, gravur, mat, ort, farbe, input} = this.state
        const errors = validate(art, anz, farbe, gravur, mat, ort)

        if (errors.art == false && errors.anz == false && errors.gravur == false && errors.mat == false && errors.farbe == false) {
            var data = input
            this.setState({
                art: "",
                anz: "",
                farbe: "",
                gravur: "",
                mat: "",
                msg: false,
                errors: "",
                input: [],
                x: [],
                y: [],
                plot: []
            }, () => {
                this.props.dispatch(fetchClickData('geld', data, performance.now()))
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
        const {art, anz, gravur, mat, ort, farbe, msg, errors, open, help, plot} = this.state

        const anzOptions = [{text: '1', value: '1'}, {text: '2', value: '2'}, {text: '3', value: '3'}, {
            text: '4',
            value: '4'
        }, {text: '5', value: '5'}, {text: '6', value: '6'}, {text: '7', value: '7'}, {text: '8', value: '8'},]

        form[0] = {
            id: 1,
            index: "",
            html: <Form.Group inline><label>Art</label>
                <Form.Radio id="1_h" name='art' label='Herren' value='herren' checked={art === 'herren'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.art ? "error" : ""}/>
                <Form.Radio id="1_d" name='art' label='Damen' value='damen' checked={art === 'damen'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.art ? "error" : ""}/>
            </Form.Group>


        }
        form[1] = {
            id: 2,
            index: "",
            html: <Form.Select options={anzOptions} placeholder='' id="2" label='Anzahl Innenfächer' name='anz'
                               onKeyUp={this.handleKeyUp} value={anz}
                               onClick={this.handleClick} onChange={this.handleChange}
                               error={errors.anz ? "error" : ""}/>
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
            html: <Form.Group widths='equal'><Form.Input id="4" label='Gravur' placeholder='Gravur' name='gravur'
                                                         width={4} value={gravur} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick} onChange={this.handleChange}
                                                         error={errors.gravur ? "error" : ""}/></Form.Group>
        }
        form[4] = {
            id: 5,
            index: "",
            html: <Form.Group inline><label>Material</label>
                <Form.Radio id="5_l" name='mat' label='Leder' value='leder' checked={mat === 'leder'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.mat ? "error" : ""}/>
                <Form.Radio id="5_s" name='mat' label='Stoff' value='stoff' checked={mat === 'stoff'}
                            onKeyUp={this.handleKeyUp}
                            onClick={this.handleClick} onChange={this.handleChange}
                            error={errors.mat ? "error" : ""}/>
            </Form.Group>
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