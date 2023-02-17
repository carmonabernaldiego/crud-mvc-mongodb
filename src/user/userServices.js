var userModel = require('./userModel');
var key = 'somekey2134982892889289288289';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         } else {
            if (result != undefined && result != null) {
               reject({ status: false, msg: "El email ya esta asignado a un usuario" });
            } else {
               var userModelData = new userModel();

               userModelData.firstName = userDetails.firstName;
               userModelData.lastName = userDetails.lastName;
               userModelData.email = userDetails.email;
               userModelData.password = encryptor.encrypt(userDetails.password);;

               userModelData.save(function resultHandle(error, result) {
                  if (error) {
                     reject({ status: false, msg: "Datos Invalidos" });
                  } else {
                     reject({ status: true, msg: "Usuario creado correctamente" });
                  }
               });
            }
         }
      });
   });
}

module.exports.loginUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         }
         else {
            if (result != undefined && result != null) {
               var decrypted = encryptor.decrypt(result.password);

               if (decrypted == userDetails.password) {
                  reject({ status: true, msg: "Usuario validado" });
               }
               else {
                  reject({ status: false, msg: "Falla en validacion de usuario" });
               }
            }
            else {
               reject({ status: false, msg: "Detalles de usuario invalido" });
            }
         }
      });
   });
}

module.exports.updateUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         }
         else {
            if (result != undefined && result != null) {
               console.log(result);
               if (result.email == userDetails.email) {

                  userModel.updateOne({ email: userDetails.email }, userDetails, function (err) {
                     if (err) return handleError(err);
                  });

                  reject({ status: true, msg: "El usuario ha sido modificado" });
               }
               else {
                  reject({ status: false, msg: "Email no encontrado" });
               }
            }
            else {
               reject({ status: false, msg: "Detalles de usuario invalido" });
            }
         }
      });
   });
}

module.exports.deleteUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         }
         else {
            if (result != undefined && result != null) {
               console.log(result);
               if (result.email == userDetails.email) {
                  userModel.deleteOne({ email: userDetails.email }, function (err) {
                     if (err) return handleError(err);
                  });
                  reject({ status: true, msg: "El usuario ha sido eliminado" });
               }
               else {
                  reject({ status: false, msg: "Email no encontrado" });
               }
            }
            else {
               reject({ status: false, msg: "Detalles de usuario invalido" });
            }
         }
      });
   });
}

module.exports.searchEmailDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         }
         else {
            if (result != undefined && result != null) {
               console.log(result);

               if (result.email == userDetails.email) {
                  reject({ status: true, msg: "El Email: '" + userDetails.email + "' se ha encontrado en la colección de usuarios" });
               }
               else {
                  reject({ status: false, msg: "Email no encontrado" });
               }
            } else {
               reject({ status: false, msg: "Detalles de usuario invalido" });
            }
         }
      });
   });
}