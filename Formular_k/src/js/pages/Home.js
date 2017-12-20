import React from "react";
import * as ReactBootstrap from 'react-bootstrap';
import ReactStars from 'react-stars'
import {connect} from "react-redux"
import { fetchInit } from "../actions/initAction"

import { Form } from 'semantic-ui-react'

@connect((store) => {
    return {
        NewInit: store.initRed.initR,
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
            click: 0,
        }
    }

    componentWillMount() {
    }

     handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
     }

     handleSubmit = () => {
       //performance.now()
         this.props.dispatch(fetchInit(this.state.click, performance.now()))
     }

     handleClick = (e) => {
        var { click } = this.state
        click++
        this.setState({ click: click })
     }

  render() {

    const {} = this.state

    return (
      <div>
        <div class="row" onClick={this.handleClick}>

             <Form loading={false}>
                 <Form.Group widths='equal'>
                     <Form.Input label='Vorname' placeholder='Vorname' name='vname' onChange={this.handleChange}/>
                     <Form.Input label='Nachname' placeholder='Nachname' name='nname'  onChange={this.handleChange}/>
                 </Form.Group>
                 <Form.Group widths='equal'>
                     <Form.Input label='Straße' placeholder='Straße' name='str' onChange={this.handleChange}/>
                     <Form.Input label='Hausnummer' placeholder='Hausnummer' name='hnr' width={4} onChange={this.handleChange}/>
                 </Form.Group>
                 <Form.Group widths='equal'>
                     <Form.Input label='Postleitzahl' placeholder='Plz' name='plz' width={3} onChange={this.handleChange}/>
                     <Form.Input label='Ort' placeholder='Ort' name='ort' onChange={this.handleChange}/>
                 </Form.Group>
                 <Form.Button primary onClick={this.handleSubmit}>Submit</Form.Button>
             </Form>
        </div>
      </div>
    );
  }
}