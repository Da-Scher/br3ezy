<div align="center"><img width="446" alt="br3ezy_logo_banner" src="https://github.com/Da-Scher/br3ezy/assets/56631681/aa5fa554-0878-4b49-a094-453e85539427"></div>

## Table of Contents

<!--toc:start-->

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Building from Source](#building-from-source)
- [Contributors](#contributors)
- [License](#license)

<!--toc:end-->

## About The Project

Breeezy, stylized br3ezy, is a federated streaming platform that hosts can use to simplify distributed and/or self-hosted streaming to their audience. By self-hosted streaming, these hosts can take sovereignty over their own message without compromising for advertisers. This project will include a killer feature where subletters can sponsor a CDN in their region to propogate better streaming for other viewers, thereby becoming 'heros'.

## Getting Started

### Prerequisites

- [SRT](https://github.com/Haivision/srt) for streaming metrics.
- [ffmpeg](https://ffmpeg.org/download.html) for stream encoding.
- [MySql](https://dev.mysql.com/downloads/mysql/) for database usage.
- [Node.js](https://nodejs.org/en/download/) (v20.11.1 or above) for express server.

### Building from Source

1. Clone the repo. `git clone https://github.com/Da-Scher/br3ezy`
1. Run `npm install` to install dependencies.
1. Run `npm run build` to build static files.
1. Run `npm run start` to start express server.
1. Point your broadcasting software to `srt://<hostname>:2000` to start streaming.
1. Visit `https://<hostname>:8000` to access the web interface.

<!-- CONTRIBUTORS -->

## Contributors

- Joe Barteluce: Client-Side Web Developer/Designer
- Dakota Schaeffer: Media Streaming Developer - Content Delivery Engineer
- Justin Sprecco: System Architect - Cloud Engineer

<!-- LICENSE -->

## License

Distributed under the GPL-2.0 License. See `LICENSE` for more information.
