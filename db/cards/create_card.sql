INSERT INTO cards(name, team, year, image, collection_id)
VALUES($1, $2, $3, $4, $5);

SELECT * FROM cards
WHERE collection_id = $5;