-- Seeing as we will be testing out this script alot we can destroy the db before creating everything again; cannot drop currently open db
-- DROP DATABASE IF EXISTS resources;

-- Create the db; db already created in pgAdmin 4
-- CREATE DATABASE resources;

-- Move into the db
\c resources

-- Create our table if it doesn't already exist
-- CREATE TABLE IF NOT EXISTS resource_links

DROP TABLE resource_links;

CREATE TABLE resource_links(title VARCHAR,link VARCHAR, section VARCHAR);

-- Changes the owner of the table to postgres which is the default when installing resources; owner is already postgres
-- CREATE TABLE resource_links 
-- OWNER TO postgres;