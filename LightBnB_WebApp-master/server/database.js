const properties = require('./json/properties.json');
  const db = require('./db/index');

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return db
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
  return db
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
  return db
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
  return db
  .query(
    'SELECT * from reservations join properties on properties.id=property_id where guest_id=$1 limit 10',
    [guest_id])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log('error => ', err);
  });
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
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties 
  JOIN property_reviews ON properties.id = property_reviews.property_id`;

  let queryParam = []; 

  if (options.city) {
    queryParam.push(`%${options.city}%`);
    queryString += ` WHERE city LIKE $${queryParam.length}`; 
  }

  if (options.owner_id) {
    queryParam.push(options.owner_id);
    if (options.city) {
      queryString += ` AND owner_id=$${queryParam.length}`;
    } else {
      queryString += ` WHERE owner_id=$${queryParam.length}`;
    }
  }

  if (options.minimum_price_per_night) {
    queryParam.push(options.minimum_price_per_night);
    if (options.city) {
      queryString += ` AND cost_per_night>$${queryParam.length}`;
    } else {
      queryString += ` WHERE cost_per_night>$${queryParam.length}`;
    }
  }

  if (options.maximum_price_per_night) {
    queryParam.push(options.maximum_price_per_night);
    if (options.city  || options.minimum_price_per_night) {
      queryString += ` AND cost_per_night<$${queryParam.length}`;
    } else {
      queryString += ` WHERE cost_per_night<$${queryParam.length}`;
    }
  }
  
  if (options.minimum_rating ) {
    queryParam.push(`${options.minimum_rating}`);
    queryString += `
      GROUP BY properties.id`;
    queryString += ` HAVING avg(property_reviews.rating)>=$${queryParam.length}`; 
  } else{
    queryString += `
    GROUP BY properties.id`;
  }

  queryParam.push(limit);
  queryString += `
  LIMIT $${queryParam.length};
  `;
  return db
  .query(
    queryString,
    queryParam)
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
  return db
  .query(
    `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province,
      post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
    [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, 
      property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country,
      property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms  ])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log('error => ', err);
  });
}

exports.addProperty = addProperty;

const addReservation = function(start_date, end_date, id, user_id) {
  return db
  .query(
    `INSERT INTO reservations (start_date, end_date, property_id, guest_id)
    VALUES ($1, $2, $3, $4) RETURNING *`,
    [start_date, end_date, id, user_id])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log('error => ', err);
  });
}

exports.addReservation = addReservation;

