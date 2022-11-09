# Boombox

My personal playlist manager. It's open source (GPL-3, don't try anything funny), but please don't rebrand it or claim it as your own.

To quote myself, as per the text on the homepage of the website:

> This is my eclectic music playlist. I enjoy listening to music a lot, so I created a playlist page on my website. As time went on, I started running into problems, like the deletion of videos, the inability to fix them with great ease, and managing the mess that resulted from my first foray into both React and planned out web design. I’ve been meaning to craft a separate music-centric website for a while, and inspired by the likes of osu!, Paco, and Celeste, this is the result.

## Notes

- When adding the authors of a song, type their names separated by "`, `"
- Boombox uses [Logto](https://logto.io) for authentication and [Maloja](https://github.com/krateng/maloja) for scrobbling
- Larger thumnails won't upload due to a 3MB Next.js API route limit, as downsizing the image on the frontend isn't implemented yet

## Running

Boombox can be run as a Next.js app, or under Docker. Pick your poison.

### Next.js

1. Install Node.js and Yarn and clone the repo.
2. Set up instances of Logto and Maloja.
3. Copy `.env.example` to `.env`, and fill in the values as instructed.
4. Make sure you add a redirect URI in Logto (`<URL to Boombox>/api/logto/sign-in-callback`).
5. Run the following commands in a terminal in this directory to start it:
    ```sh
	# Install dependencies
	yarn
    # Build the Next.js app
    yarn build
    # Run the Next.js server
    yarn start
    ```

### Docker

The Docker Compose configuration will run Boombox itself, as well as Maloja with Logto and Maloja.

1. Install Docker and clone the repo.
2. Copy `docker-compose.example.yml` to `docker-compose.yml`, and change the environment variables that you currently can, like the domain-related ones.
3. Run the following commands in a terminal in this directory to start it:
	```sh
	# Start the Docker containers.
	docker compose up
	```
4. Go to Logto and Maloja and update the `docker-compose.yml` file with the proper environment variables, then stop the the containers (CTRL+C). Make sure you add a redirect URI in Logto (`<URL to Boombox>/api/logto/sign-in-callback`).
5. Start them again by using the same command. You can append the `-d` flag to have it run in the background this time.

## Developing

Follow the instructions for running on Next.js, but instead of running `yarn build` and `yarn start`, run `yarn dev`.
