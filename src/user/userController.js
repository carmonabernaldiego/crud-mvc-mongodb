var userService = require('./userServices');

var createUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.createUserDBService(req.body);

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

var deleteUserControllerFunc = async (req, res) => {
    try {
        var response = await userService.deleteUserDBService(req.body);
        console.log(response.status);
        if (response.status) {
            res.send({ "status": true, "message": response.msg });
        } else {
            res.send({ "status": false, "message": response.bodymsg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var updateUserControllerFunc = async (req, res) => {
    try {
        var response = await userService.updateUserDBService(req.body);
        console.log(response.status);
        if (response.status) {
            res.send({ "status": true, "message": response.msg });
        } else {
            res.send({ "status": false, "message": response.bodymsg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
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

var searchEmailControllerFunc = async (req, res) => {
    try {
        var response = await userService.searchEmailDBService(req.body);
        console.log(response.status);
        if (response.status) {
            res.send({ "status": true, "message": response.msg });
        } else {
            res.send({ "status": false, "message": response.bodymsg });
        }
    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, searchEmailControllerFunc, deleteUserControllerFunc, updateUserControllerFunc };