var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email: userDetails.email }, function getResult(errorvalue, result) {
         if (errorvalue) {
            reject({ status: false, msg: "Datos Invalidos" });
         }
         else {
            if (result != undefined && result != null) {
               resolve({ status: false, msg: "El email ya esta asignado a un usuario" });
            }
            else {
               var userModelData = new userModel();

               userModelData.firstname = userDetails.firstname;
               userModelData.lastname = userDetails.lastname;
               userModelData.email = userDetails.email;
               userModelData.password = userDetails.password;
               var encrypted = encryptor.encrypt(userDetails.password);
               userModelData.password = encrypted;

               userModelData.save(function resultHandle(error, result) {
                  if (error) {
                     reject({ status: false, msg: "Ha habido un error al momento de crear el usuario" });
                  } else {
                     resolve({ status: true, msg: "El usuario ha sido creado" });
                  }
               });
            }
         }
      })
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
                  resolve({ status: true, msg: "El usuario ha sido eliminado" });
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

module.exports.updateUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOneAndUpdate(
         { email: userDetails.email },
         {
            $set: {
               password: encryptor.encrypt(userDetails.password),
               firstname: userDetails.firstname,
               lastname: userDetails.lastname
            }
         },
         { new: true },
         function getresult(errorvalue, result) {
            if (errorvalue) {
               reject({ status: false, msg: "Datos Invalidos" });
            }
            else {
               if (result != undefined && result != null) {
                  if (result.email = userDetails.email) {
                     resolve({ status: true, msg: "El usuario ha sido modificado" });
                  }
               }
               else {
                  reject({ status: false, msg: "Datos de usuario invalido" });
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
                  resolve({ status: true, msg: "Usuario Validado" });
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
                  resolve({ status: true, msg: "El email '" + userDetails.email + "' ha sido encontrado dentro del registro de usuarios" });
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