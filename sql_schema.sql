-- PostgreSQL Schema for ContactApp
-- Run manually or let EF Core migrations handle it

CREATE DATABASE contactappdb;

--c contactappdb;

CREATE TABLE "Contacts" (
    "Id"          SERIAL PRIMARY KEY,
    "FirstName"   VARCHAR(50)  NOT NULL,
    "LastName"    VARCHAR(50)  NOT NULL DEFAULT '',
    "Email"       VARCHAR(100) NOT NULL DEFAULT '',
    "PhoneNumber" VARCHAR(20)  NOT NULL DEFAULT '',
    "Company"     VARCHAR(100) NOT NULL DEFAULT '',
    "Address"     VARCHAR(250) NOT NULL DEFAULT '',
    "Favorite"    BOOLEAN      NOT NULL DEFAULT FALSE,
    "CreatedAt"   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Sample data
INSERT INTO "Contacts" ("FirstName","LastName","Email","PhoneNumber","Company","Address","Favorite")
VALUES
  ('Charan', 'Kumar', 'charan@example.com', '+91 9876543210', 'Tech Corp', 'Hyderabad, India', TRUE),
  ('Alice',  'Smith', 'alice@example.com',  '+1 555-0101',   'Acme Inc',  'New York, USA',   FALSE),
  ('Bob',    'Jones', 'bob@example.com',    '+44 7700900100','Widgets Ltd','London, UK',      FALSE);
