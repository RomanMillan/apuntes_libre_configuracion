const {Schema, model} = require('mongoose')

const RoleMonkeySchema = Schema({
    rolMonkey: {
        type: String,
        require: [true, 'El rol de momo es obligatorio']
    }
})

module.exports = model('RoleMonkey',RoleMonkeySchema)