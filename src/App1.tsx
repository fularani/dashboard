import * as React from 'react';
import {Form,FormGroup,TextInput,InputGroup,Button,Popover,HelperText,HelperTextItem} from "@patternfly/react-core";
import './App.css';
import EyeIcon from '@patternfly/react-icons/dist/esm/icons/eye-icon';
import EyeSlashIcon from '@patternfly/react-icons/dist/esm/icons/eye-slash-icon';
import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';

const App1: React.FunctionComponent = () => {

  const [password,setPassword]=React.useState("");
  const [passwordHidden, setPasswordHidden] = React.useState<boolean>(true);
  const [isValid,setIsValid]=React.useState<boolean>(false);

  const handleChangeInput=(pwdvalue: string,e: React.FormEvent<HTMLInputElement>)=>{
    setPassword(pwdvalue);
    validate(pwdvalue);
  }

  const validate=(pwdvalue: string)=>{

    let regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
    if(regex.test(pwdvalue)){
        // console.log("Strong Password"); 
        setIsValid(true)       
    }
    else{
        // console.log("invalid password"); 
        setIsValid(false)       
    }
  }

  const handleSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    console.log(`handleSubmit clicked: ${password}`); 
  }

  return (
    <Form onSubmit={handleSubmit} className="form" isHorizontal isWidthLimited>
        <FormGroup label="Password" fieldId="password" labelIcon={
          <Popover
            hasAutoWidth
            headerContent={
              <div>
                The Password must:
              </div>
            }
            bodyContent={
              <div>
                1.be 10-16 characters long but,not to contain any whitespaces.<br/>
                2.At least one Uppercase and Lowercase character.<br/>
                3.At least one digit and Special Symbol.<br/>
              </div>
            }
          >
            <button
              type="button"
              onClick={e => e.preventDefault()}
              className="pf-c-form__group-label-help"
            >
              <HelpIcon noVerticalAlign />
            </button>
          </Popover>
        }
        helperText={isValid===true?((<div><HelperText component="ul"><HelperTextItem variant="success" component="li" hasIcon>Strong Password</HelperTextItem></HelperText></div>)):(<div><HelperText component="ul"><HelperTextItem variant="error" component="li" hasIcon>Invalid Password</HelperTextItem></HelperText></div>)} 
        isRequired>
           <InputGroup>
              <TextInput id="password" name="password" type={passwordHidden ? 'password' : 'text'} value={password} onChange={handleChangeInput} isRequired/>              
              <Button variant="control" onClick={()=>setPasswordHidden(!passwordHidden)}>{passwordHidden ? <EyeIcon /> : <EyeSlashIcon />}</Button> 
           </InputGroup>
        </FormGroup>
    </Form>  
  )
}

export default App1