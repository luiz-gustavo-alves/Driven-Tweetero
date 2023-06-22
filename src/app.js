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

    if (!username || !avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!.");
    }

    users.push({
        username: username,
        avatar: avatar
    });

    return res.status(201).send("OK");
})

app.post("/tweets", (req, res) => {

    const { username, tweet } = req.body;

    const isUserAuth = () => {

        const user = users.find((user) => user.username === username);    
        return (typeof(user) !== "undefined") ? true : false;
    }

    if (!isUserAuth()) {
        return res.status(401).send("UNAUTHORIZED");
    }
    
    if (!username || !tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!.");
    }

    tweets.push({
        username: username,
        tweet: tweet
    })

    return res.status(201).send("OK");
})

app.get("/tweets", (req, res) => {

    const latestTweets = tweets.slice(-10);
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

app.listen(PORT);