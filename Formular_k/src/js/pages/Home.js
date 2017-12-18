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
            nname: ""
        }
    }

    componentWillMount() {
    }

     handleChange = (e, { name, value }) => {
        this.setState({ [name]: value })
     }


  render() {
   const { value } = this.state
    return (
      <div>
        <div class="row">

             <Form>
                 <Form.Group widths='equal'>
                     <Form.Input label='Vorname' placeholder='Vorname' name='vname' onChange={this.handleChange}/>
                     <Form.Input label='Nachname' placeholder='Nachname' name='nname'  onChange={this.handleChange}/>
                 </Form.Group>
                 <Form.Group inline>
                      <label>Size</label>
                      <Form.Radio label='Small' value='sm' checked={value === 'sm'} onChange={this.handleChange} />
                      <Form.Radio label='Medium' value='md' checked={value === 'md'} onChange={this.handleChange} />
                      <Form.Radio label='Large' value='lg' checked={value === 'lg'} onChange={this.handleChange} />
                 </Form.Group>
                    <Form.Button>Submit</Form.Button>
             </Form>


        </div>
      </div>
    );
  }
}