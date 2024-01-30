import {useState} from "react";

function Register({ routeChange }) {
  const [loaded, setLoaded] = useState(true);

  let name = '';
  const fillName = (res) => {
    name = res.target.value;
  }

  let password = '';
  const fillPassword = (res) => {
    password = res.target.value;
  }

  let email = '';
  const fillEmail = (res) => {
    email = res.target.value;
  }

  const registerUser = async (credentials) => {
    try {
      const request = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password
        })};
      const data = await fetch('http://localhost:3000/register', request)
      return await data.json();
    } catch (error) {
      console.log(error);
    }
  }

  const register = async () => {
    setLoaded(false);
    const creds = {name: name, email: email, password: password};
    password = '';
    email = '';
    const response = await registerUser(creds);
    if (JSON.stringify(response) !== JSON.stringify('error')) {
      console.log(response);
      routeChange('signedOut');

    } else {
      alert("error: registration couldn't be completed.");
      setLoaded(true);
    }
  }

  if (!loaded) { return (<div>loading...</div>);}

  return (
    <div className='center'>
      <article className="pa4 black-80">
        <form action="sign-up_submit" method="get" acceptCharset="utf-8">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="ph0 mh0 fw6 clip">Sign Up</legend>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="email-address">Name</label>
              <input className="pa2 input-reset ba bg-transparent w-100 measure"
                     type="text"
                     name="name"
                     id="name"
                     onInput={fillName}/>

            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="email-address">Email address</label>
              <input className="pa2 input-reset ba bg-transparent w-100 measure"
                     type="email"
                     name="email-address"
                     id="email-address"
                     onInput={fillEmail}/>

            </div>
            <div className="mt3">
              <label className="db fw4 lh-copy f6" htmlFor="password">Password</label>
              <input className="b pa2 input-reset ba bg-transparent"
                     type="password"
                     name="password"
                     id="password"
                     onInput={fillPassword}/>
            </div>
          </fieldset>
          <div className="mt3 center"><input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            type="submit" value="Sign Up"
            onClick={register}/></div>
        </form>
      </article>
    </div>
  )
}

export default Register;