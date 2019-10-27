module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
