const RoleMonkey = require('../models/rolMonkey')

const isValidRolMonkey = async (rolMonkey = '')=> {
	const existeRolMonkey = await RoleMonkey.findOne({ rolMonkey })
		  if (!existeRolMonkey) {
			  throw new Error(`RolMonkey ${rolMonkey} no existe en la base de datos`)
		  }
}
module.exports= {isValidRolMonkey}