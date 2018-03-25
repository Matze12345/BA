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

    handleChange = (e, {name, value, itemId}) => {
        var {input} = this.state
        if (input[input.length - 1].type != "input") {
            input.push({
                type: "input",
                start: performance.now(),
                end: performance.now(),
                id: itemId,
                index: form[itemId-1].index + 1,
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
        const {art, anz, gravur, mat, ort, farbe, input} = this.state
        const errors = validate(art, anz, farbe, gravur, mat)

        if (errors.art == false && errors.anz == false && errors.gravur == false && errors.mat == false) {
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
                this.props.dispatch(fetchClickData('geld', data, performance.now(), "therm"))
            })
        } else {
            this.setState({errors: errors})
        }
    }

    handleClick = (e, {itemId}) => {
        if (itemId == null) {
            itemId = e.target.id
        }
        var {input} = this.state
        if (input.length != 0 && input[input.length - 1].type == "move") {
            input[input.length - 1].end = performance.now()
        }
        input.push({
            type: "input",
            start: performance.now(),
            end: performance.now(),
            id: itemId,
            index: form[itemId-1].index + 1,
            x: e.clientX,
            y: e.clientY,
            key: "mouse",
            keyCount: 0
        })
        this.setState({input: input, x: [], y: []})
    }


    handleKeyUp = (e, {itemId}) => {
        if (e.keyCode == 9) //Tab = 9
        {
            if (itemId == null) {
                itemId = e.target.id
            }
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
                id: itemId,
                index: form[itemId-1].index + 1,
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
        const {art, anz, gravur, mat, farbe, msg, errors, open, help, plot} = this.state

        const anzOptions = [{text: '1', value: '1'}, {text: '2', value: '2'}, {text: '3', value: '3'}, {
            text: '4',
            value: '4'
        }, {text: '5', value: '5'}, {text: '6', value: '6'}, {text: '7', value: '7'}, {text: '8', value: '8'},]

        const colors = ["#f2f2f2", "#e6b800", "#b38f00", "#006622", "#ff4d4d", "#cc0000", "#3333ff", "#000066", "#808080", "#663300", "#331a00", "#000000"]

        form[0] = {
            id: 1,
            index: "",
            html: <Form.Group grouped>
                <label>Art</label>
                <Form.Group inline>
                    <Form.Radio itemId="1" name='art' label='Herren' value='herren' checked={art === 'herren'}
                                onKeyUp={this.handleKeyUp}
                                onClick={this.handleClick} onChange={this.handleChange}
                                error={errors.art ? "error" : ""}/>
                    <Form.Radio itemId="1" name='art' label='Damen' value='damen' checked={art === 'damen'}
                                onKeyUp={this.handleKeyUp}
                                onClick={this.handleClick} onChange={this.handleChange}
                                error={errors.art ? "error" : ""}/>
                </Form.Group>
            </Form.Group>

        }
        form[1] = {
            id: 2,
            index: "",
            html: <Form.Select options={anzOptions} placeholder='' itemId="2" label='Anzahl Innenfächer' name='anz'
                               onKeyUp={this.handleKeyUp} value={anz}
                               onClick={this.handleClick} onChange={this.handleChange}
                               error={errors.anz ? "error" : ""}/>
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
            html: <Form.Group widths='equal'><Form.Input id="4" itemId="4" label='Gravur' placeholder='Gravur'
                                                         name='gravur'
                                                         width={4} value={gravur} onKeyUp={this.handleKeyUp}
                                                         onClick={this.handleClick} onChange={this.handleChange}
                                                         error={errors.gravur ? "error" : ""}/></Form.Group>
        }
        form[4] = {
            id: 5,
            index: "",
            html: <Form.Group grouped>
                <label>Material</label>
                <Form.Group inline>
                    <Form.Radio itemId="5" name='mat' label='Leder' value='leder' checked={mat === 'leder'}
                                onKeyUp={this.handleKeyUp}
                                onClick={this.handleClick} onChange={this.handleChange}
                                error={errors.mat ? "error" : ""}/>
                    <Form.Radio itemId="5" name='mat' label='Stoff' value='stoff' checked={mat === 'stoff'}
                                onKeyUp={this.handleKeyUp}
                                onClick={this.handleClick} onChange={this.handleChange}
                                error={errors.mat ? "error" : ""}/>
                </Form.Group>
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
                            <div>
                                <img src={require("../../images/geld.jpg")} width="20%" height="20%"/>
                                <br/>
                                <div class="center"> Konfigurieren Sie ihren Geldbeutel </div>
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