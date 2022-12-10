'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "comment" (
        "id" SERIAL,
        "text" TEXT NOT NULL,
        "userId" INT NOT NULL,
        "postId" INT NOT NULL,
        "parentId" INT,
        "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        PRIMARY KEY ("id"),
        FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE,
        FOREIGN KEY ("postId") REFERENCES "post" ("id") ON DELETE CASCADE,
        FOREIGN KEY ("parentId") REFERENCES "comment" ("id") ON DELETE CASCADE
      );
    `);
  },

  async down(queryInterface) {
    return queryInterface.sequelize.query(`
      DROP TABLE "comment";
    `);
  },
};
