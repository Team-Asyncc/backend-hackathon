const User = require('./user');
const Scrum = require('./scrum');

User.hasMany(Scrum);
Scrum.belongsTo(User);
