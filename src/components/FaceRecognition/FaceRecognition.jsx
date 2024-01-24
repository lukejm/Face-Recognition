import './FaceRecognition.css';

function createHTML(boxes) {
  return boxes.map(box => {
    return (
      <div className='bounding-box'
           style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    );
  });
}

function FaceRecognition({image, boxes}) {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img src={image} id='scanImage' alt='default' width='400px' height='auto' />
        {createHTML(boxes)}
      </div>
    </div>
  );
}

export default FaceRecognition;