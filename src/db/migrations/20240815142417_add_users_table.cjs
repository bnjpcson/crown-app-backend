/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary(); // Auto-incrementing ID
    table.string("first_name").notNullable(); // Name column
    table.string("last_name").notNullable(); // Name column
    table.string("username").unique().notNullable(); // Unique email column
    table.string("email").unique().notNullable(); // Unique email column
    table.string("password").notNullable(); // Unique email column
    table.timestamps(true, true); // Created at and updated at timestamps
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
