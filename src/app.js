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
    const {tweet} = req.body;
    const {username} = req.headers;
    if (!username || !tweet){
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }
    const UserAlreadyExists = ArrayUser.find ((user)=> user.username === username);

    if (!UserAlreadyExists){
        res.status(401).send("Usuário não cadastrado!")
        return
    }
    if (typeof tweet !== "string"){
        res.status(400).send("Formato para tweet inválido")
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