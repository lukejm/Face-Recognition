import './FaceRecognition.css';
import ProcessImage from "./ProcessImage.js";

function createHTML(boxes, image) {
  let count = 0;
  console.log(boxes);
  return boxes.map(rawBox => {
    const box = ProcessImage(rawBox, image.height, image.width);
    return (
      <div className='bounding-box' key={count++}
           style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    );
  });
}

function FaceRecognition({imageURL, AppBoxes}) {
  if (imageURL === null || AppBoxes === null) {
    return ('');
  }
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img src={imageURL} id='scanImage' alt='default' width='400px' height='auto' />
        {createHTML(AppBoxes)}
      </div>
    </div>
  );
}

export default FaceRecognition;