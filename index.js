import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port=3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', async (req, res)=>{
    res.render('index.ejs');
});

app.post('/submit', async(req, res)=>{
    const a= req.body.cancion;
    console.log(a);
        try{
        const response=await axios.get("https://itunes.apple.com/search?term="+a+"&entity=musicTrack");
        const resultado= response.data;
        console.log(resultado);
    res.render("index.ejs", {
        cancion:a,
        data: resultado,
    });
     } catch (error){
        console.log('failed to make request:', error.message);
    res.render("index.ejs",{
        error: "no activities that match your criteria",
    });
    }
});

app.listen(port, ()=>{
    console.log('server running on port: '+port);
});