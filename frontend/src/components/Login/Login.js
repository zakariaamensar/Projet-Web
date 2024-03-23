import "./Login.css"

function Login() {


  return (
    <div className='login-page'>
        <h1 className='form-header1'>flow</h1>
        <h4 className='form-header4'>Managing team projects like never before.</h4>
        <div className='form-container'>
        <form >
            <input
                    name='email'
                    className='form-input'
                    type="email"
                    placeholder="Email"
            />
            <br />
            <input
                	  name='password'
                    className='form-input'                
                    type="password"
                    placeholder="Password"
            />
            <br />

            <button type='submit' value="Login" className='form-button'>LogIn</button>
            <br/>
            <p>You don't have an account? SignUp now </p>
          </form>
          </div>
            {/* <p>You don't have an account? <Link to="/Signup" className='link'>Sign Up here</Link></p> */}
            

            

      </div>
  );
}

export default Login;
