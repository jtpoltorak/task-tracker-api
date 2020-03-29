module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "LetMeIn1!",
  DB: "task_tracker",
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
