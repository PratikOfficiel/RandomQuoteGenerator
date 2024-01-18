import axios from 'axios'
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
  const [quote,setQuote] = useState({});
  const [loading,setLoading] = useState(false);
  const [bgcolor,setBgcolor] = useState('gray');

  const getQuote = ()=>{

    setLoading(true);

    axios.get('https://type.fit/api/quotes')
    .then((response)=>{
      
      const data = response.data;
      console.log(data);
      const quote = data[(Math.floor(Math.random()*(data.length)))]
      setQuote(quote);
      setBgcolor(getRandomColor());
      setLoading(false);
    })
    .catch((err)=>(console.log("error in the frontend; ",err)));

  }

  useEffect(()=>{

    getQuote();

  },[])

  return (
    <div className='grid place-content-center h-screen w-screen' style={{background:bgcolor}}>
      <div className='p-6 max-w-screen-md mx-auto rounded-md grid place-content-center shadow-2xl bg-black/20'>
        <blockquote className='text-teal-50 text-4xl m-6' style={{fontFamily: "'Kalam', cursive"}}>
          {loading?('Loading...'):(`"${quote.text}"`)} 
          <footer className='text-xl mt-4 text-right'>{loading?(''):(`~ ${quote.author}`)} </footer>
        </blockquote>
        <button onClick={getQuote} className='btn bg-black/20 p-3 mt-4 text-cyan-50 rounded-xl mx-auto shadow-lg text-lg hover:bg-black/10'> 
          <span>New Quote</span>
        </button>
      </div>
    </div>
  )
}

export default App
