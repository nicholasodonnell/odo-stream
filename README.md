<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/banner-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="assets/banner-light.png">
  <img src="assets/banner-light.png">
</picture>

ODO Stream is a web-based live stream player powered by [Restreamer](https://datarhei.github.io/restreamer/) for streaming live `H.264` video to multiple devices. Features include:
- **Proxy Support** - Proxy HLS playlist and segments to keep your restreamer server private
- **Stream Authentication** - Generate signed tokens to validate stream access
- **CORS support** - Prevent your stream from being embedded on other sites
- **Stream Status** - View stream status and statistics (cooming soon)

[![CD](https://github.com/nicholasodonnell/odo-stream/actions/workflows/cd.yml/badge.svg)](https://github.com/nicholasodonnell/odo-stream/actions/workflows/cd.yml)

## Getting Started

1. Create a `.env` file using [`.env.example`](.env.example) as a reference:
  ```console
  cp -n .env{.example,}
  ```
2. Start the collection:
  ```console
  docker-compose up -d
  ```
3. Visit `http://[address]:3000` to access the frontend
4. Visit `http://[address]:8080` to access the backend

## ENV Options

| Option           | Description                                                                                                             | Default                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `TZ`             | Timezone set to the [TZ database name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) of your time zone. | `UTC`                    |
| `RS_URL`         | Restreamer URL (used for proxing HLS segments and fetching stream status).                                              | `http://restreamer:8080` |
| `RS_USERNAME`    | Username for the Restreamer backend.                                                                                    | &nbsp;                   |
| `RS_PASSWORD`    | Password for the Restreamer backend.                                                                                    | &nbsp;                   |
| `SIGNING_SECRET` | Secret used to sign stream tokens (used to validate stream access).                                                     | *random uuid*            |

See [Restreamer API Docs](https://datarhei.github.io/restreamer/docs/references-environment-vars.html) for more options.

## Development

Create a `docker-compose.override.yml` file using [`docker-compose.override.development.yml`](docker-compose.override.development.yml) as a reference:

```console
cp -n docker-compose.override{.development,}.yml
```
