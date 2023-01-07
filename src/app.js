import express from "express";
import cors from "cors";

const Server = express();
const PORT = 5000;

let ArrayUser = []
/* let ArrayTweet = [] */

Server.use(cors());
Server.use(express.json());



Server.post("/sign-up", (req, res)=> {
    const {user, avatar} = req.body

    if (!user || !avatar){
        res.status(400).send("Todos os campos são obrigatórios!");
        return
    }

    const userinfo = {
        user,
        avatar
    }

    ArrayUser.push(userinfo)
    res.status(201).send({message: "OK"});

})

/* Server.post("/tweets", (req, res)=> {
    if (!user || !tweet){
        res.status(400).send("Todos os campos são obrigatórios!");
        return
    }
}) */


Server.listen(PORT, console.log(`Servidor Rodando na porta ${PORT}`))