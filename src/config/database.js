import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://alanmorog:Syncreon23@cluster0.rh6aq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;
