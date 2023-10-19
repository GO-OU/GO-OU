const admin = require('firebase-admin');
const serviceAccount = require('./go-ou-abbdb-firebase-adminsdk-js6ml-b3f7af05f3.json');

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
