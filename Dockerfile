FROM node:gallium

########### System

ARG workdir=/opt/jester

WORKDIR $workdir

USER root
RUN apt-get -y update \
	&& apt-get -y upgrade \
	&& apt-get -y install \
		less \
		nano \
		curl \
		jq

########### Node

ARG node_env=development
ARG node_home_path=/home/node
ARG npm_global_path=$node_home_path/.npm-global

ENV NODE_ENV=$node_env

USER node
COPY ./bash_aliases $node_home_path/.bash_aliases
RUN mkdir $npm_global_path \
	&& npm config set prefix $npm_global_path \
	&& npm install npm@latest --global
