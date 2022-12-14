


var userArgs = process.argv.slice(2);

var async = require('async')
var Post = require('./models/post')
var User = require('./models/user')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var posts = []


function userCreate(first_name, last_name, Email, password,membership, cb) {
  userdetail = {first_name:first_name , last_name: last_name,Email:Email, password:password, membership:membership  }
  var user = new User(userdetail);
       
  user.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New User: ' + user);
    users.push(user)
    cb(null, user)
  }  );
}

function postCreate(title, author, text,edited, cb) {
  postdetail = { 
    title: title,
    text: text,
    author: author,
    edited:edited,
  }
    
  var post = new Post(postdetail);    
  post.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Post: ' + post);
    posts.push(post)
    cb(null, post)
  }  );
}

const bcrypt = require('bcrypt');
const password1 = 'sehaj123'
const hash1 = bcrypt.hashSync(password1, 10);
const password2 = 'samir123'
const hash2 = bcrypt.hashSync(password2, 10);
const password3 = 'rahul123'
const hash3 = bcrypt.hashSync(password3, 10);



function createUsers(cb) {
    async.series([
        function(callback) {
          userCreate('sehaj', 'chawla', 'sehaj@gmail.com', hash1,'member', callback);
        },
        function(callback) {
          userCreate('samir', 'dang', 'samir@gmail.com', hash2,'member', callback);
        },
        function(callback) {
          userCreate('rahul', 'saghir', 'rahul@gmail.com', hash3,'member', callback);
        }
        ],
        // optional callback
        cb);
}


function createPosts(cb) {
    async.parallel([
        function(callback) {
          postCreate('Internet                                                                                                                                                                                                                                                    ', users[0], 'Social media are interactive Web 2.0 Internet -based applications. ',"false", callback);
        },
        function(callback) {
          postCreate("PYTHON", users[1], 'python is a scripting language',"false", callback);
        },
        function(callback) {
          postCreate("linux", users[2], 'mostly used for hacking',"false", callback);
        },
        function(callback) {
          postCreate("javascript", users[2], 'Used in both fromtend and backend                                                                             ',"false", callback);
        }
        ],
        // optional callback
        cb);
}

                                                                           

async.series([
    createUsers,
    createPosts,
   
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



