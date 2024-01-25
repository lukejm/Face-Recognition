import './FaceRecognition.css';


function processImage(box, height, width) {
  return ({
    leftCol: box.leftCol * width,
    rightCol: box.rightCol * width,
    topRow: box.topRow * height,
    bottomRow: box.bottomRow * height
  });
}

function FaceBoxes({ appBoxes }) {
  if (appBoxes === null) {
    return ('');
  }
  let count = 0;
  // let rawBox = appBoxes[0];
  const faceBoxes = appBoxes.map((rawBox) => {
    const box = processImage(rawBox, 272, 400);
    console.log(box);
    return (
      <div className='bounding-box' key={count++}
           style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    );
  });
  return (
    <div className='face-boxes'>
      {faceBoxes}
    </div>
  );
}
export default FaceBoxes;