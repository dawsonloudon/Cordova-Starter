var views = {};

views.default = function(template) {

    this.initialize = function() {
        cache.currentView = 'default';
        this.el = $('<div/>');
        this.el.attr('id','default');
    }

    this.render = function() {
        var parts = {
            title: 'Default View'
        };
        this.el.html(template(parts));
        return this;
    }

    this.initialize();

}

views.noConnection = function(template) {

    this.initialize = function() {
        cache.currentView = 'no-connection';
        this.el = $('<div/>');
        this.el.attr('id','no-connection');
    }

    this.render = function() {
        var parts = {
            title: 'No Connection Detected'
        };
        this.el.html(template(parts));
        return this;
    }

    this.initialize();

}