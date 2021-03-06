const Sequelize = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(process.env.pscale,
{
  dialect: "mysql2",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ssl: true
    }
  }
});
sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database:', err);
      });
const op = Sequelize.Op;
const Users = sequelize.define('users', 
  { 
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    acID: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    accountType: Sequelize.STRING
    ///...
  }, { 
    freezeTableName: true 
  });

const Appointments = sequelize.define('appointments', 
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userID: {
      type: Sequelize.INTEGER
    },
    userEmail: {
      type: Sequelize.STRING
    },
    adminID: {
      type: Sequelize.INTEGER
    },
    startTime: {
      type: Sequelize.DATE
    },
    endTime: {
      type: Sequelize.DATE
    }
  });

const AppointmentTypes = sequelize.define('appointment-types', 
{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  adminID: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  typeName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  typeDescription: {
    type: Sequelize.STRING,
    allowNull: true
  }

});

module.exports = { 
  Users, 
  Appointments, 
  AppointmentTypes, 
  sequelize, 
  op 
}