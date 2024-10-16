import { db } from '../db'

export class InitialMigrations {
  static async up() {
    try {
      await this.createUsers()
      await this.createMusics()
      await this.createEvents()
      await this.createEventContents()
      await this.createMigrations()
    } catch (error) {
      console.log(error)
    }
  }

  static async createUsers() {
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

  static async createMusics() {
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
        tone TEXT,
        PRIMARY KEY (id)
      );
    `
  }

  static async createEvents() {
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

  static async createEventContents() {
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

  static async createMigrations() {
    await db.sql`
      CREATE TABLE IF NOT EXISTS migrations (
        id uuid DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (id)
      );
    `
  }
}
