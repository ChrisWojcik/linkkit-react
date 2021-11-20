'use strict';

module.exports = {
  async up(queryInterface) {
    return queryInterface.sequelize.query(`
      CREATE TABLE IF NOT EXISTS "comments" (
        "id" BIGSERIAL,
        "text" TEXT NOT NULL,
        "post_id" BIGINT NOT NULL,
        "parent_id" BIGINT,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
        PRIMARY KEY ("id"),
        FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE CASCADE,
        FOREIGN KEY ("parent_id") REFERENCES "comments" ("id") ON DELETE CASCADE
      );
    `);
  },

  async down(queryInterface) {
    return queryInterface.sequelize.query(`
      DROP TABLE "comments";
    `);
  },
};
