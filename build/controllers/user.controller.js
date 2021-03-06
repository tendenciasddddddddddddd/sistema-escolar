"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = exports.getUsers = exports.createUser = exports.getRoles = exports.deleteUsuariosById = exports.updateUsuariosById = exports.getUsuariosById = exports.getUsuarios = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var mongoose = require('mongoose'); //--------------------------------PAGINACION DE TABLA DEFAULT 7 EN 7--------------------


var getUsuarios = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    var limit = parseInt(req.query.take); // Asegúrate de parsear el límite a número

    var skip = parseInt(req.query.page);
    var total = yield _User.default.countDocuments({
      typo: {
        $in: ["ADMS"]
      }
    });
    var paginas = Math.ceil(total / limit);
    var usuarios = yield _User.default.find({
      typo: {
        $in: ["ADMS"]
      }
    }).skip(limit * skip - limit).limit(limit);
    var coleccion = {
      usuarios: usuarios,
      pagina: skip,
      paginas: paginas,
      total: total
    };
    return res.json(coleccion);
  });

  return function getUsuarios(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //--------------------------------OPTENEMOS UN USUARIO POR ID--------------------


exports.getUsuarios = getUsuarios;

var getUsuariosById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    var UsuariosId = mongoose.Types.ObjectId(req.params.id);
    var usuarios = yield _User.default.findById(UsuariosId);
    res.status(200).json(usuarios);
  });

  return function getUsuariosById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //--------------------------------EDITAR USUARIO POR EL ID--------------------


exports.getUsuariosById = getUsuariosById;

var updateUsuariosById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      req.body.roles = req.body.role;
      var updatedUsuarios = yield _User.default.findByIdAndUpdate(req.params.usuariosId, req.body, {
        new: true
      });
      res.status(200).json(updatedUsuarios);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return function updateUsuariosById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //--------------------------------ELIMINAR USUARIOS POR EL ID--------------------


exports.updateUsuariosById = updateUsuariosById;

var deleteUsuariosById = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    var UsuariosId = mongoose.Types.ObjectId(req.params.id);
    yield _User.default.findByIdAndDelete(UsuariosId);
    res.status(200).json();
  });

  return function deleteUsuariosById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); //--------------------------------RETORNAR LA LISTA DE ROLES--------------------


exports.deleteUsuariosById = deleteUsuariosById;

var getRoles = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    var roless = yield _Role.default.find({
      name: {
        $in: ["Admin", "Inpector", "Vicerrector", "Secretario"]
      }
    });
    return res.json(roless);
  });

  return function getRoles(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); //--------------------------------CREAR UN NUEVO USUARIOS --------------------


exports.getRoles = getRoles;

var createUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        username,
        email,
        password,
        roles
      } = req.body;
      var rolesFound = yield _Role.default.find({
        name: {
          $in: roles
        }
      }); // creating a new User

      var user = new _User.default({
        username,
        email,
        password,
        roles: rolesFound.map(role => role._id)
      }); // encrypting password

      user.password = yield _User.default.encryptPassword(user.password); //llama funcion encriptar en models/user
      // saving the new user

      var savedUser = yield user.save();
      return res.status(200).json({
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles
      });
    } catch (error) {
      console.error(error);
    }
  });

  return function createUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var getUsers = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {});

  return function getUsers(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;

var getUser = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {});

  return function getUser(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getUser = getUser;