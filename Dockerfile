FROM postgres:17-bookworm

RUN apt update && apt upgrade -y && apt install pgcli -y
