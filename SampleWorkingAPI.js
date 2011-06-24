talk = (function(){

	var extendOne = function(name, func){
		this[name] = func;
	};
	
	var extend = function(objOrFuncName, func){
		if (typeof objOrFuncName === 'object') {
			// Iterate over keys, apply extendOne for each of them. Same as MooTools.
		} else {
			extendOne.apply(this, arguments);
		}
	};
	
	Function.prototype.extend = extend; // Works great but I'd rather do this only to objects inside talk.
	
	return {
		_: {},
		extend: extend
	}
	
})();




/*
talk.extend({
    'core': function(){
        console.info('hi from core');
    },
    'post': function(){
        console.info('hi from post');
    }
});
*/