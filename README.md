# Boombox

My personal playlist manager. It's open source (GPL-3, don't try anything funny), but please don't rebrand it or claim it as your own.

To quote myself, as per the text on the homepage of the website:

> This is my eclectic music playlist. I enjoy listening to music a lot, so I created a playlist page on my website. As time went on, I started running into problems, like the deletion of videos, the inability to fix them with great ease, and managing the mess that resulted from my first foray into both React and planned out web design. I’ve been meaning to craft a separate music-centric website for a while, and inspired by the likes of osu!, Paco, and Celeste, this is the result.

## Notes

- When adding the authors of a song, type their names separated by "`, `"

## Running

Boombox can be run as a Next.js app, or under Docker. Pick your poison.

### Next.js

1. Install Node.js and Yarn.
2. Set up an instance of [Logto](https://logto.io).
3. Copy `.env.example` to `.env`, and fill in the values as instructed.
4. Run the following commands in a terminal in this directory to start it:
    ```sh
	# Install dependencies
	yarn
    # Build the Next.js app
    yarn build
    # Run the Next.js server
    yarn start
    ```

### Docker

1. Install Docker.
2. Copy `docker-compose.example.yml` to `docker-compose.yml`, and change the environment variables. It would also be advised to change the postgres credentials.
3. Run the following commands in a terminal in this directory to start it:
	```sh
	# Start the Docker containers. Add the -d flag to run it in the background
	docker compose up
	```

## Developing

Follow the instructions for running on Next.js, but instead of running `yarn build` and `yarn start`, run `yarn dev`.
