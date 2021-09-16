SELECT city, count(properties.city) as total_reservation
FROM reservations
JOIN properties ON property_id = properties.id
GROUP BY properties.city
ORDER BY count(properties.city) DESC