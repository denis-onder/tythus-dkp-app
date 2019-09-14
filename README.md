# Tythus, the Guild/DKP management app!

[![Build Status](https://travis-ci.org/denis-onder/tythus-dkp-app.svg?branch=master)](https://travis-ci.org/denis-onder/tythus-dkp-app)

### Requirements

- Node.js

- TypeScript

- Docker

- Docker-compose


### Scripts

---

> Scripts are located in the _./scripts_ directory

- `install_dependencies.sh` - Installs all the necessary dependencies for each service.

- `build.sh` - Builds out the Docker images using docker-compose.

- `run.sh` - Runs the Docker images using docker-compose.

- `start_<auth/gateway/guild>.sh` - Compiles the TypeScript code and runs the service.

- `start_<auth/gateway/guild>_dev.sh` - Runs the uncompiled, TypeScript code.

---
