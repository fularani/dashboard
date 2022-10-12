import * as React from 'react';
import {Form,FormGroup,FormHelperText,HelperText,TextInput} from "@patternfly/react-core"
import './App.css';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';

const App = () => {

  const [state, setState] = React.useState({
    password: "",
    ruleLength: 'indeterminate',
    ruleContent: 'indeterminate',
    ruleCharacters: 'indeterminate',
    passStrength: {
      variant: 'error',
      icon: <ExclamationCircleIcon />,
      text: 'Weak'
    }
  });

  const handlePasswordInput = (password:string) => {
    setState({...state,password});
    validate(password);
  };

  const validate = (password:string) => {
    if (password === '') {
      setState({...state,
        ruleLength: 'indeterminate',
        ruleContent: 'indeterminate',
        ruleCharacters: 'indeterminate'
      });
      return;
    }

    if (password.length < 14) {
      setState({...state, ruleLength: 'error' });
    } else {
      setState({...state, ruleLength: 'success' });
    }

    if (/redhat/gi.test(password)) {
      setState({...state,ruleContent: 'error' });
    } else {
      setState({...state,ruleContent: 'success' });
    }

    let rulesCount = 0;
    let strCount = 0;
    if (/[a-z]/g.test(password)) {
      rulesCount++;
    }
    if (/[A-Z]/g.test(password)) {
      // strCount += password.match(/[A-Z]/g).length;
      rulesCount++;
    }
    if (/\d/g.test(password)) {
      // strCount += password.match(/\d/g).length;
      rulesCount++;
    }
    if (/\W/g.test(password)) {
      // strCount += password.match(/\W/g).length;
      rulesCount++;
    }

    if (rulesCount < 3) {
      setState({...state,ruleCharacters: 'error' });
    } else {
      setState({...state,ruleCharacters: 'success' });
    }

    if (strCount < 3) {
      setState({ ...state,passStrength: { variant: 'error', icon: <ExclamationCircleIcon />, text: 'Weak' } });
    } else if (strCount < 5) {
      setState({ ...state,passStrength: { variant: 'warning', icon: <ExclamationTriangleIcon />, text: 'Medium' } });
    } else {
      setState({ ...state,passStrength: { variant: 'success', icon: <CheckCircleIcon />, text: 'Strong' } });
    }
  };  

  return (
    <Form>
        <FormGroup
          label="Password"
          isRequired
          fieldId="password-field"
          {...(((state || {}).ruleLength) === 'success' &&
          ((state || {}).ruleContent) === 'success' &&
          ((state || {}).ruleCharacters) === 'success' && {
              labelInfo: (<HelperText>
                  {/* <HelperTextItem variant={((state || {}).passStrength || {}).variant} icon={((state || {}).passStrength || {}).icon}>         */}
                  {((state || {}).passStrength || {}).text}
                  {/* </HelperTextItem> */}
            </HelperText>)
            })}
        >
          <TextInput
            isRequired
            type="text"
            id="password-field"
            name="password-field"
            aria-describedby="password-field-helper"
            aria-invalid={((state || {}).ruleLength) === 'error' || ((state || {}).ruleContent) === 'error' || ((state || {}).ruleCharacters) === 'error'}
            value={((state || {}).password)}
            onChange={handlePasswordInput}
          />
          <FormHelperText isHidden={false} component="div">
            <HelperText component="ul" aria-live="polite" id="password-field-helper">
              {/* <HelperTextItem isDynamic variant={((state || {}).ruleLength)} component="li">              
                Must be at least 14 characters
              </HelperTextItem>
              <HelperTextItem isDynamic variant={((state || {}).ruleContent)} component="li">             
                Cannot contain the word "redhat"
              </HelperTextItem>
              <HelperTextItem isDynamic variant={((state || {}).ruleCharacters)} component="li">              
                Must include at least 3 of the following: lowercase letter, uppercase letters, numbers, symbols
              </HelperTextItem> */}
            </HelperText>
          </FormHelperText>
        </FormGroup>
      </Form>
  )
}

export default App
