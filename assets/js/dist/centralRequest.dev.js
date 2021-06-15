"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var fetchApi =
/*#__PURE__*/
function () {
  function fetchApi(config) {
    _classCallCheck(this, fetchApi);

    this.config = config;
  }

  _createClass(fetchApi, [{
    key: "requestByUrl",
    value: function requestByUrl(url) {
      var result;
      return regeneratorRuntime.async(function requestByUrl$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              url = "".concat(this.config.baseUrl, "/").concat(url);
              _context.next = 3;
              return regeneratorRuntime.awrap(fetch(url).then(function (response) {
                if (response.ok) return response.json();
                throw new Error('Something went wrong on api server!');
              })["catch"](function (error) {
                console.error(error);
              }));

            case 3:
              result = _context.sent;
              return _context.abrupt("return", result);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "requestByConfig",
    value: function requestByConfig(url, request) {
      var req, result;
      return regeneratorRuntime.async(function requestByConfig$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = "".concat(this.config.baseUrl, "/").concat(url);
              req = new Request(url, request);
              _context2.next = 4;
              return regeneratorRuntime.awrap(fetch(req).then(function (response) {
                if (response.ok) return response.json();
                throw new Error('Something went wrong on api server!');
              })["catch"](function (error) {
                console.error(error);
              }));

            case 4:
              result = _context2.sent;
              return _context2.abrupt("return", result);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "requestByBody",
    value: function requestByBody(url, method, body) {
      var request, result;
      return regeneratorRuntime.async(function requestByBody$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = "".concat(this.config.baseUrl, "/").concat(url);
              request = new Request(url, {
                method: method,
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              });
              _context3.next = 4;
              return regeneratorRuntime.awrap(fetch(request).then(function (response) {
                if (response.ok) return response.json();
                throw new Error('Something went wrong on api server!');
              })["catch"](function (err) {
                console.error(err);
              }));

            case 4:
              result = _context3.sent;
              return _context3.abrupt("return", result);

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);

  return fetchApi;
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
    key: "GetAll",
    value: function GetAll() {
      return regeneratorRuntime.async(function GetAll$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.fetchApi.requestByUrl(this.table));

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "GetAllSub",
    value: function GetAllSub(id, subTable) {
      return regeneratorRuntime.async(function GetAllSub$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.fetchApi.requestByUrl("".concat(this.table, "/").concat(id, "/").concat(subTable)));

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "Get",
    value: function Get(id) {
      return regeneratorRuntime.async(function Get$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.fetchApi.requestByUrl("".concat(this.table, "/").concat(id)));

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
    key: "Delete",
    value: function Delete(id) {
      return regeneratorRuntime.async(function Delete$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(this.fetchApi.requestByConfig("".concat(this.table, "/").concat(id), {
                method: "DELETE"
              }));

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
    key: "Put",
    value: function Put(id, data) {
      return regeneratorRuntime.async(function Put$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", this.fetchApi.requestByBody("".concat(this.table, "/").concat(id), "PUT", data));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "Patch",
    value: function Patch(id, data) {
      return regeneratorRuntime.async(function Patch$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", this.fetchApi.requestByBody("".concat(this.table, "/").concat(id), "PATCH", data));

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "Post",
    value: function Post(data) {
      return regeneratorRuntime.async(function Post$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", this.fetchApi.requestByBody(this.table, "POST", data));

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, null, this);
    }
  }]);

  return GenericHttpService;
}();