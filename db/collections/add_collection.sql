INSERT INTO collections( category_id, user_id, name,  description, collection_pic )
VALUES($1, $2, $3, $4, $5);

SELECT * from collections
WHERE user_id = $2;