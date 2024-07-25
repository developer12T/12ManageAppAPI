require('dotenv').config(); 
const app = require('./app');
const connectOrderDB = require('./12Order/config/db');

const PORT = process.env.PORT || 3000;

Promise.all([
    connectOrderDB(),
]).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to databases', err);
});
