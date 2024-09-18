import { exit } from 'process'
import { db } from './db'

async function createUsers() {
  await db.sql`
    CREATE TABLE IF NOT EXISTS people (
      id uuid DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      phone TEXT,
      PRIMARY KEY (id)
    );
  `
}

async function createMusics() {
  await db.sql`
    CREATE TABLE IF NOT EXISTS musics (
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

async function createEvents() {
  await db.sql`
    CREATE TABLE IF NOT EXISTS events (
      id uuid DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      date TIMESTAMP NOT NULL,
      start TEXT,
      PRIMARY KEY (id)
    );
  `
}

async function createEventContents() {
  await db.sql`
    CREATE TABLE IF NOT EXISTS events_contents (
      id uuid DEFAULT gen_random_uuid(),
      event_id uuid NOT NULL,
      people JSONB,
      steps JSONB,
      PRIMARY KEY (id),
      CONSTRAINT fk_event
        FOREIGN KEY(event_id)
          REFERENCES events(id)
    );
  `
}

console.log('Iniciando execução de migrations!')
console.log('Criando tabelas no banco...')
await createUsers()
await createMusics()
await createEvents()
await createEventContents()
console.log('Migrations executadas com sucesso!')
exit(0)
