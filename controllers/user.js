let UserModel = require('../models/user')

class UserController {
    static getUsers(req, res) {
        UserModel.find({},(err, data) => {
            if(err) return handleError(err)
            if(data) {
                console.log(data) 
                return res.send(data)
            }
          })
    }
}

module.exports = UserController
