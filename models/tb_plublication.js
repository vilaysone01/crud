'use strict';
module.exports = (sequelize, DataTypes) => {
  const tb_plublication = sequelize.define('tb_plublication', {
    no: DataTypes.INTEGER,
    laoContent: DataTypes.STRING,
    engContent: DataTypes.STRING
  }, {});
  tb_plublication.associate = function(models) {
    // associations can be defined here
  };
  return tb_plublication;
};