exports.init = function (app, config) {
    var www = app.get('www');
    return {
        "engine": {},

        "middleware": {

            "weg-swig": {
                "enabled": false,
                "module": {
                    "name": "weg-swig",
                    "method": "init",
                    "arguments": []
                }
            },

            "weg-resource": {
                "enabled": true,
                "module": {
                    "name": "weg-resource",
                    "arguments": [{"www": www, "client": "client"}]
                }
            },

            "weg-bigpipe": {
                "enabled": true,
                "module": {
                    "name": "weg-bigpipe",
                    "arguments": []
                }
            },

            "favicon": {
                "enabled": true,
                "module": {
                    "name": "static-favicon",
                    "arguments": ["/public/static/images/favicon.ico"]
                }
            },

            "logger": {
                "enabled": true,
                "module": {
                    "name": "morgan",
                    "arguments": [
                        "combined",
                        {
                            "immediate": true
                        }
                    ]
                }
            },

            "log4js": {
                "enabled": true,
                "module": {
                    "name": "log4js",
                    "path": "/server/utils/log4js.js",
                    "method": "configure",
                    "arguments": [www]
                }
            },

            "json": {
                "enabled": true,
                "module": {
                    "name": "body-parser",
                    "method": "json"
                }
            },

            "urlencoded": {
                "enabled": true,
                "module": {
                    "name": "body-parser",
                    "method": "urlencoded",
                    "arguments": [{"extended": true}]
                }
            },

            "cookieParser": {
                "enabled": true,
                "module": {
                    "name": "cookie-parser",
                    "arguments": ["weg"]
                }
            },

            "session": {
                "enabled": true,
                "module": {
                    "name": "express-session",
                    "arguments": [
                        {
                            "resave": true,
                            "saveUninitialized": true,
                            "secret": "123456",
                            "cookie": {
                                "maxAge": 60000
                            }
                        }
                    ]
                }
            }
        }
    }
}
