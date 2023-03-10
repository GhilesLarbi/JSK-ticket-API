const AppErr = require('../utils/AppErr')

const manageRoles = (role) => {
	role = role.toLowerCase()
	
	return function (req, res, next) {
		if (role == 'admin' && req.isAdmin)
			return next()
			
		if (role == 'user' && !req.isAdmin)
			return next()
		
		if (role == 'valid-user' && !req.isAdmin)
			if (req.isEmailConfirmed) return next()
			else throw new Error(401, 'Please confirm your email', 'isEmailConfirmed')
		
		
		throw new AppErr(401, 'You are not authorized', 'token')
	}
}

module.exports = manageRoles