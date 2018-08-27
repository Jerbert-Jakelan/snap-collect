UPDATE collections
SET name = $2
WHERE collection_id = $1;

SELECT * FROM collections
WHERE user_id = $3;