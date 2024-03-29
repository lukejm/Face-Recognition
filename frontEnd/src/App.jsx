import './styles.css';
import './components/FaceRecognition/FaceRecognition.css';
import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesComp from "./components/Particles/ParticlesComp.jsx";
import { useState, useEffect } from "react";
import PlaceImage from "./components/FaceRecognition/PlaceImage.jsx";
import credentials from './Credentials.js';
import FaceBoxes from "./components/FaceRecognition/FaceBoxes.jsx";
import Signin from "./components/SignIn/SignIn.jsx";
import Register from "./components/Register/Register.jsx";





export default function App() {
  const defaultImg = 'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg';
  const defaultBoxes = [{topRow: 0.2476034, leftCol: 0.4314273, bottomRow: 0.62233967, rightCol: 0.6275647}];

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [boxes, setBoxes] = useState(null);
  const [route, setRoute] = useState('signedOut');
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log);
  });

  const onImageChange = (IMAGE_URL) => {
    const creds = JSON.parse(credentials());
    const PAT = creds.PAT;
    const USER_ID = creds.USER_ID;
    const APP_ID = creds.APP_ID;
    const MODEL_ID = creds.MODEL_ID;
    const MODEL_VERSION_ID = creds.MODEL_VERSION_ID;

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
              // "base64": IMAGE_BYTES_STRING
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    let box = {};
    let boxCollection = [];

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {
        const regions = result.outputs[0].data.regions;
        console.log(regions);
        regions.forEach(region => {
          const boundingBox = region.region_info.bounding_box;
          box.topRow = boundingBox.top_row.toFixed(3);
          box.leftCol = boundingBox.left_col.toFixed(3);
          box.bottomRow = boundingBox.bottom_row.toFixed(3);
          box.rightCol = boundingBox.right_col.toFixed(3);
          boxCollection.push(box);
        })
      })
      .catch(error => console.log('error', error));
    setImage(IMAGE_URL);
    setBoxes(boxCollection);
    console.log(boxCollection);
  }

  const onButtonSubmit = () => {
    // onImageChange(image);
    setImageUrl(image);
    setTimeout(() => {
      // onImageChange(imageUrl);
      setBoxes(defaultBoxes);
    }, 2000);
  }

  const onInputChange = (event) => {
    setImage(event.target.value);
  }

  const onRouteChange = (type) => {
    setRoute(type);
  }

  const onUserChange = (user) => {
    setUser(user);
    console.log(user);
  }

  const signedInState = () => {
    return (
      <div className='app'>
        <ParticlesComp />
        <Navigation routeChange={onRouteChange}/>
        <Logo />
        <Rank name={user.name} entries={user.entries}/>
        <ImageLinkForm onChangeFunc={onInputChange} buttonSubmit={onButtonSubmit}/>
        <div className='center ma'>
          <div className='absolute mt2'>
            <PlaceImage imageURL={imageUrl}/>
            <FaceBoxes appBoxes={boxes} />
          </div>
        </div>
      </div>
    );
  }

  const signedOutState = () => {
    return (
      <div>
        <ParticlesComp />
        <Signin routeChange={onRouteChange} setUser={onUserChange} />
      </div>
    )
  }

  const registerState = () => {
    return (
      <div>
        <ParticlesComp />
        <Register routeChange={onRouteChange} />
      </div>
    )
  }


  switch(route) {
    case 'signedIn':
      return signedInState();
    case 'signedOut':
      return signedOutState();
    case 'register':
      return registerState();
  }
}

