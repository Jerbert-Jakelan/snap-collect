CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    auth_id TEXT,
    name VARCHAR(50),
    profile_pic TEXT
);

CREATE TABLE IF NOT EXISTS categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS collections (
    collection_id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES categories(category_id),
    user_id INTEGER REFERENCES users(user_id),
    name VARCHAR(50),
    description VARCHAR(300),
    collection_pic TEXT 
);

CREATE TABLE IF NOT EXISTS cards (
    card_id SERIAL PRIMARY KEY,
    image TEXT,
    name VARCHAR(50),
    team VARCHAR(50),
    tradable BOOLEAN,
    year VARCHAR(10),
    collection_id INTEGER REFERENCES collections(collection_id) ON DELETE CASCADE;
);

CREATE TABLE IF NOT EXISTS trades (
    trade_id SERIAL PRIMARY KEY,
    to_user INTEGER REFERENCES users(user_id),
    from_user INTEGER REFERENCES users(user_id),
    to_cards INTEGER ARRAY,
    from_cards INTEGER ARRAY,
    status VARCHAR(50)
);