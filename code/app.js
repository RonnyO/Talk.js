var Talk = require('./talk');

Talk.init();

/*
Talk.models.user.create({
	'first_name':'Zoharush',
	'last_name':'The Arad',
	'email':'zohar@zohar.com'
}, function(err){
	console.log(err);
});

Talk.models.user.update({'first_name':'Zohar'},{'email':'zohar@zohararad.com'},function(){
	console.log('update',arguments);
});

var results = Talk.models.user.find({}, null, {limit:1}, function(){
	console.log(arguments);
});

Talk.models.user.remove({'first_name':'Zohar'},function(){
	console.log(arguments);
});

var q = Talk.models.user.object().find({}).where('first_name','Zoharush').limit(1);

q.exec(function(err,doc){
	console.log(err,doc);
});
*/