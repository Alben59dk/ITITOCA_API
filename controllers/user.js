let UserModel = require('../models/user')

class UserController {
    static getUsers(req, res) {
        UserModel.find({},(err, data) => {
            if(err) {
                res.status(503).json({
                    error: err.message
                })    
                return
            }
            if(data) {
                 res.status(200).json(data)
            } 
          })
    }
}

module.exports = UserController
