SELECT collections.*, users.city, users.state, users.profile_pic, users.profile_pic, users.name AS user_name FROM collections
JOIN users on users.user_id = collections.user_id
WHERE private != TRUE;