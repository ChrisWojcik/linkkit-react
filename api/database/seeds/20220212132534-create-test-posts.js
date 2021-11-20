'use strict';
const faker = require('faker');

function fakePost() {
  const type = Math.random() < 0.5 ? 'text' : 'shared_link';
  const date = faker.date.past(2);

  return {
    title: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 3 })),
    text:
      type === 'text'
        ? faker.lorem.sentences(faker.datatype.number({ min: 0, max: 5 }))
        : null,
    shared_link:
      type === 'shared_link' ? 'http://www.example.com/?param=123456789' : null,
    created_at: date,
    updated_at: date,
  };
}

module.exports = {
  async up(queryInterface) {
    const fakePosts = Array.from({ length: 40 }, fakePost).sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });

    return queryInterface.bulkInsert('posts', fakePosts, {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('posts', null, {});
  },
};
