import './styles.css';
import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesComp from "./components/Particles/ParticlesComp.jsx";
import {useState} from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";
import clariAI from './components/FaceRecognition/Clarifai.jsx';

function App() {
  const defaultImg = 'https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg';
  const [img, setImage] = useState(defaultImg);

  clariAI(defaultImg);
  // setImage(defaultImg);

  const onButtonSubmit = (event) => {
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
      <FaceRecognition image={img}/>
    </div>
  );
}

export default App
