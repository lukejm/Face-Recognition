const Navigation = ({ routeChange }) => {
  return (
    <nav className='main-nav'>
      <p className='f3 link dim black underline pa3 pointer' onClick={() => routeChange('signedOut')}>Sign out</p>
    </nav>
  );
}

export default Navigation;