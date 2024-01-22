import Tilt from 'react-parallax-tilt';
import './Logo.css';

function Logo() {

  return (
    <Tilt>
      <div style={{ height: '100px', width: '100px' }}>
        <h1 className='bg-center logo-header'>🕸</h1>
      </div>
    </Tilt>
  );
}

export default Logo;