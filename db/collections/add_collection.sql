INSERT INTO collections(name, category_id, user_id, description, collection_pic )
VALUES($1, $2, $3, $4, $5);

SELECT * from collections
WHERE user_id = $3;