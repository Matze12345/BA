import React from "react";
import {connect} from "react-redux"
import { fetchInit } from "../actions/initAction"
import { fetchClickData } from "../actions/clickData"
import { fetchHelpData } from "../actions/helpAction"
import { fetchHelpTrainData } from "../actions/helpTrain"
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import { Form, Message, Icon, Modal, Button } from 'semantic-ui-react'

var form;
form = [];

function validate(vname, nname, str, hnr, plz, ort) {
   return {
        vname: vname.length === 0,
        nname: nname.length === 0,
        str: str.length === 0,
        hnr: hnr.length === 0,
        plz: plz.length === 0,
        ort: ort.length === 0,
   };
}

@connect((store) => {
    return {
        NewInit: store.initReducer.initR,
        NewHelp: store.helpReducer.help,
        NewTrain: store.helpTrainReducer.help
    };
})


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vname: "",
            nname: "",
            str: "",
            hnr: "",
            plz: "",
            ort: "",

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
         this.props.dispatch(fetchInit())
    }

     handleChange = (e, { name, value }) => {
         var { input } = this.state
         if(input[input.length-1].type != "input"){
             input.push({type: "input", start: performance.now(), end: performance.now(), id: e.target.id, x: e.clientX, y: e.clientY, key: "mouse", keyCount: 1 })
         }else{
             input[input.length - 1].end = performance.now();
             input[input.length - 1].keyCount = input[input.length - 1].keyCount + 1;
         }
         this.setState({ input : input, [name]: value })
     }

     handleSubmit = () => {
         const { vname, nname, hnr, plz, ort, str, input} = this.state
         const errors = validate(vname, nname, str, hnr, plz, ort)

         if (errors.vname == false && errors.nname == false && errors.hnr == false && errors.plz == false && errors.str == false && errors.ort == false){
             var data = input
             this.setState({vname: "", nname: "", str: "", hnr: "", plz: "", ort: "", msg: false, errors: "", input: [], x: [], y: [], plot: []}, () => {
                this.props.dispatch(fetchClickData(data, performance.now()))
             })
         }else {
             this.setState({ errors: errors })
         }
     }

     handleClick = (e) => {
         var { input } = this.state
         if (input.length != 0 && input[input.length-1].type == "move"){
             input[input.length-1].end = performance.now()
         }
         input.push({type: "input", start: performance.now(), end: performance.now(), id: e.target.id, x: e.clientX, y: e.clientY, key: "mouse", keyCount: 0 })
         this.setState({ input: input })
         console.log(input)
     }


     handleKeyUp = (e) => {
        if (e.keyCode == 9) //Tab = 9
        {
             // move und input
             var { input } = this.state
             if (input.length != 0 && input[input.length-1].type == "move"){
                input[input.length-1].end = performance.now()
             }
             input.push({type: "move", start: performance.now(), end: performance.now(), id: "", x: "", y: "", key: "tab", keyCount: 0})
             input.push({type: "input", start: performance.now(), end: performance.now(), id: e.target.id, x: "", y: "", key: "tab", keyCount: 0})
             this.setState({ input: input })
             console.log(input)
        }
     }

     show = () => {
        this.setState({ open: true })
     }
     close = () => {
        this.setState({ open: false })
     }
     modal = (e) => {
         this.props.dispatch(fetchHelpTrainData(this.state.click, this.state.clickTime , e.target.value))
         this.setState({ open: false })
     }
     helpDown = () => {
         this.setState({ clickTime: performance.now(), click: performance.now()  })
     }
     helpUp = () => {
         var { click, clickTime } = this.state
         clickTime = performance.now() - this.state.clickTime
         //this.props.dispatch(fetchHelpData( click, clickTime))
         this.setState({ help: true, clickTime: clickTime })
     }
     move = (e) => {
         var { input, x, y, plot } = this.state

         if(x.length == 0 || Math.abs(x[x.length-1]-e.clientX) > window.screen.availHeight * 0.03 || y.length == 0 || Math.abs(y[y.length-1]-e.clientY) > window.screen.availWidth * 0.02){

             //strecke berechnen
             //if(x.length > 1 && y.length > 1){
             //   console.log(Math.sqrt( Math.pow(Math.abs(x[x.length-1])-Math.abs(e.clientX), 2) + Math.pow(Math.abs(y[y.length-1])-Math.abs(e.clientY), 2) ))
             //}

             x.push(e.clientX)
             y.push(e.clientY)
             if (input.length == 0 || input[input.length-1].type != "move"){
                input.push({type: "move", start: performance.now(), end: performance.now(), id: "", x: x, y: y, key: "mouse", keyCount: 0})
             }
             else{
                 input[input.length-1].end = performance.now()
                 input[input.length-1].x = x
                 input[input.length-1].y = y
             }
             plot.push({x: e.clientX, y: (e.clientY * (-1))})
             this.setState({ x: x, y: y, input: input, plot: plot })
         }
     }


  render() {
    const array = this.props.NewInit
    const size  = this.props.NewTrain
    const modal = this.props.NewHelp
    const { vname, nname, hnr, plz, ort, str, msg, errors, open, help, plot} = this.state

    form[0] = {id: 1, index: "", html: <Form.Group widths='equal'><Form.Input id="1" label='Vorname'  placeholder='Vorname' name='vname' value={vname} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.vname ? "error" : ""} /></Form.Group>}
    form[1] = {id: 2, index: "", html: <Form.Group widths='equal'><Form.Input id="2" label='Nachname' placeholder='Nachname' name='nname' value={nname} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.nname ? "error" : ""} /></Form.Group>}
    form[2] = {id: 3, index: "", html: <Form.Group widths='equal'><Form.Input id="3" label='Straße' placeholder='Straße' name='str' value={str} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.str ? "error" : ""}  /></Form.Group>}
    form[3] = {id: 4, index: "", html: <Form.Group widths='equal'><Form.Input id="4" label='Hausnummer' placeholder='Hausnummer' name='hnr' width={4} value={hnr} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.hnr ? "error" : ""} /></Form.Group>}
    form[4] = {id: 5, index: "", html: <Form.Group widths='equal'><Form.Input id="5" label='Postleitzahl' placeholder='Postleitzahl' name='plz' width={3} value={plz} onKeyUp={this.handleKeyUp} onClick={this.handleClick}  onChange={this.handleChange} error={errors.plz ? "error" : ""} /></Form.Group>}
    form[5] = {id: 6, index: "", html: <Form.Group widths='equal'><Form.Input id="6" label='Ort' placeholder='Ort' name='ort' value={ort} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.ort ? "error" : ""}  /></Form.Group>}

    return (
        <div onMouseMove={this.move}>
            <div class="container" style={{marginTop: "60px"}} >
                <div class="row">
                    <div class="col-lg-12">
                          <div onMouseDown={help ? null : this.helpDown} onMouseUp={help ? null : this.helpUp}>
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

                               <Modal size="mini" open={open ? modal.open : false} onClose={this.close} style={{ marginTop: "0%", height: "20%" }}>
                                    <Modal.Header>
                                        Hilfe
                                    </Modal.Header>
                                    <Modal.Content>
                                        <p>Soll die Größe der Felder geändert werden?</p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button negative content='Nein' value={0} onClick={this.modal}/>
                                        <Button positive content='Ja' value={1} onClick={this.modal} />
                                    </Modal.Actions>
                              </Modal>

                              <ScatterChart width={600} height={500} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                                <XAxis type="number" dataKey={'x'} name='stature'/>
                                <YAxis type="number" dataKey={'y'} name='weight'/>
                                <ZAxis range={[100]}/>
                                <CartesianGrid />
                                <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                                <Legend/>
                            <Scatter name='Koordinaten' data={plot} fill='#8884d8' line shape="point"/>
                          </ScatterChart>

                          </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}