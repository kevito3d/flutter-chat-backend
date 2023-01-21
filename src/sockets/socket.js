const {io} = require('../index');
io.on('connection', client => {
    console.log('Client connected...');
    client.on('disconnect', () => { console.log('Client disconnected') });
    client.on('message', (payload) => {
        console.log(payload);
    io.emit('message', {"admin": "Nuevo mensaje"});
    });
});