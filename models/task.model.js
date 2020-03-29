module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    title: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true, // use the model name as the table name in the query
    timestamps: false // disable timestamps for this model (e.g. 'createdAt', 'updatedAt')
  });
  return Task;
};