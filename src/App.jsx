import './styles.css';
import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesComp from "./components/Particles/ParticlesComp.jsx";
import {useState} from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import credentials from './Credentials.js';
import processImage from "./components/FaceRecognition/ProcessImage.js";




export default function App() {
  const defaultImg = 'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg';
  const defaultBox = {topRow: 0.2476034, leftCol: 0.4314273, bottomRow: 0.62233967, rightCol: 0.6275647};
  const [image, setImage] = useState(defaultImg);
  const [box, setBox] = useState(defaultBox);

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
          setBox(processImage(box));
        })
      })
      .catch(error => console.log('error', error));
    setImage(IMAGE_URL);
  }


  const onButtonSubmit = (url) => {
    // onImageChange(defaultImg);
  }

  const onInputChange = (event) => {
    console.log(event.target.value);
    // setImage(event.target.value);
  }
  return (
    <div className='app'>
      <ParticlesComp />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onChangeFunc={onInputChange} buttonSubmit={onButtonSubmit}/>
      <FaceRecognition image={image} box={box}/>
    </div>
  );
}

