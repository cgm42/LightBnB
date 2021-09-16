const properties = require('./json/properties.json');
const {Pool} = require('pg');
const pool = new Pool(
  {user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'}
  );
  const users = require('./json/users.json');
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(
    'SELECT * from users where email=$1',
    [email.toLowerCase()])
  .then((result) => {
    if(result.rows === []) return null;
    return result.rows[0];
  })
  .catch((err) => {
    console.log('error => ', err);
  });
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(
    'SELECT * from users where id=$1',
    [id])
  .then((result) => {
    if(result.rows === []) return null;
    return result.rows[0];
  })
  .catch((err) => {
    console.log('error => ', err);
  });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
  .query(
    `INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3) RETURNING *`,
    [user.name, user.email.toLowerCase(), user.password])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log('error => ', err);
  });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
 
 // pool.connect()

  return pool
  .query(
    'SELECT * from properties limit $1',
    [limit])
  .then((result) => {
    return result.rows
  })
  .catch((err) => {
    console.log('error => ', err);
  });

  //return query;
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}


exports.addProperty = addProperty;
