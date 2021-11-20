'use strict';
const faker = require('faker');

function fakeComment(parent_id) {
  const date = faker.date.past(2);

  return {
    text: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 5 })),
    post_id: '40',
    parent_id: parent_id || null,
    created_at: date,
    updated_at: date,
  };
}

module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {
      let fakeComments = Array.from({ length: 150 }, fakeComment).sort(
        (a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        }
      );

      await queryInterface.bulkInsert('comments', fakeComments, {
        transaction: t,
      });

      fakeComments = Array.from({ length: 400 }, () => {
        const parent_id = Math.floor(Math.random() * (150 - 1 + 1) + 1);
        return fakeComment(parent_id);
      }).sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      await queryInterface.bulkInsert('comments', fakeComments, {
        transaction: t,
      });

      fakeComments = Array.from({ length: 200 }, () => {
        const parent_id = Math.floor(Math.random() * (550 - 151 + 1) + 151);
        return fakeComment(parent_id);
      }).sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      await queryInterface.bulkInsert('comments', fakeComments, {
        transaction: t,
      });

      fakeComments = Array.from({ length: 100 }, () => {
        const parent_id = Math.floor(Math.random() * (750 - 551 + 1) + 551);
        return fakeComment(parent_id);
      }).sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      await queryInterface.bulkInsert('comments', fakeComments, {
        transaction: t,
      });

      fakeComments = Array.from({ length: 75 }, () => {
        const parent_id = Math.floor(Math.random() * (850 - 751 + 1) + 751);
        return fakeComment(parent_id);
      }).sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      await queryInterface.bulkInsert('comments', fakeComments, {
        transaction: t,
      });

      fakeComments = Array.from({ length: 50 }, () => {
        const parent_id = Math.floor(Math.random() * (925 - 851 + 1) + 851);
        return fakeComment(parent_id);
      }).sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      await queryInterface.bulkInsert('comments', fakeComments, {
        transaction: t,
      });

      fakeComments = Array.from({ length: 25 }, () => {
        const parent_id = Math.floor(Math.random() * (975 - 926 + 1) + 926);
        return fakeComment(parent_id);
      }).sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      await queryInterface.bulkInsert('comments', fakeComments, {
        transaction: t,
      });
    });
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
