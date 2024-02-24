// Import necessary modules
import express from 'express';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {Server}  from 'socket.io';
const io = new Server({cors:true});

// Create an Express application
const app = express();

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname as before
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
app.get('/work_station_b', (req, res) => {
  res.render('work_station_b', { title: 'work station b' });
});

// Start the server
const port = process.env.PORT || 3000;
// io.listen(8001);


app.post('/listen',(req,res,next)=>{
    const {port} =  req.body
    
io.listen(port);
return res.json({port})

})
io.on('connection',function(socket){
    console.log('New Connection',socket.id);
    // socket.emit('connected',{status:true})
    socket.emit('connectedToA','true')

    socket.on('senderMessage',(message)=>{
        socket.emit('toSender',message)
        socket.broadcast.emit('toReciever',message)
    })
})
app.listen(port, () => console.log(`Server is running on port ${port}`));

