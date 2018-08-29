DELETE FROM cards
WHERE card_id = $1;

SELECT * FROM cards
WHERE collection_id = $2;