// Framework
window.talk = window.talk || {};
talk.extend = func;
talk._ = {};

// or maybe
talk = {
    extend: func;
    _: {};
};

// Core js
talk.extend({
    'core': func,
    'post': func,
    'comment': func,
    'search': func,
    'fav': func,
    'follow': func
});
    
//myTheme
talk.extend({
    'myTheme': {}
})
    .listen({
    'post': talk.myTheme
});

// Reporter.js
talk.extend({
    'reporter': func(){}
});

// GoogleAnalytics (extension)
talk.reporter.extend({
    'ga': {},
    'omniture': {}
});

// to make this work
talk._.extend: function(name, func){
   this[name] = new TalkFunc(func);
}

function TalkFunc(func){
    func.extend = extend;
    func._ = _;
    return func;
}

// some extension - demonstrates AOP
talk.shout.extend({
    'around': {
        'captcha': function(){
            return !window.prompt('two times !!false?');
        }
    },
    'after': {
        'plsTweet': function(){
            $('.plsTweet', postForm).slideDown();
        }
});