INSERT INTO users (name, auth_id, profile_pic, city, state) VALUES ($1, $2, $3, $4, $5)
RETURNING *;