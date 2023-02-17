var userService = require('./userServices');

var createUserControllerFunc = async (req, res) => {
    try {
        console.log(req.body);
        var result = await userService.createUserDBService(req.body);

        if (result.status) {
            res.send({ "status": true, "message": "Usuario creado" });
        } else {
            res.send({ "status": false, "message": "Error creando usuario" });
        }
    } catch (err) {
        console.log(err);
        res.send({ "status": false, "message": err.msg });
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        console.log(req.body);
        result = await userService.loginUserDBService(req.body);

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUserControllerFunc = async (req, res) => {
    try {
        var result = await userService.updateUserDBService(req.body);
        console.log(result.status);

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.bodymsg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var deleteUserControllerFunc = async (req, res) => {
    try {
        var result = await userService.deleteUserDBService(req.body);
        console.log(result.status);

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.bodymsg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var searchEmailControllerFunc = async (req, res) => {
    try {
        var result = await userService.searchEmailDBService(req.body);
        console.log(result.status);

        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.bodymsg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, updateUserControllerFunc, deleteUserControllerFunc, searchEmailControllerFunc };