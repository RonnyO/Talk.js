# Talk.js - API
Talk exposes an API that can be used to access various components of the framework either directly from the console or inside your Node application.

## Setting up your environment
Talk is based on Node.js, which means it can only run on OSs that support Node. You will need to install Node, NPM, MongoDB and a few Node packages to get started. To help you set up, here are the steps required to install all related software on Ubuntu Linux (the princinples should be similar on other *nix / Linux OSs)

1. [Download](http://www.ubuntu.com/download "Download") and install Ubuntu either as a VM, sole OS or dual-boot (in case you wish to keep your current OS)
2. Once you're logged into Ubuntu, fire up your Terminal application (Accessories -> Terminal) and run the following commands, which will prepare your system for installation (do not copy the $ sign)
        
        $ sudo apt-get update
        $ sudo apt-get upgrade
        $ sudo apt-get install git curl wget build-essential libssl-dev vim
3. Head over to [apptob](http://apptob.org/) where you can create an installer script for Ubuntu, which will install Node, NPM and MongoDB. In the configuration screen choose:
    * Node.js - Stable
    * App Installer - Node Package Manager
    * NoSQL - MongoDB
4. Follow the instructions on how to create your installer script and copy the generated configuration to that script.
5. Run the script (answer 'Yes' to all questions) and you should be almost good to go
6. In your terminal, clone the Talk.js repository to a folder on your machine and install the required NPM packages:
        
        $ cd ~ && mkdir -p projects && cd projects
        $ git clone git@github.com:RonnyO/Talk.js.git talk_js
        $ cd talk_js
        $ npm install mongodb mongoose mongoose-types express
7. That's it - You're ready to Talk!

## Using Talk in your application

You can use Talk in your Node application by simply requiring the main *talk* modules like so:

    var Talk = require('talk/talk');
    Talk.init();
    
If you're happy using the CLI, you can fire up the Talk console by running *script/console* inside the *talk* module's top level directory. This will open an Rails-like console and allow you to
work directly with Talk API. the Talk object is exported into the CLI environment and is named (wait for it....) *Talk*.

    script/console
    talk.js > Talk.models.user.findById('4e5514376534a62726000001',function(err,user){
    ... // ... do something with the user you found
    ... });
    
## Talk Models

Talk models use [Mongoose](http://mongoosejs.com/ "Mongoose") as the ORM of choice to communicate with the underlying MongoDB on which we store all our data.
To access models inside Talk, use the 'models' property of your Talk object. For example, in your Node application you can do the following:

    var Talk = require('./talk'); //import the Talk object into your local scope
    
    // Find a user by email
    Talk.models.user.find({email:'me@example.com'}, ['first_name','email'], {limit:1}, function(err, docs){
      docs.forEach(function(user){
        console.log(user.email);
      });
    });
    
### Talk Model - CRUD methods

For the sake of convenience, Talk wraps Mongoose's CRUD methods, to provide a consistent sugary API to the underlying ORM.
Since we think Mongoose is great, we didn't change any of the method signatures, but simply wrapped them nicely for you.

To that end, if you're familiar with [Mongoose's query](http://mongoosejs.com/docs/finding-documents.html "Mongoose's query") API, you should be right at home with Talk models.

Talk models provide the following convenience methods to work with Mongoose:

1. **create** - Creates a new record in a given model
2. **find** - Finds one or more records in a given model by criteria
3. **findOne** - Finds one record in a given model by criteria
4. **findById** - Finds one record in a given model by ObjectId
5. **update** - Updates one or more records in a given model by criteria
6. **remove** - Removes one or more records in a given model by criterial
7. **object** - Returns the raw Mongoose model object which can be used to run more advanced commands supported by Mongoose
8. **count** - Returns the count of objects in a given model that match a criteria

#### Creating new records

Let's assume we want to create a new user in our Talk application. To do that, we access the users model inside your Talk object and call the **create**, passing the properties for our new user:

    var Talk = require('./talk'); //import the Talk object into your local scope
    
    var user = {
      'first_name':'Zohar',
      'last_name':'Arad',
      'email':'zohar@talkjs.com'
    }
    
    Talk.models.user.create(user, function(err){
      if(err){
        // ... do something with your errors
      }
    });
    
#### Updating existing records

Now that we have some records in our users collection, lets update some of them:

    var conditions = { name: /zohar/i },
        update     = { email: 'zohar@talk_js.com'},
        options    = { multi: true };
        
    Talk.models.user.update(conditions, update, options, function(err){
      if(err){
        // ... do something with your errors
      }
    });

Note that the *options* argument is not mandatory. You can safely omit it and only provide *conditions*, *update* and *callback* to the Talk.models *update* method.

#### Removing records

To remove records in our users collection, we call the *remove* method, passing it the search criteria for the records we wish to remove:

    var conditions = { name: /zohar/i };
        
    Talk.models.user.remove(conditions, function(err){
      if(err){
        // ... do something with your errors
      }
    });
    
#### Finding records

Talk models support Mongoose's *find*, *findOne* and *findById* queries, as well as move advanced queries using the Query object.

    var conditions = { name: /zohar/i },
        fields     = ['first_name','email'],
        options    = { limit: 1 };
        
    // regular finder
    Talk.models.user.find(conditions, fields, options, function(err, docs){
      if(err){
        // ... do something with your errors
      } else {
        docs.forEach(function(user){ // docs is an array
          console.log(user.email);
          console.log(user.last_name); //error - we didn't specify the last_name field in our 'fields' array
        });
      }
    });
    
    // We can achieve the above using findOne:
    
    Talk.models.user.findOne(conditions, fields, function(err, user){
      if(err){
        // ... do something with your errors
      } else {
        console.log(user.email);
        console.log(user.last_name); //error - we didn't specify the last_name field in our 'fields' array
      }
    });
    
    // Or we can find a user by ObjectId
    
    Talk.models.user.findById('4e5514376534a62726000001', function(err, user){
      if(err){
        // ... do something with your errors
      } else {
        console.log(user.email);
        console.log(user.last_name); //error - we didn't specify the last_name field in our 'fields' array
      }
    });
    
Finally, we can count documents in our users model using the *count* method like so:

    var conditions = { name: /zohar/i };
    
    Talk.models.user.count(conditions,function(err, c){
      console.log('We have '+c+' users who\'s first name starts with "zohar"');
    });

#### Model callbacks scope

Lets assume we want to create a new document and immidiately count how many documents we have after insertion. Technically, we could refer to our Talk model by its fully qualified name inside our *create* callback, but
that feels a bit tedious. Instead, Talk scopes any model callback to the Model API, using **this**. So, in our *create* callback, we would refer to the *Talk.models.somemodel* using **this** rather than using its fully-qualified 
name.
  
    // Lets add Neil Finn to our users collection
    var user = {
      'first_name':'Neil',
      'last_name':'Finn',
      'email':'neil.finn@crowdedhouse.com'
    }
    
    Talk.models.user.create(user, function(err){
      if(err){
        // ... do something with your errors
      } else {
        this.count({last_name:'Finn'},function(err, counter)){
          console.log('We have ' + (counter || 0) + 'users whos last name is "Finn"');
        }
      }
    });