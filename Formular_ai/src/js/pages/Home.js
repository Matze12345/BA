import React from "react";
import {connect} from "react-redux"
import { fetchInit } from "../actions/initAction"

import { Form } from 'semantic-ui-react'

var test;
test = [];


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
            vorg: 0,
            click: [],
        }
    }

    componentWillMount() {
         this.props.dispatch(fetchInit(this.state.click))
    }

     handleChange = (e, { name, value }) => {
         this.setState({ [name]: value })
     }

     handleSubmit = () => {
         this.props.dispatch(fetchInit(this.state.click))
         this.setState({click: []})
     }

     handleClick = (e) => {
         var { click, vorg } = this.state
         var skip = Math.abs( vorg - test[e.target.id - 1].index - 1 )
         click.push({id: e.target.id, skip: skip, time: ""})
         console.log(test[e.target.id - 1].index)
         console.log("skip:" +skip)
         var vorganger = test[e.target.id - 1].index
         console.log(vorganger)
         this.setState({vorg: vorganger})
     }

  render() {
    const array = this.props.NewInit
    const {} = this.state

    test.push({id: 1, index: "", html: <Form.Input id="1" label='Vorname'  placeholder='Vorname' name='vname'  onClick={this.handleClick} onChange={this.handleChange}/> })
    test.push({id: 2, index: "", html: <Form.Group widths='equal'><Form.Input id="2" label='Nachname' placeholder='Nachname' name='nname'  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})
    test.push({id: 3, index: "", html: <Form.Group widths='equal'><Form.Input id="3" label='Straße' placeholder='Straße' name='str'  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})
    test.push({id: 4, index: "", html: <Form.Group widths='equal'><Form.Input id="4" label='Hausnummer' placeholder='Hausnummer' name='hnr' width={4}  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})
    test.push({id: 5, index: "", html: <Form.Group widths='equal'><Form.Input id="5" label='Postleitzahl' placeholder='Postleitzahl' name='plz' width={3} onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})
    test.push({id: 6, index: "", html: <Form.Group widths='equal'><Form.Input id="6" label='Ort' placeholder='Ort' name='ort' onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>})

    return (
      <div>
        <div class="row">
             <Form loading={false}>
                {
                    array.form.map(function (data, index) {
                        test[data].index = index
                    return (
                          test[data].html
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