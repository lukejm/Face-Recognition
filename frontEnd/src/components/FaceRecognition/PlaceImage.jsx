function PlaceImage({imageURL}) {
  if (imageURL === null) {
    return ('');
  }
  return (
    <img id='inputImage' src={imageURL} alt='default' width='400px' height='auto' />
  );
}

export default PlaceImage;