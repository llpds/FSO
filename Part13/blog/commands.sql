CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    likes INTEGER DEFAULT 0
);

insert into blogs (author, url, title) values ('author1', 'url1', 'title1');
insert into blogs (author, url, title) values ('author2', 'url2', 'title2');