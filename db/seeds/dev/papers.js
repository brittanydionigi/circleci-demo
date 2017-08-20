exports.seed = function(knex, Promise) {
  return knex('footnotes').del()
    .then(() => knex('papers').del())
    .then(() => {
      return Promise.all([
        knex('papers').insert({
          title: 'Foo'
        }, 'id')
        .then(paper => {
          return knex('footnotes').insert([
            { note: 'Barr', paper_id: paper[0] },
            { note: 'Bazz', paper_id: paper[0] }
          ]);
        })
        .catch(error => console.log('Error: ', error))
      ]);
    });
};
