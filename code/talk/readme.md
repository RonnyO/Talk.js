# Talk.js - API
Talk exposes an API that can be used to access various components of the framework either directly from the console or inside your Node application.

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
    
### Models CRUD methods

For the sake of convenience, Talk wraps Mongoose's CRUD methods, so you don't have to worry about instantiating Model objects.
Since we think Mongoose is great, we didn't change any of the method signatures, but simply wrapped them nicely for you.

To that end, if you're familiar with [Mongoose's query](http://mongoosejs.com/docs/finding-documents.html "Mongoose's query") API, you should be right at home with Talk models.

Talk models provide the following convenience methods to work with Mongoose:

1. **create** - Creates a new record in a given model
2. **update** - Updates one or more records in a given model by criteria
3. **find** - Finds one or more records in a given model by criteria
4. **remove** - Removes one or more records in a given model by criterial
5. **object** - Returns the raw Mongoose model object which can be used to run more advanced commands supported by Mongoose