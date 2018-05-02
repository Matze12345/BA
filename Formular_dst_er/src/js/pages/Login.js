import React from "react";
import {connect} from "react-redux"

import {Router, Route, Link, RouteHandler} from 'react-router';

import {Form, Message, Icon, Modal, Button, Grid} from 'semantic-ui-react'

function validate(pw) {
    return {
        pw: pw !== 'kiundweb',
    };
}

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pw: "",
            error: "",
        }
    }

    componentWillMount() {
    }

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value})
    }

    handleSubmit = () => {
        const {pw} = this.state
        const error = validate(pw)
        console.log(error)
        if (error.pw == false) {

            this.setState({
                pw: "",
                error: "",
            }, () => {
                window.location.assign("/#/" + "home")
            })
        } else {
            this.setState({error: error})
        }
    }

    handleClick = (e) => {

    }


    render() {
        const {error, pw} = this.state

        return (
            <div class="container" style={{marginTop: "60px"}}>
                <div class="row">
                    <div class="col-lg-12">

                        <div>
                            <div class="center"> Bitte melden Sie sich an
                            </div>
                            <br/>
                        </div>

                        <br/><br/>

                        <Grid verticalAlign='middle' columns={4} centered>
                            <Grid.Row>
                                <Grid.Column>
                                </Grid.Column>


                                <Grid.Column>
                                    <Form onSubmit={this.handleSubmit} size="medium">
                                        <Form.Group widths='equal'>
                                            <Form.Input id="2" placeholder='Passwort' name='pw' value={pw}
                                                        type="password"
                                                        onChange={this.handleChange} error={error.pw ? "error" : ""}/>
                                            <Form.Button fluid primary content="Anmelden" size="medium"/>
                                        </Form.Group>

                                    </Form>
                                </Grid.Column>


                                <Grid.Column>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}