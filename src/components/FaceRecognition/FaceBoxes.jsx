import './FaceRecognition.css';

function processImage(box, height, width) {
  return ({
    leftCol: Math.round(box.leftCol * width),
    rightCol: Math.round(box.rightCol * width),
    topRow: Math.round(box.topRow * height),
    bottomRow: Math.round(box.bottomRow * height)
  });
}

function FaceBoxes({appBoxes}) {
  if (appBoxes === null) {
    return ('');
  }
  let count = 0;
  // let rawBox = appBoxes[0];
  const faceBoxes = appBoxes.map((rawBox) => {
    const box = processImage(rawBox, 272, 400);
    console.log(box);
    return (
      <div className='bounding-box'
           style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
           key={count++}>
      </div>
    );
  });
  return (
    <div className='face-boxes'>
      {faceBoxes}
    </div>
  );
}
export default FaceBoxes;