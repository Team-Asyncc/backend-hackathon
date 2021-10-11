// const { DataTypes } = require('sequelize');
// const sequelize = require('../database/');

// const Scrum = sequelize.define(
// 	'Scrums',
// 	{
// 		id: {
// 			type: DataTypes.UUID,
// 			defaultValue: DataTypes.UUIDV4,
// 			primaryKey: true,
// 		},
// 		attendance: {
// 			type: DataTypes.BOOLEAN,
// 		},
// 		saw_last_lecture: {
// 			type: DataTypes.BOOLEAN,
// 		},
// 		tha_progress: {
// 			type: DataTypes.STRING,
// 		},
// 		topics_to_cover: {
// 			type: DataTypes.STRING,
// 		},
// 		backlog_reasons: {
// 			type: DataTypes.STRING,
// 		},
// 		class_rating: {
// 			type: DataTypes.INTEGER,
// 		},
// 		creation_date: {
// 			type: DataTypes.DATE,
// 			defaultValue: new Date().toLocaleDateString(),
// 		},
// 	},
// 	{
// 		timestamps: true,
// 	}
// );

// const User = sequelize.define('Users', {
// 	//Model attributes
// 	id: {
// 		type: DataTypes.INTEGER,
// 		autoIncrement: true,
// 		unique: true,
// 		primaryKey: true,
// 	},
// 	firstName: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 	},

// 	lastName: {
// 		type: DataTypes.STRING,
// 	},
// 	email: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 		unique: true,
// 	},
// 	password: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 	},
// 	username: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 		unique: true,
// 	},
// 	role: {
// 		type: DataTypes.STRING,
// 		defaultValue: 'user',
// 		// @ts-ignore
// 		enum: ['user', 'student', 'tl', 'vtl', 'bl', 'admin'],
// 	},
// });

// User.hasMany(Scrum);
// Scrum.belongsTo(User);

// module.exports = {
// 	Scrum,
// 	User,
// };
