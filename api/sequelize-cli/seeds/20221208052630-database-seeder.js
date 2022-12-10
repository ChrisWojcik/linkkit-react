'use strict';
const { faker } = require('@faker-js/faker');
const bigInt = require('big-integer');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await clearAllTables(queryInterface);

    const users = await seedUsers(queryInterface);
    const posts = await seedPosts(queryInterface, users);
    await seedComments(queryInterface, users, posts);
  },

  async down(queryInterface) {
    await clearAllTables(queryInterface);
  },
};

async function clearAllTables(queryInterface) {
  await queryInterface.sequelize.query(`DELETE from "comment"`);
  await queryInterface.sequelize.query(
    `SELECT setval(pg_get_serial_sequence('comment', 'id'), 1, false) `
  );

  await queryInterface.sequelize.query(`DELETE from "post"`);
  await queryInterface.sequelize.query(
    `SELECT setval(pg_get_serial_sequence('post', 'id'), 1, false) `
  );

  await queryInterface.sequelize.query(`DELETE from "user"`);
  await queryInterface.sequelize.query(
    `SELECT setval(pg_get_serial_sequence('user', 'id'), 1, false) `
  );
}

async function seedUsers(queryInterface) {
  // use absurdly high github ids so we don't bump into real accounts
  let maxGithubId = bigInt('9223372036854775807');

  // 20 usernames guaranteed to be unique
  const users = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
    'enim',
  ].map((username) => {
    const user = {
      username,
      githubId: maxGithubId.toString(),
    };

    maxGithubId = maxGithubId.minus(1);

    return user;
  });

  return queryInterface.bulkInsert('user', users, { returning: true });
}

async function seedPosts(queryInterface, users) {
  // create 40 posts with random dates in the past two years,
  // sorted by creation date
  const posts = Array.from({ length: 40 }, () => faker.date.past(2))
    .sort((a, b) => {
      return a.getTime() - b.getTime();
    })
    .map((timestamp) => {
      const type = Math.random() < 0.5 ? 'text' : 'sharedLink';

      return {
        title: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 3 })),
        text:
          type === 'text'
            ? faker.lorem.sentences(faker.datatype.number({ min: 0, max: 5 }))
            : undefined,
        sharedLink:
          type === 'sharedLink'
            ? 'http://www.example.com/?param=123456789'
            : undefined,
        userId: randomEntity(users).id,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    });

  return queryInterface.bulkInsert('post', posts, { returning: true });
}

async function seedComments(queryInterface, users, posts) {
  function commentFactory(post, user, parent) {
    return {
      text: faker.lorem.sentences(faker.datatype.number({ min: 1, max: 5 })),
      userId: user.id,
      postId: post.id,
      parentId: parent ? parent.id : null,
    };
  }

  const post = posts[posts.length - 1];

  // Depth 1
  const commentsDepth1 = await queryInterface.bulkInsert(
    'comment',
    Array.from({ length: 150 }, () =>
      commentFactory(post, randomEntity(users), null)
    ),
    { returning: true }
  );

  // Depth 2
  const commentsDepth2 = await queryInterface.bulkInsert(
    'comment',
    Array.from({ length: 400 }, () =>
      commentFactory(post, randomEntity(users), randomEntity(commentsDepth1))
    ),
    { returning: true }
  );

  // Depth 3
  const commentsDepth3 = await queryInterface.bulkInsert(
    'comment',
    Array.from({ length: 200 }, () =>
      commentFactory(post, randomEntity(users), randomEntity(commentsDepth2))
    ),
    { returning: true }
  );

  // Depth 4
  const commentsDepth4 = await queryInterface.bulkInsert(
    'comment',
    Array.from({ length: 100 }, () =>
      commentFactory(post, randomEntity(users), randomEntity(commentsDepth3))
    ),
    { returning: true }
  );

  // Depth 5
  const commentsDepth5 = await queryInterface.bulkInsert(
    'comment',
    Array.from({ length: 75 }, () =>
      commentFactory(post, randomEntity(users), randomEntity(commentsDepth4))
    ),
    { returning: true }
  );

  // Depth 6
  const commentsDepth6 = await queryInterface.bulkInsert(
    'comment',
    Array.from({ length: 50 }, () =>
      commentFactory(post, randomEntity(users), randomEntity(commentsDepth5))
    ),
    { returning: true }
  );

  // Depth 7
  await queryInterface.bulkInsert(
    'comment',
    Array.from({ length: 25 }, () =>
      commentFactory(post, randomEntity(users), randomEntity(commentsDepth6))
    ),
    { returning: true }
  );
}

function randomEntity(entities) {
  return entities[
    Math.floor(Math.random() * (entities.length - 1 - 0 + 0) + 0)
  ];
}
