const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.POSTGRE_URI) {
  sequelize = new Sequelize(process.env.POSTGRE_URI);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    }
  );
}

module.exports = sequelize;
