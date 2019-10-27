// Do not forget to store your new request module in a variable in order to use it
const mongoose = require('mongoose');

var user = ".......";
var password = "......";
var bddname = "......";


var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
};

mongoose.connect('mongodb+srv://'+user+':'+password+'@cluster0-pphnn.mongodb.net/'+bddname+'?retryWrites=true&w=majority',
    options,
    function(err) {
        if (err) {
            console.log('Erreur connection a Mongodb !',err);
        } else {
            console.info('Connexion à MONGO ok !');
        }
    }
);

module.exports = mongoose;