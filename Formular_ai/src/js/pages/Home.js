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
            clickv: "",
            clickn: "",
            clicks: "",
            clickh: "",
            clickp: "",
            clicko: "",
            points: 6,
            click: [],
        }
    }

    componentWillMount() {
         this.props.dispatch(fetchInit(this.state.clickv, this.state.clickn, this.state.clicks, this.state.clickh, this.state.clickp, this.state.clicko))
    }

     handleChange = (e, { name, value }) => {
         this.setState({ [name]: value })
     }

     handleSubmit = () => {
         this.props.dispatch(fetchInit(this.state.click))
         this.setState({click: []})
         //this.setState({points: 6})
         //this.props.dispatch(fetchInit(this.state.clickv, this.state.clickn, this.state.clicks, this.state.clickh, this.state.clickp, this.state.clicko))
     }

     handleClick = (e) => {
         /*var { points } = this.state
         this.setState({ [e.target.id]: points })
         points--
         this.setState({ points: points })*/

         var { click } = this.state
         click.push({id: e.target.id, skip: "", time: ""})
     }

  render() {
    const array = this.props.NewInit
    const {} = this.state
    var test = []

    test.push(<Form.Group widths='equal'><Form.Input id="1" label='Vorname' placeholder='Vorname' name='vname'  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>)
    test.push(<Form.Group widths='equal'><Form.Input id="2" label='Nachname' placeholder='Nachname' name='nname'  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>)
    test.push(<Form.Group widths='equal'><Form.Input id="3" label='Straße' placeholder='Straße' name='str'  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>)
    test.push(<Form.Group widths='equal'><Form.Input id="4" label='Hausnummer' placeholder='Hausnummer' name='hnr' width={4}  onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>)
    test.push(<Form.Group widths='equal'><Form.Input id="5" label='Postleitzahl' placeholder='Plz' name='plz' width={3} onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>)
    test.push(<Form.Group widths='equal'><Form.Input id="6" label='Ort' placeholder='Ort' name='ort' onClick={this.handleClick} onChange={this.handleChange}/></Form.Group>)

    return (
      <div>
        <div class="row">
             <Form loading={false}>
                {
                    array.form.map(function (data) {
                    return (
                          test[data]
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