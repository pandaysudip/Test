
  import './authentication.styles.scss';
  import SignUpFrom from '../../components/sign-up-form/sign-up-form.component';
  import SignInFrom from '../../components/sign-in-form/sign-in-form.component';
  const Authentication = () => {
    
  
    return (
      <div className='authentication-container'>
        <SignInFrom />
        <SignUpFrom />
        
      </div>
    );
  };
  
  export default Authentication;