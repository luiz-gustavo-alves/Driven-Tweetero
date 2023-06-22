import express from "express";
import cors from "cors";

const PORT = 5000;

const users = [];
const tweets = [];

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    if ((!username || !avatar) || (typeof username !== "string") || (typeof avatar !== "string")) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    users.unshift({
        username: username,
        avatar: avatar
    });

    return res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {

    const username = req.headers.user;
    const { tweet } = req.body;

    const isUserAuth = () => {

        const user = users.find((user) => user.username === username);
        return (typeof(user) !== "undefined");
    }

    if (!isUserAuth()) {
        return res.status(401).send("UNAUTHORIZED");
    }
    
    if ((!username || !tweet)  || (typeof username !== "string") || (typeof tweet !== "string")) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    tweets.unshift({
        username: username,
        tweet: tweet
    })

    return res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {

    let { page } = req.query;
    page = Number(page);

    if (page < 1) {
        return res.status(400).send("Informe uma página válida!");
    }

    if (!page) {
        page = 1;
    }

    const tweetsPagination = (page) => {

        if (page === 1) {

            if (tweets.length < 10) {
                return tweets.slice(0, tweets.length);

            } else {
                return tweets.slice(0, 10);
            }

        } else {

            const start = 10 * (page - 1);
            const end = 10 + start;
            return tweets.slice(start, end);
        }
    }

    const latestTweets = tweetsPagination(page);
    const listOfTweets = latestTweets.map(latestTweet => {

        const user = users.find((user) => (user.username === latestTweet.username));

        const username = latestTweet.username;
        const tweet = latestTweet.tweet;
        const avatar = user.avatar;

        return {
            username: username,
            tweet: tweet,
            avatar: avatar
        };
    })

    return res.status(200).send(listOfTweets);
})

app.get("/tweets/:username", (req, res) => {

    const username = req.params.username;
    const user = users.find((user) => (user.username === username));

    const listOfTweets = [];
    tweets.forEach(tweet => {

        if (tweet.username === username) {

            const avatar = user.avatar;
    
            listOfTweets.push({
                username: username,
                tweet: tweet.tweet,
                avatar: avatar
            });
        }
    })

    return res.status(200).send(listOfTweets);
})

app.listen(PORT);