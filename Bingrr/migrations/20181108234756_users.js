
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", t => {
      t.increments('id');
      t.string('userName');
      t.string('firstName');
      t.string('lastName');
      t.string('email');
      t.string('passwordDigest');
      t.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
