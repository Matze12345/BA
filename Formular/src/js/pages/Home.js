import React from "react";
import { Button, FormGroup, FormControl, Checkbox, Radio, ControlLabel, HelpBlock } from 'react-bootstrap';
import * as ReactBootstrap from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}



export default class Home extends React.Component {

    constructor(props) {
        super(props);
    }



  render() {

      const formInstance = (
          <form>
              <FieldGroup
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Enter text"
              />
              <FieldGroup
                  id="formControlsEmail"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
              />
              <FieldGroup
                  id="formControlsPassword"
                  label="Password"
                  type="password"
              />
              <Button type="submit">
                  Submit
              </Button>
          </form>
      );

    return (
      <div>
        <div class="row">
          <div class="col-lg-12">
              {formInstance}
          </div>
        </div>
      </div>
    );
  }
}
