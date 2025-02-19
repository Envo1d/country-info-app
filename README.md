# Country Info App

## Development

### Installing dependencies
To install dependencies, run the command inside backend and frontend directories:
```sh
$ npm i
```

### Launching the Development server

#### Before starting, make sure that you have correctly configured .env files!

Specify the port and URL of third-party APIs for the server:
```sh
PORT=7000
COUNTRIES_NOW_BASE_URL="https://countriesnow.space/api/v0.1/countries"
DATE_NAGER_BASE_URL="https://date.nager.at/api/v3"
```

For the client, specify the server URL:
```sh
NEXT_PUBLIC_API_BASE_URL="http://localhost:7000"
```

To start the server for development, run the command:
```sh
npm run start:dev
```

To start the client for development, run the command:
```sh
npm run dev
```