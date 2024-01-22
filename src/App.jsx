import './styles.css';
import Navigation from "./components/Navigation/Navigation.jsx";
import Logo from "./components/Logo/Logo.jsx";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.jsx";
import Rank from "./components/Rank/Rank.jsx";
import ParticlesComp from "./components/Particles/ParticlesComp.jsx";
import defaultImg from '../public/sample.jpg';
import {useState} from "react";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.jsx";





function App() {
  const [img, setImage] = useState(defaultImg);


  const onButtonSubmit = (event) => {
    clarAi(event.target.value);
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
