module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cancellations', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
      },

      deliveryman_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'deliverymen', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('cancellations');
  },
};
