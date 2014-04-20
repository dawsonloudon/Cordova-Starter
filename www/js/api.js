var api = {
    connection: {
        baseUrl: '',
        apiUrl: ''
    },
    initialize: function() {
        api.setupAjaxDefaults();
    },
    setupAjaxDefaults: function() {
        var headers = {
            'Accept': "application/json; encoding='utf-8'",
            'Content-Type': "application/json; encoding='utf-8'"
        };
        $.ajaxSetup({
            headers: headers,
            dataType: 'json',
            crossDomain: true
        });
    },
    ajaxGet: function(methodName, data, successCallback, errorCallback) {
        $.ajax({
            url: api.connection.baseUrl + api.connection.apiUrl + methodName,
            data: data,
            cache: false,
            type: 'GET',
            success: function(result, status, xhr) {
                if ($.isFunction(successCallback)) {
                    successCallback(result);
                }
            },
            error: function() {
                if ($.isFunction(errorCallback)) {
                    errorCallback();
                }
            }

        });
    },
    ajaxGetCached: function(methodName, data, successCallback, errorCallback) {
        $.ajax({
            url: api.connection.baseUrl + api.connection.apiUrl + methodName,
            data: data,
            type: 'GET',
            success: function(result, status, xhr) {
                if ($.isFunction(successCallback)) {
                    successCallback(result);
                }
            },
            error: function() {
                if ($.isFunction(errorCallback)) {
                    errorCallback();
                }
            }

        });
    }
};