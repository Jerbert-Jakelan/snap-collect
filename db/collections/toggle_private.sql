UPDATE collections
SET private = $2
WHERE collection_id = $1;

SELECT * from collections
WHERE user_id = $3
ORDER BY collection_id DESC;