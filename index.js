//const express = require("express");// "type":"commno.js

import express from "express";  //"type":"module" ,i.e package.json
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.MONGO_URL)

const app= express();
const PORT = process.env.PORT
const movies = [
    {   
        "id":"100",
        "name": "Iruthi Suttru",
        "poster": "https://upload.wikimedia.org/wikipedia/en/f/fe/Irudhi_Suttru.jpg",
        "rating": "7.6",
        "summary":
            "A former boxer quits boxing following an argument with the authorities over underlying politics. He goes on to coach a fisher woman so that he can fulfil his dreams through her.",
    },
    {    
        "id":"101",
        "name": "Ghilli",
        "poster": "https://pbs.twimg.com/media/EVyhuIsU4AANZ1B?format=jpg&name=large",
        "rating": "8",
        "summary":
            "Velu, an aspiring Kabaddi player, is in Madurai to participate in one of the regional matches when he rescues Dhanalakshmi from Muthupandi, a powerful man keen on marrying the girl against her wishes.",
    },
    {   
         "id":"102" ,
        "name": "Sarpatta Parambarai",
        "poster": "https://www.filmibeat.com/ph-big/2021/07/sarpatta_16270131169.jpg",
        "rating": "8.7",
        "summary":
            "When Sarpatta Parambarai is challenged to a do-or-die match, Kabilan, a young labourer, must choose whether to put on the gloves himself and lead his clan to victory, or be dissuaded by his disapproving mother and dangerous politics.",
    },
    {    
         "id":"103",
        "name": "Sachein",
        "poster":
            "https://ahseeit.com/tamil/king-include/uploads/2019/04/fb_img_1555300460361-1223526052.jpg",
        "rating": "7.4",
        "summary":
            "Genelia and Vijay are college classmates who become good friends; Vijay eventually expresses his love for Genelia, but she rejects it; in response, Vijay confidently tells her that she will fall in love with him in 30 days.",
    },
    {    "id":"104",
        "name": "Manmadhan",
        "poster": "https://wallpaperaccess.com/full/4738412.jpg",
        "rating": "7.2",
        "summary":
            "When Mythili meets Mathan, she's at once attracted and terrified since he looks exactly like the serial killer from her nightmares; in fact, he fits the description of a man who targets women in bars.",
    },
];

//middle ware -> intercept->converting body to json
  app.use(express.json());
  const MONGO_URL = process.env.MONGO_URL;
 //const MONGO_URL = "mongodb://localhost";
 async function createConnection(){
     const client = new MongoClient(MONGO_URL);
     await client.connect();
     console.log("Mongo is connected😉👍");
     return client;
 }
const client = await createConnection();

//display the "/"=>welcome to movie app
app.get("/",function(request,response){
    response.send("Welcome to the Movie App😘🎉😍🙌");
})

//cursor - pagination--> convert to Array (toArray)
app.get("/movies",async function(request,response){

    const movies = await client.db("favflim").collection("movies") .find({}).toArray();

    response.send(movies);
})

//display the "/movies/:id" =>should get movie accordign to id
app.get("/movies/:id", async function(request,response){
    console.log(request.params);
    const {id} = request.params;
    //find method to used get individal movie..find method also helps toget indivual element ,it wont return array
   // const movie = movies.find((mv) => mv.id===id);
   //db .movies.findOne

   const movie =await client
   .db("favflim")
   .collection("movies")
   .findOne({id:id});
   console.log(movie);
   movie ? response.send(movie)
          : response.status(404).send({message:"No such movie found 🤷‍♀️"});
})

app.delete("/movies/:id",async function(request,response){
    console.log(request.params);
    //db.movies.deleteOne({id:""})
   const {id} = request.params;
       const result = await client.db("favflim").collection("movies").deleteOne({id:id});
    response.send(result);
})

app.put("/movies/:id",async function(request,response){
    console.log(request.params);
    //db.movies.updateOne({id:""},{$set:updateData})
   const {id} = request.params;
   const updateData = request.body
       const result = await client.db("favflim").collection("movies").updateOne({id:id},{ $set : updateData});
    response.send(result);
})

app.post("/movies",async function(request,response){
    //db.movies.insertMany(data)
    const data = request.body;
    console.log(data);
    const result = await client.db("favflim").collection("movies").insertMany(data);
    response.send(result);
})

app.listen(PORT,()=>console.log(`server is started in ${PORT}`));