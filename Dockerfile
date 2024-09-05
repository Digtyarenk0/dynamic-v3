
FROM node:18-bookworm

RUN apt update && \
    apt install python3 gcc make build-essential git -y

# # Adding env variables
# Limit memory
ENV MAX_OLD_SPACE_SIZE=3000
ENV NODE_OPTIONS="--max-old-space-size=3000"
# Copying files
COPY . .

# Install the lerna feature
RUN yarn global add serve less less-watch-compiler

# Install packages
RUN yarn install --ignore-engines

# Build the project
RUN yarn run i18n:extract
RUN yarn run i18n:compile
RUN yarn build

EXPOSE 5000
CMD [ "serve", "-s", "build" ]
