import express from "express";
import cors from "cors";

const Server = express();
const PORT = 5000;


Server.use(cors());
Server.use(express.json());

const ArrayUser = []
const ArrayTweets = [] 


Server.post("/sign-up", (req, res)=> {
    const {username, avatar} = req.body

    if (!username || !avatar ){
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }

    if (typeof username !== "string"|| typeof avatar !== "string"){
        res.status(400).send("Usuário ou Avatar inválidos")
        return
    }

    const userdata = {
        username,
        avatar
    }

    ArrayUser.push(userdata)
    res.status(201).send({message: "OK"})

})

Server.post("/tweets", (req, res)=> {
    const {username, tweet} = req.body;
    if (!username || !tweet){
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }
    const UserAlreadyExists = ArrayUser.find ((user)=> user.username === username);

    if (!UserAlreadyExists){
        res.status(401).send("Usuário não foi cadastrado!")
        return
    }
    ArrayTweets.push({ username, tweet })
    res.status(201).send({message: "OK"})
});

Server.get("/tweets",(req,res)=>{
    ArrayTweets.forEach((tweet)=>{
        const { avatar } = ArrayUser.find((user) => user.username === tweet.username )
        tweet.avatar = avatar;
    })
    res.status(200).send(ArrayTweets.slice(-10).reverse());
});

Server.listen(PORT, console.log(`Servidor rodando na Porta: ${PORT}`));