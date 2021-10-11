var express = require('express');
var router = express.Router();
const user = require('../models/user');

/* GET users listing. */

// @ts-ignore
router.get('/:userName', async function (req, res, next) {
	const { userName } = req.params;
	const userData = await user.findOne({ where: { username: userName } });
	if (!userData) {
		res.send('Not found!');
	}
	// @ts-ignore
	const { id, firstName, lastName, username, email, role } = userData;
	res.json({ id, firstName, lastName, username, email, role });
});

module.exports = router;
