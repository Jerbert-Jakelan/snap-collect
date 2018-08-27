INSERT INTO collections(name, category_id, user_id)
VALUES($1, $2, $3);

SELECT * from collections
WHERE user_id = $3;