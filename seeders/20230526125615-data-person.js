'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('People', [{
      name: 'Kamarul Risman',
      phone: '085964261072',
      email: 'risman.kerja@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Kamarudin',
      phone: '08596421234',
      email: 'samuel@test.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
