import './FaceRecognition.css';



function PlaceImage({imageURL}) {
  if (imageURL === null) {
    return ('');
  }
  return (
    <div id='scanImage'>
      <img src={imageURL} alt='default' width='400px' height='auto' />
    </div>
  );
}

export default PlaceImage;