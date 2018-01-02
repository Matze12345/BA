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
            click: [],
            time: null,
        }
    }

    componentWillMount() {
         this.props.dispatch(fetchInit())
    }

     handleChange = (e, { name, value }) => {
         this.setState({ [name]: value, time: performance.now() })
     }

     handleSubmit = () => {
         this.props.dispatch(fetchClickData(this.state.click))
         this.props.dispatch(fetchInit())
         this.setState({click: [], vorg: null, time: null, vname: "", nname: "", str: "", hnr: "", plz: "", ort: ""})
     }

     handleClick = (e) => {
         var { click, vorg, time } = this.state
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
         click.push({id: e.target.id, skip: skip, time: time})
         var vorganger = form[e.target.id - 1].index
         this.setState({vorg: vorganger})
     }

  render() {
    const array = this.props.NewInit
    const { vname, nname, hnr, plz, ort, str} = this.state

    form.push({id: 1, index: "", html: <Form.Group widths='equal'><Form.Input id="1" label='Vorname'  placeholder='Vorname' name='vname'  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})
    form.push({id: 2, index: "", html: <Form.Group widths='equal'><Form.Input id="2" label='Nachname' placeholder='Nachname' name='nname' onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})
    form.push({id: 3, index: "", html: <Form.Group widths='equal'><Form.Input id="3" label='Straße' placeholder='Straße' name='str'  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})
    form.push({id: 4, index: "", html: <Form.Group widths='equal'><Form.Input id="4" label='Hausnummer' placeholder='Hausnummer' name='hnr' width={4}  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})
    form.push({id: 5, index: "", html: <Form.Group widths='equal'><Form.Input id="5" label='Postleitzahl' placeholder='Postleitzahl' name='plz' width={3} onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})
    form.push({id: 6, index: "", html: <Form.Group widths='equal'><Form.Input id="6" label='Ort' placeholder='Ort' name='ort'  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})

    return (
      <div>
        <div class="row">
             <Form loading={array.status}>
                {
                    array.form.map(function (data, index) {
                          form[data].index = index
                    return (
                          form[data].html
                        )
                    })
                }

                 <Form.Button primary onClick={this.handleSubmit}>Submit</Form.Button>
             </Form>
        </div>
      </div>
    );
  }
}