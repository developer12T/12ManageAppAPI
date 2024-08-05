const http = require('http');
require('dotenv').config(); 
const app = require('./app');
// const connectOrderDB = require('./12Order/config/db');
// const connectErpDB = require('./12Erp/config/db');

const { API_PORT } = process.env
const PORT = process.env.PORT || API_PORT;

const server = http.createServer(app)
server.listen(PORT,()=>{
    console.log(`server is running ${API_PORT}`)
})

// Promise.all([
//     connectOrderDB(),
//     // connectErpDB(),
// ]).then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch(err => {
//     console.error('Failed to connect to databases', err);
// });
