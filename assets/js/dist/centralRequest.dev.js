"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var separators = {
  HTML: "<br/>",
  STRING: "\n"
};
var endpoints = {
  LOGIN: "user/login",
  COMPANY: "company",
  HOUSE: "house",
  HOUSES: "houses",
  FLOOR: "floor",
  FLOORS: "floors",
  OPTION: "option",
  OPTIONS: "options",
  USER: "user",
  USERS: "users"
};

var ApiError =
/*#__PURE__*/
function () {
  function ApiError() {
    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var isShow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    _classCallCheck(this, ApiError);

    this.errors = errors;
    this.isShow = isShow;
    this.path = path;
  }

  _createClass(ApiError, null, [{
    key: "getErrors",
    value: function getErrors(error) {
      var separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : separators.STRING;
      return error.errors.join(separator);
    }
  }]);

  return ApiError;
}();

var ApiResponse =
/*#__PURE__*/
function () {
  function ApiResponse() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var statusCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    var isSuccessful = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
    var error = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : new ApiError();

    _classCallCheck(this, ApiResponse);

    this.data = data;
    this.statusCode = statusCode;
    this.isSuccessful = isSuccessful;
    this.method = method;
    this.error = error;
  }

  _createClass(ApiResponse, null, [{
    key: "success",
    value: function success() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
      var method = arguments.length > 2 ? arguments[2] : undefined;
      return new ApiResponse(data, code, true, method, null);
    }
  }, {
    key: "fail",
    value: function fail(code, method, isShow, path, errors) {
      return new ApiResponse(null, code, false, method, new ApiError(errors, isShow, path));
    }
  }]);

  return ApiResponse;
}();

var FetchApi =
/*#__PURE__*/
function () {
  function FetchApi(config) {
    _classCallCheck(this, FetchApi);

    this.config = config;
  }

  _createClass(FetchApi, [{
    key: "fetchPipeLineAsync",
    value: function fetchPipeLineAsync(req) {
      return regeneratorRuntime.async(function fetchPipeLineAsync$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(fetch(req).then(function _callee(response) {
                var text, isHTML, json;
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!response.ok) {
                          _context.next = 11;
                          break;
                        }

                        _context.next = 3;
                        return regeneratorRuntime.awrap(response.text());

                      case 3:
                        text = _context.sent;
                        isHTML = text.includes("html");

                        if (!isHTML) {
                          _context.next = 7;
                          break;
                        }

                        return _context.abrupt("return", ApiResponse.fail(400, req.method, false, req.url, ["Bad Request"]));

                      case 7:
                        json = JSON.parse(text);

                        if (!json.msg) {
                          _context.next = 10;
                          break;
                        }

                        return _context.abrupt("return", ApiResponse.fail(400, req.method, false, req.url, [json.msg]));

                      case 10:
                        return _context.abrupt("return", ApiResponse.success(json, response.status, req.method));

                      case 11:
                        throw new Error('Something went wrong on api server!');

                      case 12:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              })["catch"](function (error) {
                return ApiResponse.fail(500, req.method, false, req.url, [error]);
              }));

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }, {
    key: "requestByUrlAsync",
    value: function requestByUrlAsync(url) {
      return regeneratorRuntime.async(function requestByUrlAsync$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = "".concat(this.config.baseUrl, "/").concat(url);
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.fetchPipeLineAsync(new Request(url)));

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "requestByConfigAsync",
    value: function requestByConfigAsync(url, request) {
      return regeneratorRuntime.async(function requestByConfigAsync$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              url = "".concat(this.config.baseUrl, "/").concat(url);
              _context4.next = 3;
              return regeneratorRuntime.awrap(this.fetchPipeLineAsync(new Request(url, request)));

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "requestByBodyAsync",
    value: function requestByBodyAsync(url, method, body) {
      return regeneratorRuntime.async(function requestByBodyAsync$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              url = "".concat(this.config.baseUrl, "/").concat(url);
              _context5.next = 3;
              return regeneratorRuntime.awrap(this.fetchPipeLineAsync(new Request(url, {
                method: method,
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              })));

            case 3:
              return _context5.abrupt("return", _context5.sent);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }]);

  return FetchApi;
}();

var GenericHttpService =
/*#__PURE__*/
function () {
  function GenericHttpService(table, fetchApi) {
    _classCallCheck(this, GenericHttpService);

    this.table = table;
    this.fetchApi = fetchApi;
  }

  _createClass(GenericHttpService, [{
    key: "GetAllAsync",
    value: function GetAllAsync() {
      return regeneratorRuntime.async(function GetAllAsync$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.fetchApi.requestByUrlAsync(this.table));

            case 2:
              return _context6.abrupt("return", _context6.sent);

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "GetAllSubAsync",
    value: function GetAllSubAsync(id, subTable) {
      return regeneratorRuntime.async(function GetAllSubAsync$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.fetchApi.requestByUrlAsync("".concat(this.table, "/").concat(id, "/").concat(subTable)));

            case 2:
              return _context7.abrupt("return", _context7.sent);

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "GetAsync",
    value: function GetAsync(id) {
      return regeneratorRuntime.async(function GetAsync$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(this.fetchApi.requestByUrlAsync("".concat(this.table, "/").concat(id)));

            case 2:
              return _context8.abrupt("return", _context8.sent);

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "DeleteAsync",
    value: function DeleteAsync(id) {
      return regeneratorRuntime.async(function DeleteAsync$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return regeneratorRuntime.awrap(this.fetchApi.requestByConfigAsync("".concat(this.table, "/").concat(id), {
                method: "DELETE"
              }));

            case 2:
              return _context9.abrupt("return", _context9.sent);

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "PutAsync",
    value: function PutAsync(id, data) {
      return regeneratorRuntime.async(function PutAsync$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", this.fetchApi.requestByBodyAsync("".concat(this.table, "/").concat(id), "PUT", data));

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "PatchAsync",
    value: function PatchAsync(id, data) {
      return regeneratorRuntime.async(function PatchAsync$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", this.fetchApi.requestByBodyAsync("".concat(this.table, "/").concat(id), "PATCH", data));

            case 1:
            case "end":
              return _context11.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "PostAsync",
    value: function PostAsync(data) {
      return regeneratorRuntime.async(function PostAsync$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", this.fetchApi.requestByBodyAsync(this.table, "POST", data));

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, null, this);
    }
  }]);

  return GenericHttpService;
}();