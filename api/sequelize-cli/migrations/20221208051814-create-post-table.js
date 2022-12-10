'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "post" (
        "id" SERIAL,
        "title" VARCHAR(300) NOT NULL,
        "sharedLink" VARCHAR(2048),
        "text" TEXT,
        "userId" INT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        PRIMARY KEY ("id"),
        FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE
      );
    `);
  },

  async down(queryInterface) {
    return queryInterface.sequelize.query(`
      DROP TABLE "posts";
    `);
  },
};
