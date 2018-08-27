DELETE FROM collections
WHERE collection_id = $1;

SELECT * from collections
WHERE user_id = $2;