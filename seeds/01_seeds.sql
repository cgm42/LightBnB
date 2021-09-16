INSERT INTO users (id, name, email, password)
VALUES (1, 'Sue Luna ', 'jasonvincent@gmx.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(2, 'Kay Kay', 'jaycereynolds@inbox.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'LL Kelly','makaylaweiss@icloud.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (id, owner_id, title, description, thumbnail_photo_url,
cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms)
VALUES 
(1, 1, 'Cozy Room in Burnaby', 'description', 'tinyurl.com', 'tinyurl.com', 190, 1, 2, 2, 'CA', 'Jane St', 'Burnaby', 'BC', 'V0G 4A4'),
(2, 2, 'Garden Suite', 'description', 'tinyurl.com', 'tinyurl.com', 200, 2, 3, 2, 'CA', 'Main St', 'Malibu', 'BC', 'V0G 4A4'),
(3, 3, 'Surrey Penthouse', 'description', 'tinyurl.com', 'tinyurl.com', 800, 2, 5, 3, 'CA', '1st St', 'Fort Nelson', 'BC', 'V5G 4A4');

INSERT INTO reservations (id, start_date, end_date, property_id, guest_id)
VALUES 
(1, 2021-09-03, 2021-09-13, 1, 3),
(2, 2021-09-04, 2021-09-11, 2, 1),
(3, 2021-09-05, 2021-09-10, 3, 2);

INSERT INTO property_reviews (id, guest_id, property_id, reservation_id, message)
VALUES 
(1, 3, 1, 1, 'rate'),
(2, 1, 2, 2, 'rate'),
(3, 2, 3, 3, 'rate');