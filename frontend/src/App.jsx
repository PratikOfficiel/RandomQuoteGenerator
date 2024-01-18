
import { useEffect, useState } from 'react'
import './App.css'

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function App() {
  const [quote,setQuote] = useState('');
  const [loading,setLoading] = useState(false);
  const [bgcolor,setBgcolor] = useState('gray');

  const getQuote = ()=>{

    setLoading(true);

    fetch("https://type.fit/api/quotes")
    .then((response)=>{
      return response.json();
    })
    .then((data)=>{
      const quote = (data[(Math.floor(Math.random()*(data.length+1)))]).text;
      setQuote(quote);
      setBgcolor(getRandomColor());
      setLoading(false);
    })
    .catch((err)=>(console.log(err)));

  }

  useEffect(()=>{

    getQuote();

  },[])

  return (
    <div className='app' style={{background:bgcolor}}>
      <div className='card' style={{background:`linear-gradient( rgba(0,0,0,0.3), rgba(0,0,0,0.3) ), ${bgcolor}`}}>
        <h1 className='heading'>{loading?('...'):(quote)}</h1>
        <button onClick={getQuote} className='button'>
          <span>New Quote</span>
        </button>
      </div>
    </div>
  )
}

export default App
