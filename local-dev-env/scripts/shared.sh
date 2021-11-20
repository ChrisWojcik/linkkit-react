#!/bin/bash

# print messages to terminal
CYAN="\033[1;36m"
YELLOW="\033[0;33m"
RED="\033[1;31m"
NO_COLOR="\033[0m"

function print_info {
  echo -e "${NO_COLOR}linkkit | ${CYAN}${1}${NO_COLOR}"
}

function print_warning {
  echo -e "${NO_COLOR}linkkit | ${YELLOW}${1}${NO_COLOR}"
}

function print_error {
  echo -e "${NO_COLOR}linkkit | ${RED}${1}${NO_COLOR}"
}

# export all env variables defined for local dev
if [ -f "./api/.env" ]; then
  export $(grep -v '^#' ./api/.env | xargs)
else
  print_error "No .env file found in the './api' folder. Did you forget to copy .env.example?"
  exit 1
fi

