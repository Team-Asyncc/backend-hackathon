const { DataTypes } = require('sequelize');
const sequelize = require('../database/');
const User = require('./user');

const Scrum = sequelize.define(
	'Scrums',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		attendance: {
			type: DataTypes.BOOLEAN,
		},
		saw_last_lecture: {
			type: DataTypes.BOOLEAN,
		},
		tha_progress: {
			type: DataTypes.STRING,
		},
		topics_to_cover: {
			type: DataTypes.STRING,
		},
		backlog_reasons: {
			type: DataTypes.STRING,
		},
		class_rating: {
			type: DataTypes.INTEGER,
		},
		creation_date: {
			type: DataTypes.DATE,
			defaultValue: new Date().toLocaleDateString(),
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				table: 'Users',
				key: 'id',
			},
		},
	},
	{
		timestamps: true,
	}
);

Scrum.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Scrum;
