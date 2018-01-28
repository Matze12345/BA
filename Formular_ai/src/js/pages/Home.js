import React from "react";
import {connect} from "react-redux"
import { fetchInit } from "../actions/initAction"
import { fetchClickData } from "../actions/clickData"
import { fetchHelpData } from "../actions/helpAction"

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
        NewHelp: store.helpReducer.help
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
            msg: "false",
            errors: "",
            open: false,
        }
    }

    componentWillMount() {
         this.props.dispatch(fetchInit())
    }

     handleChange = (e, { name, value }) => {
         var { data } = this.state
         data[data.length - 1].input = true
         this.setState({ [name]: value, time: performance.now(), data: data })
     }

     handleSubmit = () => {
         const { vname, nname, hnr, plz, ort, str, data} = this.state
         const errors = validate(vname, nname, str, hnr, plz, ort)

         this.props.dispatch(fetchHelpData(input, performance.now()))

         if (errors.vname == false && errors.nname == false && errors.hnr == false && errors.plz == false && errors.str == false && errors.ort == false){
             var input = data
             this.setState({vorg: null, time: null, vname: "", nname: "", str: "", hnr: "", plz: "", ort: "", data: [], msg: "", errors: ""}, () => {
                this.props.dispatch(fetchClickData(input, performance.now()))
                //this.props.dispatch(fetchInit())
             })
         }else {
             this.setState({ errors: errors })
         }
     }

     handleClick = (e) => {
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


     handleKeyUp= (e) => {
        if (e.keyCode == 9) //Tab = 9
        {
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

     show = () => this.setState({ open: true })
     close = () => this.setState({ open: false })

  render() {
    const array = this.props.NewInit
    const help  = this.props.NewHelp
    const { vname, nname, hnr, plz, ort, str, msg, errors, open} = this.state

    form[0] = {id: 1, index: "", html: <Form.Group widths='equal'><Form.Input id="1" label='Vorname'  placeholder='Vorname' name='vname' value={vname} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.vname ? "error" : ""} size={help.size} /></Form.Group>}
    form[1] = {id: 2, index: "", html: <Form.Group widths='equal'><Form.Input id="2" label='Nachname' placeholder='Nachname' name='nname' value={nname} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.nname ? "error" : ""} size={help.size}/></Form.Group>}
    form[2] = {id: 3, index: "", html: <Form.Group widths='equal'><Form.Input id="3" label='Straße' placeholder='Straße' name='str' value={str} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.str ? "error" : ""} size={help.size} /></Form.Group>}
    form[3] = {id: 4, index: "", html: <Form.Group widths='equal'><Form.Input id="4" label='Hausnummer' placeholder='Hausnummer' name='hnr' width={4} value={hnr} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.hnr ? "error" : ""} size={help.size}/></Form.Group>}
    form[4] = {id: 5, index: "", html: <Form.Group widths='equal'><Form.Input id="5" label='Postleitzahl' placeholder='Postleitzahl' name='plz' width={3} value={plz} onKeyUp={this.handleKeyUp} onClick={this.handleClick}  onChange={this.handleChange} error={errors.plz ? "error" : ""} size={help.size}/></Form.Group>}
    form[5] = {id: 6, index: "", html: <Form.Group widths='equal'><Form.Input id="6" label='Ort' placeholder='Ort' name='ort' value={ort} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} error={errors.ort ? "error" : ""} size={help.size} /></Form.Group>}

    return (
      <div>
              <Message hidden={msg} icon color="green">
                  <Message.Header>Erfolgreich gesendet</Message.Header>
              </Message>
             <Form loading={array.status} onSubmit={this.handleSubmit}>
                {
                    array.form.map(function (data, index) {
                          form[data].index = index
                    return (
                          form[data].html
                        )
                    })
                }
                <Form.Button primary content="Senden" size={help.size} onClick={this.show}/>
             </Form>


           <div class="row">
  <div class="col-sm-4">
           <Modal size="mini" open={open} onClose={this.close}>
                <Modal.Header>
                    Hilfe
                </Modal.Header>
                <Modal.Content>
                    <p>Soll die Größe der Felder geändert werden?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative content='Nein'/>
                    <Button positive content='Ja' />
                </Modal.Actions>
          </Modal>

  </div>
</div>


      </div>

    );
  }
}