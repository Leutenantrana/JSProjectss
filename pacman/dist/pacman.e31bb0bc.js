// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"setup.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OBJECT_TYPE = exports.LEVEL = exports.GRID_SIZE = exports.DIRECTIONS = exports.CLASS_LIST = exports.CELL_SIZE = void 0;
var GRID_SIZE = exports.GRID_SIZE = 20;
var CELL_SIZE = exports.CELL_SIZE = 20;
var DIRECTIONS = exports.DIRECTIONS = {
  ArrowLeft: {
    code: 37,
    movement: -1,
    rotation: 180
  },
  ArrowUp: {
    code: 38,
    movement: -GRID_SIZE,
    rotation: 270
  },
  ArrowRight: {
    code: 39,
    movement: 1,
    rotation: 0
  },
  ArrowDown: {
    code: 40,
    movement: GRID_SIZE,
    rotation: 90
  }
};
var OBJECT_TYPE = exports.OBJECT_TYPE = {
  BLANK: 'blank',
  WALL: 'wall',
  DOT: 'dot',
  BLINKY: 'blinky',
  PINKY: 'pinky',
  INKY: 'inky',
  CLYDE: 'clyde',
  PILL: 'pill',
  PACMAN: 'pacman',
  GHOST: 'ghost',
  SCARED: 'scared',
  GHOSTLAIR: 'lair'
};

// Lookup array for classes
var CLASS_LIST = exports.CLASS_LIST = [OBJECT_TYPE.BLANK, OBJECT_TYPE.WALL, OBJECT_TYPE.DOT, OBJECT_TYPE.BLINKY, OBJECT_TYPE.PINKY, OBJECT_TYPE.INKY, OBJECT_TYPE.CLYDE, OBJECT_TYPE.PILL, OBJECT_TYPE.PACMAN, OBJECT_TYPE.GHOSTLAIR];

// prettier-ignore
var LEVEL = exports.LEVEL = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
},{}],"node_modules/@babel/runtime/helpers/classCallCheck.js":[function(require,module,exports) {
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/typeof.js":[function(require,module,exports) {
function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/toPrimitive.js":[function(require,module,exports) {
var _typeof = require("./typeof.js")["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./typeof.js":"node_modules/@babel/runtime/helpers/typeof.js"}],"node_modules/@babel/runtime/helpers/toPropertyKey.js":[function(require,module,exports) {
var _typeof = require("./typeof.js")["default"];
var toPrimitive = require("./toPrimitive.js");
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./typeof.js":"node_modules/@babel/runtime/helpers/typeof.js","./toPrimitive.js":"node_modules/@babel/runtime/helpers/toPrimitive.js"}],"node_modules/@babel/runtime/helpers/createClass.js":[function(require,module,exports) {
var toPropertyKey = require("./toPropertyKey.js");
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./toPropertyKey.js":"node_modules/@babel/runtime/helpers/toPropertyKey.js"}],"Pacman.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _setup = require("./setup");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var Pacman = /*#__PURE__*/function () {
  function Pacman(speed, startPos) {
    (0, _classCallCheck2.default)(this, Pacman);
    this.pos = startPos;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  }
  return (0, _createClass2.default)(Pacman, [{
    key: "shouldMove",
    value: function shouldMove() {
      if (!this.dir) return;
      if (this.timer === this.speed) {
        this.timer = 0;
        return true;
      }
      this.timer++;
    }
  }, {
    key: "getNextMove",
    value: function getNextMove(objectExist) {
      var nextMovePos = this.pos + this.dir.movement;
      if (objectExist(nextMovePos, _setup.OBJECT_TYPE.WALL) || objectExist(nextMovePos, _setup.OBJECT_TYPE.GHOSTLAIR)) {
        nextMovePos = this.pos;
      }
      return {
        nextMovePos: nextMovePos,
        direction: this.dir
      };
    }
  }, {
    key: "makeMove",
    value: function makeMove() {
      var classesToRemove = [_setup.OBJECT_TYPE.PACMAN];
      var classesToAdd = [_setup.OBJECT_TYPE.PACMAN];
      return {
        classesToRemove: classesToRemove,
        classesToAdd: classesToAdd
      };
    }
  }, {
    key: "setNewPos",
    value: function setNewPos(nextMovePos) {
      this.pos = nextMovePos;
    }
  }, {
    key: "handleKeyInput",
    value: function handleKeyInput(e, objectExist) {
      console.log(e);
      var dir;
      if (e.keyCode >= 37 && e.keyCode <= 40) {
        dir = _setup.DIRECTIONS[e.key];
      } else {
        return;
      }
      var nextMovePos = this.pos + dir.movement;
      if (objectExist(nextMovePos, _setup.OBJECT_TYPE.WALL) || objectExist(nextMovePos, _setup.OBJECT_TYPE.GHOSTLAIR)) return;
      this.dir = dir;
    }
  }]);
}();
var _default = exports.default = Pacman;
},{"@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","./setup":"setup.js"}],"node_modules/@babel/runtime/helpers/arrayLikeToArray.js":[function(require,module,exports) {
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray.js");
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return arrayLikeToArray(r);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":"node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"node_modules/@babel/runtime/helpers/iterableToArray.js":[function(require,module,exports) {
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":[function(require,module,exports) {
var arrayLikeToArray = require("./arrayLikeToArray.js");
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
  }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayLikeToArray.js":"node_modules/@babel/runtime/helpers/arrayLikeToArray.js"}],"node_modules/@babel/runtime/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{}],"node_modules/@babel/runtime/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles.js");
var iterableToArray = require("./iterableToArray.js");
var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");
var nonIterableSpread = require("./nonIterableSpread.js");
function _toConsumableArray(r) {
  return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
},{"./arrayWithoutHoles.js":"node_modules/@babel/runtime/helpers/arrayWithoutHoles.js","./iterableToArray.js":"node_modules/@babel/runtime/helpers/iterableToArray.js","./unsupportedIterableToArray.js":"node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js","./nonIterableSpread.js":"node_modules/@babel/runtime/helpers/nonIterableSpread.js"}],"GameBoard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _setup = require("./setup");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var GameBoard = /*#__PURE__*/function () {
  // DOMGrid is DOM element here
  function GameBoard(DOMGrid) {
    (0, _classCallCheck2.default)(this, GameBoard);
    this.DOMGrid = DOMGrid;
    this.grid = [];
    this.dotCount = 0;
  }
  return (0, _createClass2.default)(GameBoard, [{
    key: "showGameStatus",
    value: function showGameStatus(gameWin) {
      var div = document.createElement('div');
      div.classList.add('game-status');
      div.innerHTML = "".concat(gameWin ? 'Win!' : 'Game Over');
      this.DOMGrid.appendChild(div);
    }
  }, {
    key: "createGrid",
    value: function createGrid(level) {
      var _this = this;
      this.DOMGrid.innerHTML = '';
      this.grid = [];
      this.dotCount = 0;

      // this.DOMGrid.style.cssText = `grid-template-column: repeat(${GRID_SIZE},${CELL_SIZE}px)`
      this.DOMGrid.style.cssText = "grid-template-columns: repeat(".concat(_setup.GRID_SIZE, ",").concat(_setup.CELL_SIZE, "px);");
      level.forEach(function (square) {
        var div = document.createElement('div');
        div.classList.add('square', _setup.CLASS_LIST[square]);
        div.style.cssText = "width: ".concat(_setup.CELL_SIZE, "px; height:").concat(_setup.CELL_SIZE, "px;");
        _this.DOMGrid.appendChild(div);
        _this.grid.push(div);
        if (_setup.CLASS_LIST[square] === _setup.OBJECT_TYPE.DOT) _this.dotCount++;
      });
    }
  }, {
    key: "addObject",
    value: function addObject(pos, obj) {
      var _this$grid$pos$classL;
      (_this$grid$pos$classL = this.grid[pos].classList).add.apply(_this$grid$pos$classL, (0, _toConsumableArray2.default)(obj));
    }
  }, {
    key: "removeObject",
    value: function removeObject(pos, obj) {
      var _this$grid$pos$classL2;
      (_this$grid$pos$classL2 = this.grid[pos].classList).remove.apply(_this$grid$pos$classL2, (0, _toConsumableArray2.default)(obj));
    }
  }, {
    key: "objectExists",
    value: function objectExists(pos, obj) {
      return this.grid[pos].classList.contains(obj);
    }
  }, {
    key: "rotateDiv",
    value: function rotateDiv(pos, deg) {
      this.grid[pos].style.transform = "rotate(".concat(deg, "deg)");
    }
  }, {
    key: "moveCharacter",
    value: function moveCharacter(character) {
      if (character.shouldMove()) {
        var _character$getNextMov = character.getNextMove(this.objectExists.bind(this)),
          nextMovePos = _character$getNextMov.nextMovePos,
          direction = _character$getNextMov.direction;
        var _character$makeMove = character.makeMove(),
          classesToRemove = _character$makeMove.classesToRemove,
          classesToAdd = _character$makeMove.classesToAdd;
        if (character.rotation && nextMovePos !== character.pos) {
          // Rotate
          this.rotateDiv(nextMovePos, character.dir.rotation);
          // Rotate the previous div back
          this.rotateDiv(character.pos, 0);
        }
        this.removeObject(character.pos, classesToRemove);
        this.addObject(nextMovePos, classesToAdd);
        character.setNewPos(nextMovePos, direction);
      }
    }
  }], [{
    key: "createGameBoard",
    value: function createGameBoard(DOMGrid, level) {
      var board = new this(DOMGrid);
      board.createGrid(level);
      return board;
    }
  }]);
}();
var _default = exports.default = GameBoard;
},{"@babel/runtime/helpers/toConsumableArray":"node_modules/@babel/runtime/helpers/toConsumableArray.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","./setup":"setup.js"}],"ghostmoves.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomMovement = randomMovement;
var _setup = require("./setup");
function randomMovement(position, direction, objectExist) {
  var dir = direction;
  var nextMovePos = position + dir.movement;
  var keys = Object.keys(_setup.DIRECTIONS);
  while (objectExist(nextMovePos, _setup.OBJECT_TYPE.WALL) || objectExist(nextMovePos, _setup.OBJECT_TYPE.GHOST)) {
    var key = keys[Math.floor(Math.random() * keys.length)];
    dir = _setup.DIRECTIONS[key];
    nextMovePos = position + dir.movement;
  }
  return {
    nextMovePos: nextMovePos,
    direction: dir
  };
}
},{"./setup":"setup.js"}],"Ghost.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _setup = require("./setup");
var _ghostmoves = require("./ghostmoves");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var Ghost = /*#__PURE__*/function () {
  function Ghost() {
    var speed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
    var startPos = arguments.length > 1 ? arguments[1] : undefined;
    var movement = arguments.length > 2 ? arguments[2] : undefined;
    var name = arguments.length > 3 ? arguments[3] : undefined;
    (0, _classCallCheck2.default)(this, Ghost);
    this.name = name;
    this.movement = movement;
    this.startPos = startPos;
    this.pos = startPos;
    this.dir = _setup.DIRECTIONS.ArrowRight;
    this.speed = speed;
    this.timer = 0;
    this.isScared = false;
    this.rotation = false;
  }
  return (0, _createClass2.default)(Ghost, [{
    key: "shouldMove",
    value: function shouldMove() {
      if (this.timer === this.speed) {
        this.timer = 0;
        return true;
      }
      this.timer++;
      return false;
    }
  }, {
    key: "getNextMove",
    value: function getNextMove(objectExist) {
      var _this$movement = this.movement(this.pos, this.dir, objectExist),
        nextMovePos = _this$movement.nextMovePos,
        direction = _this$movement.direction;
      return {
        nextMovePos: nextMovePos,
        direction: direction
      };
    }
  }, {
    key: "makeMove",
    value: function makeMove() {
      var classesToRemove = [_setup.OBJECT_TYPE.GHOST, _setup.OBJECT_TYPE.SCARED, this.name];
      var classesToAdd = [_setup.OBJECT_TYPE.GHOST, this.name];
      if (this.isScared) classesToAdd = [].concat((0, _toConsumableArray2.default)(classesToAdd), [_setup.OBJECT_TYPE.SCARED]);
      return {
        classesToRemove: classesToRemove,
        classesToAdd: classesToAdd
      };
    }
  }, {
    key: "setNewPos",
    value: function setNewPos(nextMovePos, direction) {
      this.pos = nextMovePos;
      this.dir = direction;
    }
  }]);
}();
var _default = exports.default = Ghost;
},{"@babel/runtime/helpers/toConsumableArray":"node_modules/@babel/runtime/helpers/toConsumableArray.js","@babel/runtime/helpers/classCallCheck":"node_modules/@babel/runtime/helpers/classCallCheck.js","@babel/runtime/helpers/createClass":"node_modules/@babel/runtime/helpers/createClass.js","./setup":"setup.js","./ghostmoves":"ghostmoves.js"}],"sounds/munch.wav":[function(require,module,exports) {
module.exports = "/munch.50161df6.wav";
},{}],"sounds/pill.wav":[function(require,module,exports) {
module.exports = "/pill.d5173a33.wav";
},{}],"sounds/game_start.wav":[function(require,module,exports) {
module.exports = "/game_start.09b402f7.wav";
},{}],"sounds/death.wav":[function(require,module,exports) {
module.exports = "/death.1b6386ba.wav";
},{}],"sounds/eat_ghost.wav":[function(require,module,exports) {
module.exports = "/eat_ghost.09613325.wav";
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _setup = require("./setup.js");
var _Pacman = _interopRequireDefault(require("./Pacman.js"));
var _GameBoard = _interopRequireDefault(require("./GameBoard"));
var _Ghost = _interopRequireDefault(require("./Ghost.js"));
var _ghostmoves = require("./ghostmoves.js");
var _munch = _interopRequireDefault(require("./sounds/munch.wav"));
var _pill = _interopRequireDefault(require("./sounds/pill.wav"));
var _game_start = _interopRequireDefault(require("./sounds/game_start.wav"));
var _death = _interopRequireDefault(require("./sounds/death.wav"));
var _eat_ghost = _interopRequireDefault(require("./sounds/eat_ghost.wav"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var gameGrid = document.querySelector('#game');
var scoreTable = document.querySelector('#score');
var startButton = document.querySelector('#start-button');

// game constants

var POWER_PILL_TIME = 10000;
var GLOBAL_SPEED = 80;
var gameBoard = _GameBoard.default.createGameBoard(gameGrid, _setup.LEVEL);

// initial setup

var score = 0;
var timer = null;
var gameWin = false;
var powerPillActive = false;
var powerPillTimer = null;
function playAudio(audio) {
  var soundEffect = new Audio(audio);
  soundEffect.play();
}
function gameOver(pacman, grid) {
  playAudio(_death.default);
  document.removeEventListener('keydown', function (e) {
    return pacman.handleKeyInput(e, gameBoard.objectExists.bind(gameBoard));
  });
  gameBoard.showGameStatus(gameWin);
  clearInterval(timer);
  // Show startbutton
  startButton.classList.remove('hide');
}
function checkCollision(pacman, ghosts) {
  var collidedGhost = ghosts.find(function (ghost) {
    return pacman.pos === ghost.pos;
  });
  if (collidedGhost) {
    if (pacman.powerPill) {
      playAudio(_eat_ghost.default);
      gameBoard.removeObject(collidedGhost.pos, [_setup.OBJECT_TYPE.GHOST, _setup.OBJECT_TYPE.SCARED, _setup.OBJECT_TYPE.name]);
      collidedGhost.pos = collidedGhost.startPos;
      score += 100;
    } else {
      gameBoard.removeObject(pacman.pos, [_setup.OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      gameOver(pacman, gameGrid);
    }
  }
}
function gameLoop(pacman, ghosts) {
  gameBoard.moveCharacter(pacman);
  checkCollision(pacman, ghosts);
  ghosts.forEach(function (ghost) {
    return gameBoard.moveCharacter(ghost);
  });
  checkCollision(pacman, ghosts);
  if (gameBoard.objectExists(pacman.pos, _setup.OBJECT_TYPE.DOT)) {
    playAudio(_munch.default);
    gameBoard.removeObject(pacman.pos, [_setup.OBJECT_TYPE.DOT]);
    gameBoard.dotCount--;
    score += 10;
  }
  if (gameBoard.objectExists(pacman.pos, _setup.OBJECT_TYPE.PILL)) {
    playAudio(_pill.default);
    gameBoard.removeObject(pacman.pos, [_setup.OBJECT_TYPE.PILL]);
    pacman.powerPill = true;
    score += 50;
    clearTimeout(powerPillActive);
    setTimeout(function () {
      return pacman.powerPill = false;
    }, POWER_PILL_TIME);
  }
  if (pacman.powerPill !== powerPillActive) {
    powerPillActive = pacman.powerPill;
    ghosts.forEach(function (ghost) {
      return ghost.isScared = pacman.powerPill;
    });
  }
  if (gameBoard.dotCount === 0) {
    gameOver(pacman, gameGrid);
  }
  scoreTable.innerHTML = score;
}
function startGame() {
  playAudio(_game_start.default);
  gameWin = false;
  powerPillActive = false;
  score = 0;
  startButton.classList.add('hide');
  gameBoard.createGrid(_setup.LEVEL);
  var pacman = new _Pacman.default(2, 287);
  gameBoard.addObject(287, [_setup.OBJECT_TYPE.PACMAN]);
  document.addEventListener('keydown', function (e) {
    pacman.handleKeyInput(e, gameBoard.objectExists.bind(gameBoard));
  });
  var ghosts = [new _Ghost.default(5, 188, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.BLINKY), new _Ghost.default(4, 209, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.PINKY), new _Ghost.default(3, 230, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.INKY), new _Ghost.default(2, 251, _ghostmoves.randomMovement, _setup.OBJECT_TYPE.CLYDE)];
  timer = setInterval(function () {
    return gameLoop(pacman, ghosts);
  }, GLOBAL_SPEED);
}
startButton.addEventListener('click', startGame);
},{"./setup.js":"setup.js","./Pacman.js":"Pacman.js","./GameBoard":"GameBoard.js","./Ghost.js":"Ghost.js","./ghostmoves.js":"ghostmoves.js","./sounds/munch.wav":"sounds/munch.wav","./sounds/pill.wav":"sounds/pill.wav","./sounds/game_start.wav":"sounds/game_start.wav","./sounds/death.wav":"sounds/death.wav","./sounds/eat_ghost.wav":"sounds/eat_ghost.wav"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59866" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/pacman.e31bb0bc.js.map