# Video Streaming Using Nodejs
this is a video streaming nodejs example based on HTTP protocol

# You should read about Nodejs stream types
  here i'm using readable stream to read data from (video) , and pipe method to write data into the writable stream which is response of the express GET route
  [NodeJS Docs](#nodejs) 
  <a id="#nodejs" href="https://nodejs.org/api/stream.html"></a>
# Idea
as we know that the `<Video></Video>` element inside HTML expected to receive a video streaming as data chunks 

# Steps
- Video element request the URI inside the source tag with request header contains {Range} which allows us to know in which part the video buffer is stopped on the video bar.
- Server takes this header and calculates the start and end, we have added a default chunk size to be 1MB
- The server responded to the client with a header 
  ```javascript 
      {
        "Content-Range": `bytes 0-1000000/2000000`,
        "Accept-Ranges": "bytes",
        "Content-Length": "2000000",
        "Content-Type": "video/mp4",
      };
    ```
- So the client/video element will render the rest of the video based on this response header data
