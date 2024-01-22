import './ImageLinkForm.css';

function ImageLinkForm() {
  return (
    <div>
      <p className='f3 center'>
        {'This App will Detect Faces in Images.'}
      </p>
      <div className='center form'>
        <div className='pa4 br3 shadow-5 center'>
          <input className='f3 pa2 w-70 center' type='text' />
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
        </div>
      </div>
    </div>
  );

}

export default ImageLinkForm;
