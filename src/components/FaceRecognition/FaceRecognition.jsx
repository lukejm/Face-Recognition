
function FaceRecognition({image}) {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img src={image} alt='default' width='400px' height='auto' />
      </div>
    </div>
  );
}

export default FaceRecognition;