INSERT INTO users (name, auth_id, profile_pic) VALUES ($1, $2, $3)
RETURNING *;