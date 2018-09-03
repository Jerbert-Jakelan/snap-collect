UPDATE collections
SET name = $2, category_id = $3, description = $4, private = $5
WHERE collection_id = $1;

SELECT * FROM collections
WHERE user_id = $6;