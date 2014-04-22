//add static global properties to this object
var global = {
    connectionStatus: false,
    lostConnection: false,
    version: '1.0.0'
};

//add any cache-able properties to this object
var cache = {
    timer: null,
    connection: false,
    currentView: '',
    lastView: []
};

//Contains global app methods and properties
var app = {
    tpl: {},
    slider: new PageSlider($('#container')),
    devicePause: function() {

    },
    deviceResume: function() {

    },
    initialConnection: function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = false;
        states[Connection.ETHERNET] = true;
        states[Connection.WIFI]     = true;
        states[Connection.CELL_2G]  = true;
        states[Connection.CELL_3G]  = true;
        states[Connection.CELL_4G]  = true;
        states[Connection.CELL]     = true;
        states[Connection.NONE]     = false;
        global.connectionStatus = states[networkState];
        app.connectionStatus(global.connectionStatus);
        if(global.connectionStatus) {
            app.slider.slidePageFrom(new views.default(app.tpl.default),'right');
            app.hideSplashScreen();
        }
        else{
            app.slider.slidePageFrom(new views.noConnection(app.tpl.noConnection),'right');
            app.hideSplashScreen();
        }
    },
    checkConnection: function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = false;
        states[Connection.ETHERNET] = true;
        states[Connection.WIFI]     = true;
        states[Connection.CELL_2G]  = true;
        states[Connection.CELL_3G]  = true;
        states[Connection.CELL_4G]  = true;
        states[Connection.CELL]     = true;
        states[Connection.NONE]     = false;
        global.connectionStatus = states[networkState];
        app.connectionStatus(global.connectionStatus);
    },
    online: function() {
        //This happens if your app is already launched and gains network connection
        global.lostConnection = false;
        app.checkConnection();
    },
    offline: function() {
        //This happens if your app is already launched and loses network connection
        global.lostConnection = true;
    },
    hideSplashScreen: function() {
        setTimeout(function() {
            navigator.splashscreen.hide();
        },1500);
    },
    connectionStatus: function(connected) {
        if(connected) {
            cache.connection = 'on';
        }
        else{
            cache.connection = 'off';
        }
    },
    backClick: function() {
        var btn = $('.backbtn');
        if(btn.length > 0) {
            btn.trigger('click');
        }
        return false;
    }
};

//primary use case: call an app.router method after collecting results from a database query. use the router to choose display based on number of results returned
app.router = {
/*
    //EXAMPLE router method receiving results from DB query
    searchUsers: function(tx, results) {
        var len = results.rows.length;
        if(len > 1) {
            for(var i=0; i< len; i++) {
                cache.Users[i] = results.rows.item(i);
            }
            app.slider.slidePageFrom(new views.usersList(app.tpl.usersList), 'right');
        }
        else if(len == 1) {
            cache.User = results.row.item(0);
            app.slider.slidePageFrom(new views.singleUser(app.tpl.singleUser), 'right');
        }
        else {
            alert('No Results');
        }
    }
*/
};

/* APPLICATION LOCAL STORAGE */
app.store = {
    initialize: function() {
        global.store = window.localStorage;
    },
    set: function(key,value) {
        global.store.setItem(key,value);
    },
    get: function(key) {
        return global.store.getItem(key);
    },
    remove: function(key) {
        global.store.removeItem(key);
    },
    reset: function() {
        global.store.clear();
    }
};

app.db = {
    initialize: function() {
        global.db = window.openDatabase('appdb','1.0','AppDB',5000000);
        global.db.transaction(app.db.createDB,app.db.errorCB,app.db.successCB);
    },
    createDB: function(tx) {

    },
    errorCB: function(tx, err) {
        //console.log(err);
    },
    successCB: function(msg) {
        if(msg) {
            //alert(msg);
        }
    }
};

//Global methods that get reused but do not directly relate to the core app object. EXAMPLE: format date strings to a normalized format
app.helpers = {

};

(function() {

    //all templates need to be registered here
    app.tpl = {
        default: Handlebars.compile($('#default-tpl').html()),
        noConnection: Handlebars.compile($('#no-connection-tpl').html())
    };

    document.addEventListener('deviceready', deviceReady, false);
    document.addEventListener('online',app.online, false);
    document.addEventListener('offline',app.offline, false);
    document.addEventListener('backbutton', app.backClick, false);
    document.addEventListener('pause', app.devicePause, false);
    document.addEventListener('resume', app.deviceResume, false);

    function deviceReady() {
        //Fix click delays
        FastClick.attach(document.body);
        //Shortcut for navigator.notification.alert
        if (navigator.notification) {
            window.alert = function (message,func,title,buttonTxt) {
                if(!func){
                    func = null;
                }
                navigator.notification.alert(message, func, title, buttonTxt);
            };
        }
        //Init various app controls
        app.store.initialize();
        app.db.initialize();
        api.initialize();
        app.initialConnection();
    }

}());