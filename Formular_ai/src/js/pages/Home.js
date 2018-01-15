import React from "react";
import {connect} from "react-redux"
import { fetchInit } from "../actions/initAction"
import { fetchClickData } from "../actions/clickData"

import { Form } from 'semantic-ui-react'

var form;
form = [];


@connect((store) => {
    return {
        NewInit: store.initReducer.initR,
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
        var data = this.state.data
         this.props.dispatch(fetchClickData(data, performance.now()))
         this.setState({vorg: null, time: null, vname: "", nname: "", str: "", hnr: "", plz: "", ort: "", data: []})
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

  render() {
    const array = this.props.NewInit
    const { vname, nname, hnr, plz, ort, str} = this.state

    form[0] = {id: 1, index: "", html: <Form.Group widths='equal'><Form.Input id="1" label='Vorname'  placeholder='Vorname' name='vname' value={vname} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} /></Form.Group>}
    form[1] = {id: 2, index: "", html: <Form.Group widths='equal'><Form.Input id="2" label='Nachname' placeholder='Nachname' name='nname' value={nname} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} /></Form.Group>}
    form[2] = {id: 3, index: "", html: <Form.Group widths='equal'><Form.Input id="3" label='Straße' placeholder='Straße' name='str' value={str} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange} /></Form.Group>}
    form[3] = {id: 4, index: "", html: <Form.Group widths='equal'><Form.Input id="4" label='Hausnummer' placeholder='Hausnummer' name='hnr' width={4} value={hnr} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>}
    form[4] = {id: 5, index: "", html: <Form.Group widths='equal'><Form.Input id="5" label='Postleitzahl' placeholder='Postleitzahl' name='plz' width={3} value={plz} onKeyUp={this.handleKeyUp} onClick={this.handleClick}  onChange={this.handleChange}/></Form.Group>}
    form[5] = {id: 6, index: "", html: <Form.Group widths='equal'><Form.Input id="6" label='Ort' placeholder='Ort' name='ort' value={ort} onKeyUp={this.handleKeyUp} onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>}

    return (
      <div>
        <div class="row">
             <Form loading={array.status} onSubmit={this.handleSubmit}>
                {
                    array.form.map(function (data, index) {
                          form[data].index = index
                    return (
                          form[data].html
                        )
                    })
                }
                <Form.Button primary content="Senden"/>
             </Form>
        </div>
      </div>
    );
  }
}