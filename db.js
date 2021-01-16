const mongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

mongoClient
    .connect('mongodb://localhost:27017', { useUnifiedTopology: true })
    .then((conn) => (global.conn = conn.db('workshop')))
    .catch((err) => console.log(err));

function findAll(callback) {
    global.conn.collection('customers').find({}).toArray(callback);
}

function insertOne(customer, callback) {
    global.conn.collection('customers').insert(customer, callback);
}

function deleteOne(id, callback) {
    global.conn
        .collection('customers')
        .deleteOne({ _id: new objectId(id) }, callback);
}

function findOne(id, callback) {
    global.conn
        .collection('customers')
        .find(new objectId(id))
        .toArray(callback);
}

function update(id, customer, callback) {
    global.conn
        .collection('customers')
        .updateOne({ _id: new objectId(id) }, { $set: customer }, callback);
}

module.exports = { deleteOne, findAll, findOne, insertOne, update };
