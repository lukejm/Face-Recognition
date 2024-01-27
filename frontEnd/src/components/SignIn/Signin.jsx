import {useEffect, useState, useRef} from "react";


function Signin({ routeChange }) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [credentials, setCredentials] = useState({ email: '', password: ''});


  const signInPostData = () => {
    console.log('signInPostData');
    if (credentials.email === undefined
            || credentials.password === undefined
            || (credentials.email === '' && credentials.password === '')) {
      console.log('null values');
    } else {
      console.log(credentials);
      fetch('http://localhost:3000/signin', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
    })

      .then(response => response.json())
      .then(result => {
        console.log("homer:", result);
        if (result.auth === true) {
          routeChange('signedIn');
          console.log('signed in');
        } else {
          console.log('not signed in');
        }
      })
      // .then(result => setResponse(result));
  }
    setEmail('');
    setPassword('');
  };

  useEffect(signInPostData, [credentials]);



  const setResponse = (result) => {
    console.log(result)
  }

  const checkSignIn = () => {
    setCredentials({email: email, password: password})
    // const functionEmail = email;
    // const functionPassword = password;
    // setEmail('');
    // setPassword('');
    // signInPostData(functionEmail, functionPassword);
  }

  const fillPassword = (res) => {
    setPassword(res.target.value);
  }

  const fillEmail = (res) => {
    setEmail(res.target.value);
  }

  return (
    <article className="br5 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
      <main className="pa4 black-80">
        <form className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f4 fw6 ph0 mh0 center">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6"
                     htmlFor="email-address">Email</label>
              <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                     type="email"
                     name="email-address"
                     id="email-address"
                     onChange={fillEmail} />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                     type="password"
                     name="password"
                     id="password"
                     onChange={fillPassword} />
            </div>
          </fieldset>
          <div className="center">
            <input  onClick={checkSignIn}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Sign in" />
          </div>
          <div className="lh-copy mt3 center">
            <a href="#0" className="f6 link dim black db"
                    onClick={() => routeChange('register')}>Sign up</a>
          </div>
        </form>
      </main>
    </article>
)
  ;
}

export default Signin;
