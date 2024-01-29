import './Rank.css';

function Rank({ name, entries }) {
  const header = () => {
    return name + ' has checked: ' + entries + ' images.';
  }

  return (
    <div>
      <div className='white f3 center'>
        {header()}
      </div>
    </div>
  )

}

export default Rank;

