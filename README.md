# The TVDB API

[![Build Status](https://www.travis-ci.com/SirDavidLudwig/tvdb-api.svg?branch=master)](https://www.travis-ci.com/SirDavidLudwig/tvdb-api) [![Coverage Status](https://coveralls.io/repos/github/SirDavidLudwig/tvdb-api/badge.svg?branch=master)](https://coveralls.io/github/SirDavidLudwig/tvdb-api?branch=master)

A feature-complete library for interfacing with [The TVDB](https://thetvdb.com/)'s new v4 API. Highlights of the module are described below:

- The TVDB v4 API
- Feature-complete
- Promise-based API
- No external dependencies
- Native TypeScript support

## Install
```sh
$ npm install tvdb-api
```

## Usage

**TypeScript**
```ts
import TVDB from "tvdb-api";

// Create a new instance of the interface
let tvdb = new TVDB("API-KEY");

// Login using a user's PIN
tvdb.login("PIN").then(() => {
	console.log("Login successful");
});
```

## Documentation [WIP]

While documentation is currently work in progress, all functions are documented and visible within the main interface class [here](https://github.com/SirDavidLudwig/tvdb-api/blob/master/src/tvdb.ts#L63-L538).

The full documentation of The TVDB's v4 API is available [here](https://app.swaggerhub.com/apis-docs/thetvdb/tvdb-api_v_4/4.3.0#/seasons/getSeasonTypes).
