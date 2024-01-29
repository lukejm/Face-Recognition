import {useState} from "react";


async function fetchCredentials(credentials) {
  try {
    const request = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })};
    const data = await fetch('http://localhost:3000/signin', request)
    return await data.json();
  } catch (error) {
    console.log(error);
  }
}

function SignIn({ routeChange, setUser }) {
  const [loaded, setLoaded] = useState(true);

  let password = '';
  const fillPassword = (res) => {
    password = res.target.value;
  }

  let email = '';
  const fillEmail = (res) => {
    email = res.target.value;
  }

  function processResponse(responseJson) {
    if (JSON.stringify(responseJson) === JSON.stringify({auth: "error"})) {
      alert('Wrong username or password.');
    } else {
      setUser(responseJson);
      routeChange('signedIn', responseJson);

    }
  }

  const signIn = async () => {
    setLoaded(false);
    const creds = {email: email, password: password};
    password = '';
    email  = '';
    const response = await fetchCredentials(creds);
    setLoaded(true);
    console.log(response);
    processResponse(response);
  }

  // signIn();

  if (!loaded) { return (<div>loading...</div>);}

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
            <input  onClick={signIn}
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
  );
}

export default SignIn;
