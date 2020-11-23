
exports.up = function(knex) {
  return knex.schema
    // SHIPPING_INFO
    .createTable('shipping_info', tbl => {
        // id, primary key
        tbl.increments();
        // street1, string, required
        tbl.string('street1')
            .notNullable();
        // street2, string, optional
        tbl.string('street2');
        // city, string, required
        tbl.string('city')
            .notNullable();
        // state, string, required
        tbl.string('state')
            .notNullable();
        // zip, string, required
        tbl.string('zip')
            .notNullable();
    })
    
    // BILLING_INFO
    .createTable('billing_info', tbl => {
        // id, primary key
        tbl.increments();
        // ccNum, string, required
        tbl.string('ccNum')
            .notNullable();
        // exp, string, required
        tbl.string('exp')
            .notNullable();
    })

    // ORDERS
    .createTable('orders', tbl => {
        // id, primary key
        tbl.increments();
        // billing_id, foreign key
        tbl.integer('billing_id')
            .notNullable()
            .references('id')
            .inTable('billing_info')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        // shipping_id, foreign key
        tbl.integer('shipping_id')
            .notNullable()
            .references('id')
            .inTable('shipping_info')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        // firstName
        tbl.string('firstName')
            .notNullable();
        // lastName
        tbl.string('lastName')
            .notNullable();
        // email
        tbl.string('email')
            .notNullable()
            .unique();
        // phone
        tbl.string('phone')
            .notNullable();
        // quantity
        tbl.string('quantity')
            .notNullable();
        // total
        tbl.string('total')
            .notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('orders')
    .dropTableIfExists('billing_info')
    .dropTableIfExists('shipping_info')
};
