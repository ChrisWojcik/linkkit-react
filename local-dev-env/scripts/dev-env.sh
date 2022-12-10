#!/bin/bash

source ./local-dev-env/scripts/shared.sh

# docker compose for local dev
function docker_start {
  docker compose \
    -p linkkit-react \
    -f ./local-dev-env/docker-compose.yml \
    up --build -d
}

function docker_stop {
  docker compose \
    -p linkkit-react \
    -f ./local-dev-env/docker-compose.yml \
    stop
}

function docker_destroy {
  docker compose \
    -p linkkit-react \
    -f ./local-dev-env/docker-compose.yml \
    down -v
}

function docker_psql {
  docker compose \
    -p linkkit-react \
    -f ./local-dev-env/docker-compose.yml \
    exec postgres psql -d ${POSTGRES_DB} -U ${POSTGRES_USER}
}

function docker_redis-cli {
  docker compose \
    -p linkkit-react \
    -f ./local-dev-env/docker-compose.yml \
    exec redis redis-cli
}

case $1 in
  "start")
    docker_start
    ;;
  "stop")
    docker_stop
    ;;
  "destroy")
    docker_destroy
    ;;
  "psql")
    docker_psql
    ;;
  "redis-cli")
    docker_redis-cli
    ;;
  "help")
    print_info "available commands: start, stop, destroy, psql, redis-cli"
    ;;
  *)
    print_error "command not recognized"
    ;;
esac
