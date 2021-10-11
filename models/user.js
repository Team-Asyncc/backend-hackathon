const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Scrum = require('./scrum');

const User = sequelize.define('Users', {
	//Model attributes
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		unique: true,
		primaryKey: true,
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	lastName: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	role: {
		type: DataTypes.STRING,
		defaultValue: 'user',
		// @ts-ignore
		enum: ['user', 'student', 'tl', 'vtl', 'bl', 'admin'],
	},
});

module.exports = User;
