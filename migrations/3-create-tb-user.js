'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tb_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      f_name: {
        type: Sequelize.STRING
      },
      l_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"tb_roles",
          key:"id",
          onDelete:"CASCADE"
        }
       
      },
      section_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"tb_sections",
          key:"id",
          onDelete:"CASCADE"
        }
        
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tb_users');
  }
};