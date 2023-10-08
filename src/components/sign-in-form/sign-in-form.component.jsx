import { useState } from "react";
import './sing-in.style.scss';
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from "../../Utils/firebase/firebase.utils";

const defaultFormField = {
    email: '',
    password: '',
}
const SignInFrom = () => {
    const [formFields, setFormFields] = useState(defaultFormField);
    const { email, password}= formFields;
    console.log(formFields);
    const resetFromFields = () => {
        setFormFields(defaultFormField);
    };
    const signInwithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
       await createUserDocumentFromAuth(user);
      };
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
        const response = await signInAuthUserWithEmailAndPassword (email, password);
        console.log(response);
        resetFromFields();
        } catch (error) {
            switch(error.code) {
               case 'auth/wrong-password' :
                alert ('incorrect email');
                break
                case 'auth/user-not-found':
                alert('incorrect email');
            break;
            default:
           console.log(error);
            }
        }
    };
    const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields ({...formFields, [name]: value });
    };
    return (
        <div className="sign-up-container">
            <h2>Already have account? </h2>
            <span> Sign In With email and password </span>
            <form onSubmit ={handleSubmit}>
                
                
                <FormInput 
                label = 'Email'
                type ='email' 
                required 
                onChange={handleChange} 
                name="email" 
                value={email}
                />
                
                <FormInput 
                label = 'Password'
                type = 'password' 
                required 
                onChange={handleChange} 
                name="password" 
                value={password}/>
                <div className="buttons-container">
                <Button type="submit">Sign In</Button>
                <Button type ='button' buttonType= 'google' onClick = {signInwithGoogle}> Google </Button>
                </div>
                
            </form>
        </div>
    );
};
export default SignInFrom;