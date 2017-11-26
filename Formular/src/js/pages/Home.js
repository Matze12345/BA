import React from "react";
import { Button, FormGroup, FormControl, ControlLabel, Col, Form, HelpBlock } from 'react-bootstrap';
import * as ReactBootstrap from 'react-bootstrap';
import ReactStars from 'react-stars'
import {connect} from "react-redux"
import { fetchInit } from "../actions/initAction"



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

@connect((store) => {  // Wenn sich irgendwas in diesem Store ändert, was für dieses Komponente relevant ist, wird dies mit
    // dieser Methode behandelt. Für alle, die mit store connected sind, werden die reducer aufgerufen
    return {
        NewInit: store.initRed.initR,
    };
})

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            email: "",
            pw: "",
           // size: "small",
            valStateText: null,
            valStateEmail: null,
            valStatePw: null,
           // labelCol: 4,
           // inputCol: 5,
            editRating: true,
            valueRating: 0,
            hiddenForm: false,
            hiddenRating: true,
        }
    }

    componentWillMount() {
        this.props.dispatch(fetchInit("0", ""))
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
        this.setState({hiddenForm: true, hiddenRating: false})
    }

    changeStatus(event) {
        this.setState({ [event.target.name]: event.target.value})
    }

    rating = (stars) => {
        this.setState({editRating: false, hiddenForm: false, hiddenRating: true});
        this.props.dispatch(fetchInit(this.props.NewInit.id, stars));
        console.log("POST home");
    }



  render() {
      const formValue = this.props.NewInit;

      const formInstance = (
          <Form horizontal>
              <FieldGroup
                  id="formControlsText"
                  name="text"
                  type="text"
                  label="Text"
                  placeholder="Enter text"
                  labelCol={formValue.labelCol}//this.state.labelCol}
                  inputCol={formValue.inputCol}//this.state.inputCol}
                  valState = {this.state.valStateText}
                  bsSize={formValue.size}//this.state.size}
                  onChange={this.changeStatus.bind(this)}
              />
              <FieldGroup
                  id="formControlsEmail"
                  name="email"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                  labelCol={formValue.labelCol}//this.state.labelCol}
                  inputCol={formValue.inputCol}//this.state.inputCol}
                  valState = {this.state.valStateEmail}
                  bsSize={formValue.size}//this.state.size}
                  onChange={this.changeStatus.bind(this)}
              />
              <FieldGroup
                  id="formControlsPassword"
                  name="pw"
                  label="Password"
                  type="password"
                  labelCol={formValue.labelCol}//this.state.labelCol}
                  inputCol={formValue.inputCol}//this.state.inputCol}
                  valState = {this.state.valStatePw}
                  bsSize={formValue.size}//this.state.size}
                  onChange={this.changeStatus.bind(this)}
              />
              <FormGroup>
                  <Col smOffset={formValue.labelCol} sm={2}>
                      <Button onClick={this.buttonclick.bind(this)} bsSize={formValue.size}>
                          Weiter
                      </Button>
                  </Col>
              </FormGroup>
          </Form>
      );

    return (
      <div>
        <div class="row">
            <div hidden={this.state.hiddenForm}>  {formInstance} </div>
            <div class="center-block" style={{width: "45%"}} >
                <div hidden={this.state.hiddenRating}>
                    <ReactStars
                        name={formValue.id}
                        count={5}
                        size={80}
                        color2={'#ffd700'}
                        edit={this.state.editRating}
                        value={this.state.valueRating}
                        onChange={this.rating.bind(this)}
                    />
                </div>
            </div>
        </div>
      </div>
    );
  }
}