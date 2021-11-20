'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "posts" (
        "id" BIGSERIAL,
        "title" VARCHAR(300) NOT NULL,
        "shared_link" VARCHAR(2048),
        "text" TEXT,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        PRIMARY KEY ("id")
      );
    `);
  },

  async down(queryInterface) {
    return queryInterface.sequelize.query(`
      DROP TABLE "posts";
    `);
  },
};
