const router = require('express').Router();
const user = require('../models/user');
const Scrum = require('../models/scrum');
const { userAuth } = require('../utils/auth');

router.post('/', async (req, res) => {
	const { data } = req.body;
	try {
		// @ts-ignore
		const scrum = new Scrum(data);
		await scrum.save();

		return res.send({
			data: {
				...scrum.dataValues,
			},
			sucess: true,
		});
	} catch (err) {
		res.status(500).send({ error: true, data: err.message });
	}
});

module.exports = router;
