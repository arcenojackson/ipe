import { db } from './db'

export async function createUsers() {
  await db.sql`
    CREATE TABLE users (
      id uuid DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      PRIMARY KEY (id)
    );
  `
}

export async function createMusics() {
  await db.sql`
    CREATE TABLE musics (
      id uuid DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      artist TEXT NOT NULL,
      obs TEXT,
      youtube TEXT NOT NULL,
      cipher TEXT NOT NULL,
      lyrics TEXT,
      bpm INT,
      tempo TEXT,
      tone CHAR,
      PRIMARY KEY (id)
    );
  `
}

export async function createEvents() {
  await db.sql`
    CREATE TABLE events (
      id uuid DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      date TIMESTAMP NOT NULL,
      start TEXT,
      PRIMARY KEY (id)
    );
  `
}

export async function createEventContents() {
  await db.sql`
    CREATE TABLE events_contents (
      id uuid DEFAULT gen_random_uuid(),
      event_id uuid NOT NULL,
      people uuid [],
      musics uuid [],
      PRIMARY KEY (id),
      CONSTRAINT fk_event
        FOREIGN KEY(event_id)
          REFERENCES events(id)
    );
  `
}
