exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('papers', (table) => {
      table.increments('id').primary();
      table.string('title');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('footnotes', (table) => {
      table.increments('id').primary();
      table.string('note');
      table.integer('paper_id').unsigned();
      table.foreign('paper_id').references('papers.id');

      table.timestamps(true, true);
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('footnotes'),
    knex.schema.dropTable('papers')
  ]);
};
