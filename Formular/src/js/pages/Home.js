import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Col, Form, HelpBlock } from 'react-bootstrap';
import * as ReactBootstrap from 'react-bootstrap';
import ReactStars from 'react-stars'

function FieldGroup({ id, label, inputCol, labelCol, valState, size, ...props }) {
    return (
        <FormGroup controlId={id} validationState={valState}  >
            <Col componentClass={ControlLabel} sm={labelCol}>
                {label}
            </Col>
            <Col sm={inputCol}>
                <FormControl {...props}/>
                <FormControl.Feedback />
            </Col>
        </FormGroup>
    );
}



export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            email: "",
            pw: "",
            size: "small",
            valStateText: null,
            valStateEmail: null,
            valStatePw: null,
            labelCol: 4,
            inputCol: 5,
            editRating: true,
            valueRating: 0,
        }
    }

    buttonclick(){
        if(this.state.text == "" ){
            this.setState({valStateText: "error"})
        } else{
            this.setState({valStateText: null})
        }
        if(this.state.email == "" ){
            this.setState({valStateEmail: "error"})
        } else{
            this.setState({valStateEmail: null})
        }
        if(this.state.pw == "" ){
            this.setState({valStatePw: "error"})
        } else{
            this.setState({valStatePw: null})
        }

    }

    changeStatus(event) {
        this.setState({ [event.target.name]: event.target.value})
    }

    rating1(event){
        console.log("rating")

    }

    rating = (stars) => {
        this.setState({editRating: false, valueRating: stars})
    }



  render() {

      const formInstance = (
          <Form horizontal>
              <FieldGroup
                  id="formControlsText"
                  name="text"
                  type="text"
                  label="Text"
                  placeholder="Enter text"
                  labelCol={this.state.labelCol}
                  inputCol={this.state.inputCol}
                  valState = {this.state.valStateText}
                  bsSize={this.state.size}
                  onChange={this.changeStatus.bind(this)}
              />
              <FieldGroup
                  id="formControlsEmail"
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                  labelCol={this.state.labelCol}
                  inputCol={this.state.inputCol}
                  valState = {this.state.valStateEmail}
                  bsSize={this.state.size}
                  onChange={this.changeStatus.bind(this)}
              />
              <FieldGroup
                  id="formControlsPassword"
                  name="pw"
                  label="Password"
                  type="password"
                  labelCol={this.state.labelCol}
                  inputCol={this.state.inputCol}
                  valState = {this.state.valStatePw}
                  bsSize={this.state.size}
                  onChange={this.changeStatus.bind(this)}
              />
              <FormGroup>
                  <Col smOffset={this.state.labelCol} sm={2}>
                      <Button onClick={this.buttonclick.bind(this)} bsSize={this.state.size}>
                          Weiter
                      </Button>
                  </Col>
              </FormGroup>
          </Form>
      );

    return (
      <div>
        <div class="row">
            <div >  {formInstance} </div>

            <ReactStars
                count={5}
                size={80}
                color2={'#ffd700'}
                edit={this.state.editRating}
                value={this.state.valueRating}
                onChange={this.rating.bind(this)}
            />
        </div>

      </div>
    );
  }
}