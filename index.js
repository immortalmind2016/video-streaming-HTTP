const express=require("express")
const app=express()
const fs=require('fs')

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/video",(req,res)=>{

    const range=req.headers.range;
    if(!range){
        res.status(400).send("Requires Range Header")
    }
    const videoPath="REST-VIDEO2.mp4";
    const videoSize=fs.statSync("REST-VIDEO2.mp4").size;

    const CHUNK_SIZE=10**6 //1MB
    let start=Number(range.replace(/\D/g,""));
    let end=Math.min(start+CHUNK_SIZE,videoSize-1)
  

    const contentLength=end-start+1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };
    res.writeHead(206,headers)
    const videoStream=fs.createReadStream(videoPath,{start,end});
    videoStream.pipe(res)

 })

app.listen(4000,()=>{
    console.log("App is running on port 4000")
})