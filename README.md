# IPE

An app to manage people, music, etc, in the Presbyterian Church from Estreito/Floripa(SC)

## Getting Started

First of all, setup the .env file copying the content of .env.example to a new file nammd ".env"

Running the app:

```bash
yarn

yarn dev
```

Configuring database:

```bash
  docker compose up -d

  yarn migrate:up
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
