import React from "react";
import {connect} from "react-redux"
import { fetchInit } from "../actions/initAction"
import { fetchClickData } from "../actions/clickData"
import { fetchHelpData } from "../actions/helpAction"
import { fetchHelpTrainData } from "../actions/helpTrain"

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
            vorg: null,
            time: null,
            data: [],
            msg: true,
            errors: "",
            open: true,
            click: "",
            clickTime: "",
            help: false,

            startInput: "",
            endInput: "",
            idInput: "",
            input: [],
            startMove: "",
            endMove: "",
        }
    }

    componentWillMount() {
         this.props.dispatch(fetchInit())
    }

     handleChange = (e, { name, value }) => {
        var { input } = this.state
         input[input.length - 1].end = performance.now();
         input[input.length - 1].keyCount = input[input.length - 1].keyCount + 1;
        this.setState({ endInput: performance.now, input : input })



         var { data } = this.state
         data[data.length - 1].input = true
         this.setState({ [name]: value, time: performance.now(), data: data })
     }

     handleSubmit = () => {
         const { vname, nname, hnr, plz, ort, str, data} = this.state
         const errors = validate(vname, nname, str, hnr, plz, ort)

         if (errors.vname == false && errors.nname == false && errors.hnr == false && errors.plz == false && errors.str == false && errors.ort == false){
             var input = data
             this.setState({vorg: null, time: null, vname: "", nname: "", str: "", hnr: "", plz: "", ort: "", data: [], msg: false, errors: ""}, () => {
                this.props.dispatch(fetchClickData(input, performance.now()))
             })
         }else {
             this.setState({ errors: errors })
         }
     }

     handleClick = (e) => {
         var { input } = this.state
         input.push({type: "input", start: performance.now(), end: performance.now(), id: e.target.id, x: e.clientX, y: e.clientY, entered: "click", keyCount: 0 })
         this.setState({ startInput: performance.now(), idInput: e.target.id, input: input })
         console.log(input)


         var { vorg, time, data } = this.state
         var skip = 0
         if(time != null){
            time = performance.now() - time
         }else {
             time = 0
         }
         if (vorg != null){
             skip = Math.abs(vorg - form[e.target.id - 1].index) - 1
         }
         else{
             skip = 0
         }
         var vorganger = form[e.target.id - 1].index
         this.setState({vorg: vorganger})

         data.push( { type: "click", id: e.target.id, index: form[e.target.id-1].index, skip: skip, time: time, input: false } )
         this.setState({ data: data })
     }


     handleKeyUp = (e) => {
        if (e.keyCode == 9) //Tab = 9
        {
             var { input } = this.state
             input.push({type: "input", start: performance.now(), end: performance.now(), id: e.target.id, x: e.clientX, y: e.clientY, entered: "tab", keyCount: 0})
             this.setState({ startInput: performance.now(), idInput: e.target.id, input: input })
             console.log(input)




            var { time, data } = this.state

            if(time != null){
                time = performance.now() - time
            } else {
                time = 0
            }

            var vorganger = form[e.target.id - 1].index
            this.setState({vorg: vorganger})

            data.push( { type: "tab", id: e.target.id, index: form[e.target.id-1].index, skip: 0, time: time, input: false } )
            this.setState({ data: data })
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
        //console.log(e.clientX, e.clientY)
     }


  render() {
    const array = this.props.NewInit
    const size  = this.props.NewTrain
    const modal = this.props.NewHelp
    const { vname, nname, hnr, plz, ort, str, msg, errors, open, help} = this.state

    form[0] = {id: 1, index: "", html: <Form.Group widths='equal'><Form.Input id="1" label='Vorname'  placeholder='Vorname' name='vname' value={vname} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.vname ? "error" : ""} /></Form.Group>}
    form[1] = {id: 2, index: "", html: <Form.Group widths='equal'><Form.Input id="2" label='Nachname' placeholder='Nachname' name='nname' value={nname} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.nname ? "error" : ""} /></Form.Group>}
    form[2] = {id: 3, index: "", html: <Form.Group widths='equal'><Form.Input id="3" label='Straße' placeholder='Straße' name='str' value={str} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.str ? "error" : ""}  /></Form.Group>}
    form[3] = {id: 4, index: "", html: <Form.Group widths='equal'><Form.Input id="4" label='Hausnummer' placeholder='Hausnummer' name='hnr' width={4} value={hnr} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.hnr ? "error" : ""} /></Form.Group>}
    form[4] = {id: 5, index: "", html: <Form.Group widths='equal'><Form.Input id="5" label='Postleitzahl' placeholder='Postleitzahl' name='plz' width={3} value={plz} onKeyUp={this.handleKeyUp} onClick={this.handleClick}  onChange={this.handleChange} error={errors.plz ? "error" : ""} /></Form.Group>}
    form[5] = {id: 6, index: "", html: <Form.Group widths='equal'><Form.Input id="6" label='Ort' placeholder='Ort' name='ort' value={ort} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.ort ? "error" : ""}  /></Form.Group>}

    return (
      <div onMouseDown={help ? null : this.helpDown} onMouseUp={help ? null : this.helpUp} onMouseMove={this.move}>
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
      </div>
    );
  }
}