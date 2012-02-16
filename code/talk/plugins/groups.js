var Groups = function (talk) {
    var _model = talk.models.context;
    this._talk = talk;
    this._models = talk.models;

    this._find = (function (query, callback) {
        this._query = query;
        _model.find(query, function (err, groups) {
            this.objects = groups;
            callback.call(this);
        });
    }).bind(this);

    this._find.create = (function (options, callback) {
        var _options = {
            kind: 'group'
        };
        _model.create(_options, function (err, group) {
            this.objects = [group];
            callback.call(this);
        });
    }).bind(this);

    return this._find;
};

Groups.prototype = {
    constructor : Groups,
    
    join        : function (user, callback) {
        if ( this.objects ) {
            if ( user instanceof this._models.user ) {
                this.objects.forEach(function (group) {
                    group.users.push(user);
                    group.save();
                });
            } else {
                throw new Error('User argument is not a User, got: ' + user);
            }
        } else {
            throw new Error('No objects found.');
        }
    },
    leave       : function (user, callback) {
        if ( this.objects ) {
            if ( user instanceof this._models.user ) {
                this.objects.forEach(function (group) {
                    var idx = group.users.indexOf(user);
                    if ( ~ idx ) {
                        group.users.splice(idx, 1);
                        group.save();
                    }
                });
            } else {
                throw new Error('User argument is not a User, got: ' + user);
            }
        } else {
            throw new Error('No objects found.');
        }
    },
    discuss     : function (post, thread, callback) {
        if ( this.objects ) {
            if ( post instanceof this._models.post ) {
                if ( thread ) {
                    // add to existing thread
                    this.objects.forEach(function (group) {
                        var idx = group.users.indexOf(user);
                        if ( ~ idx ) {
                            group.users.splice(idx, 1);
                            group.save();
                        }
                    });
                } else {
                    // create new thread
                }
            } else {
                throw new Error('Post argument is not a Post, got: ' + post);
            }
        } else {
            throw new Error('No objects found.');
        }
    },
    respond     : function (comment, post, callback) {}
};

module.exports = Groups;