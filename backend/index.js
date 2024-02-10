import express, { response } from "express";
import axios from 'axios';

const app = express();

const API_URL = "https://zenquotes.io/api/random/[your_key]";

app.get('/api/quotes', (req, res) => {
    
    axios.get(API_URL)
    .then((response)=>{
        res.send(response.data);
    })
    .catch((err)=>{
        res.send(`there is some error in your backend ${err}`)
    })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});