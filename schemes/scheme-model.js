const knex = require('knex');

const config = require('../knexfile.js');

const db = knex(config.development);

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
}

function find(){
    return db('schemes')
};

function findById(id){
    return db('schemes')
    .where({id})
    .first()
};

function findSteps(id){
    return db('schemes')
    .join("steps", "schemes.id",
     "steps.scheme_id")
    .where('schemes.id', id)
};

function add(scheme){
    return db("schemes")
    .insert(scheme, "id")
    .then(([id]) => {
      return findById(id);
    });
};

function update(changes, id){
    return db("schemes")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
};

function remove(id){
    return db('schemes')
    .where({id})
    .del()
};