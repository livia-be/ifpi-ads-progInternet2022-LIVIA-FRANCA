

const { response } = require('express');
const Microblog = require('./classes.js');
const { request: req } = require('express');
const express = require('express');
const res = require('express/lib/response');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static('public'));

const router = express.Router();
//Rotas

const port = 3000
app.listen(port, () => {
        console.log(`Aplicação escutando na porta ${port}`)
})


let mb = new Microblog()

app.get('/posts', async (req, res) => {
        mensagem = await mb.retrieveAll()
        res.json(mensagem)
});

app.get('/posts/:id', async (req, res) => {
        id = req.params.id
        mensagem = await mb.retrieve(id)
        if (mensagem == -1) { res.status(404).send('Não encontrado'); }
        res.json(mensagem)
});

app.get('/posts/page/:n', async (req, res) => {
        number = req.params.n
        number = (number * 10) - 9

        const snapshot = await db.collection('posts').orderBy('data').startAt(number).limit(10).get();

        const posts = [];
        snapshot.forEach(doc => {
            posts.push(doc.data());
        });
        
        mensagem = posts.reverse();
        res.json(mensagem)
});

app.delete('/posts/:id', async function (req, res) {
        id = req.params.id
        mensagem = mb.delete(id)
        if (mensagem != -1) {
                // faz um get de todos os posts pra mostrar o que mudou
                mensagem = await mb.retrieveAll()
                res.json(mensagem)
        }
        else if (mensagem == -1) { res.status(404).send('Não encontrado'); }
});

app.post('/posts', (req, res) => {
        var post = {

                'text': req.body.text,

        }
        mb.add_post(post['id'], post['text'], 0)
        res.status(201).send('Post foi criado.');
});

app.put('/posts/:id', async (req, res) => {
        id = req.params.id
        mensagem = await mb.retrieve(id)

        if (mensagem == -1) { res.status(404).send('Não encontrado'); }

        mensagem['text'] = req.body.text
        mensagem['likes'] = req.body.likes

        mb.update(id, mensagem['text'], mensagem['likes'])
        res.status(200).send('Post alterado');
});

app.patch('/posts/:id', (req, res) => {
        id = req.params.id
        mensagem = mb.retrieve(id)

        if (mensagem == -1) { res.status(404).send('Não encontrado'); }


        mensagem['text'] = req.body.text


        mb.update(mensagem['id'], mensagem['text'], mensagem['likes'])
        res.status(200).send('Patch executado com sucesso');
});

app.patch('/posts/:id/like', async (req, res) => {
        id = req.params.id
        mensagem = await mb.retrieve(id)

        if (mensagem == -1) { res.status(404).send('Não encontrado'); }

        mensagem['likes'] = req.body.likes

        mb.update(id, mensagem['text'], mensagem['likes'])
        res.status(200).send('Patch executado com sucesso');
});




