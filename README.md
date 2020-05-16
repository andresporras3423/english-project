# english-project

This project contains a list of useful resources to improve your english. It was thought for people with a a2 level or above.

## Usage

1) create an account
2) add new words
3) practice words with tests
4) check the video tutorials
5) add links for grammar topics
6) filter words

![screenshot](/images/screenshot.png)

# What it does

- First of all, login signup with name, email, password and password confirmation
- Once you are logged you will find different resources in each tab. 
* WORDS TAB:
![screenshot](/images/words.png)
- here you can add a word and it's translation
- you can edit, delete and watch each word
- you can filter words with "search button"
* TESTS TAB:
![screenshot](/images/tests.png)
- practice your memory of the words
- choose a number of questions
- select the right translation between 4 options
* HISTORY TAB:
![screenshot](/images/history.png)
- you can see the list of your tests
- you can see total of tests, total of questions and average score
* VIDEOS:
![screenshot](/images/videos.png)
- check a list of video from "perfectly spoken" website
- you have a total of 60 videos
- for now this videos are just for the B2 level course

## Built With

- Ruby
- Telegrem API [Link](https://core.telegram.org/bots/api)
- Geocoder API [Link](http://www.rubygeocoder.com/)
- Openweather2 [Link](https://openweathermap.org/)

#### and deployed to GitHub

## How to use this bot
- You need a account in telegram
- On telegram look for weather3423_bot and type **/start** to begin (or click in [Live Demo](https://web.telegram.org/#/im?p=@weather3423_bot))

## Bot Tutorial
- Type **/tutorial** for the tutorial with all the commands you can use to communicate with the bot
* **Miami**
* Get temperature of miami
* **coord:  4.5 74.25**
* Get temperature of place with latitude 4.5 and longitude 74.25
* **zip:  33101**
* Get temperature of place with zip code 33101
* **/format c**
* Use celsius format, the other options are f (farenheit) and k (kelvin)
* **/interval 10m**
* updates of temperature every 10 minutes,
* the other options are s (seconds), h (hour), d (days)
* **/no_more**
* Stop automatic updates of the temperature

## How to create a bot in Telegram

1) look for user botfather in telegram, this is the bot that control all the bots
2) type /start to request a bot
3) type name of your bot
4) save the token botfather will give you because you will need that token to control your bot
5) run **gem install telegram-bot-ruby**  and add **require "telegram/bot"** in your project
6) try something like this

![screenshot](./example.png)

In the image example the bot answer "hello name-of-the-user" if user type hello, otherwise it send the message "I dont know what are you saying"

## How to clone this project

In order to clone this project you will need
1) Have installed ruby in our computer
2) Create a bot in telegram and save the token
3) Create an account in openweathermap and request a key
4) make the installation of the next gems:
* gem install telegram-bot-ruby
* gem install openweather2
* gem install geocoder
5) Download this project
6) In bin/main.rb replace current telegram token and openweather key for your own telegram token and weather key
7) In the terminal, go to the bin folder of this project and run "ruby main.rb"
8) You can also run tests of the project with "rspec" command (run command inside the folder project), but you need to have install rspec program

## Running tests

To run the automated tests, type "rspec" command from the terminal end press enter. You must be inside the project folder.

## Planned Features

https://github.com/andresporras3423/weather-bot-ruby/issues

## Live Demo

[Live Demo](https://web.telegram.org/#/im?p=@weather3423_bot)

## Project Presentation (VIDEO)

[![Project presentation](./video-screenshot.png)](https://www.loom.com/share/6a5bd2ea817a439f958324f69bdd58bc)

[Project Presentation](https://www.loom.com/share/6a5bd2ea817a439f958324f69bdd58bc)


## Authors

**Oscar Russi**
- Github: [@andresporras3423](https://github.com/andresporras3423/)
- Linkedin: [Oscar Russi](https://www.linkedin.com/in/oscar-andres-russi-porras/)
- Twitter: [@OscarRussi1](https://twitter.com/OscarRussi1)

## 🤝 Contributing

This is a project for educational purposes only. We are not accepting contributions.

## Attributions and Credit

Special thanks to Microverse, for this learning opportunity. 

## Show your support

Give a ⭐️ if you like this project!

## Enjoy!
