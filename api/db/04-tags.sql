CREATE TYPE tag_category AS ENUM ('general', 'artist', 'caracter');

CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category tag_category DEFAULT 'general' NOT NULL,
    post_count BIGINT DEFAULT 0 NOT NULL
);

CREATE INDEX idx_tags_category ON tags(category);
CREATE INDEX idx_tags_name_like ON tags(name varchar_pattern_ops);
