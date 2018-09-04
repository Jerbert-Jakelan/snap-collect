SELECT * FROM collections
WHERE user_id = $1
ORDER BY collection_id DESC;