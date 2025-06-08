import express from "express"
import path from "path"
import bodyParser from "body-parser"
import axios from "axios"

const app=express();
const port=process.env.PORT || 3000;
const API_KEY="ecb43bcc547a0df89c849a2cb77cfe02";
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/submit",async(req,res)=>{
    const request=await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + req.body["place"] +"&appid=" +API_KEY);
    const temperature=request.data.main.temp;
    res.render("index.ejs",{
        place:req.body["place"],
        weather:request.data.weather[0].main,
        description:request.data.weather[0].description,
        temp:(temperature-273.15).toFixed(0),
        humidity:request.data.main.humidity,
        wind:request.data.wind.speed,
    })
});


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
});
