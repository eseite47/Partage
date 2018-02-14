// const Message = require('./message');
// const Channel = require('./channel');
// const Author = require('./author');
const User = require('./user');
const Link = require('./link')

// Channel.hasMany(Message, {
//   onDelete: 'cascade',
//   hooks: true
// });

// Author.hasMany(Message);

// Message.belongsTo(Channel);
// Message.belongsTo(Author);

User.hasMany(Link)
Link.belongsTo(User)

module.exports = {
  User,
  Link
};
