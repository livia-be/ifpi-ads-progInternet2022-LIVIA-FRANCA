const { v4: uuidv4 } = require('uuid');
let Post = class {
        constructor(id, text, likes) {
                this.id = uuidv4();
                this.text = text;
                this.likes = likes;
        }
};

let Microblog = class {
        constructor() {
                this.Posts = []
        }

        // create: recebe um post e adiciona à coleção
        add_post(id, text, likes) {
                this.Posts.push(new Post(id, text, likes))
        }

        // retrieve: recebe um id por parâmetro, pesquisana coleção por esse id e o retorna, caso seja encontrado
        retrieve(id_procurando) {
                var encontrado = false
                for (let i = 0; i < this.Posts.length; i++) {
                        if (this.Posts[i].id == id_procurando) {
                                encontrado = true
                                return this.Posts[i]
                        }
                }
                if (encontrado == false) { return -1 }
        }

        // update: recebe um post, pesquisa se ele já existe, e o substitui caso encontrado
        update(id_procurando, novo_text, novo_likes) {
                let encontrado = false
                for (let i = 0; i < this.Posts.length; i++) {
                        if (this.Posts[i].id == id_procurando) {
                                this.Posts[i].text = novo_text
                                this.Posts[i].likes = novo_likes
                                encontrado = true
                        }
                }
                if (encontrado == false) { return -1 }
        }

        // delete: recebe um id como parâmetro, faz uma pesquisa e caso encontre o post com o id na coleção, exclui
        delete(id_procurando) {
                let encontrado = false
                for (let i = 0; i < this.Posts.length; i++) {
                        if (this.Posts[i].id == id_procurando) {
                                this.Posts.splice(i, i)
                                encontrado = true
                        }
                }
                if (encontrado == false) { return -1 }
        }

        // retrieveAll: retorna todos os itens da coleção
        retrieveAll() { return this.Posts }

};


const { response } = require('express');
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


mb = new Microblog()

app.get('/posts', (req, res) => {
        mensagem = mb.retrieveAll()
        res.json(mensagem)
});

app.get('/posts/:id', (req, res) => {
        id = req.params.id
        mensagem = mb.retrieve(id)
        if (mensagem == -1) { res.status(404).send('Não encontrado'); }
        res.json(mensagem)
});

app.delete('/posts/:id', function (req, res) {
        id = req.params.id
        mensagem = mb.delete(id)
        if (mensagem != -1) { res.status(204).send('Post deletado'); }
        else if (mensagem == -1) { res.status(404).send('Não encontrado'); }
});

app.post('/posts', (req, res) => {
        var post = {
                
                'text': req.body.text,
                
        }
        mb.add_post(post['id'], post['text'], 0)
        res.status(201).send('Post foi criado.');
});

app.put('/posts/:id', (req, res) => {
        id = req.params.id
        mensagem = mb.retrieve(id)

        if (mensagem == -1) { res.status(404).send('Não encontrado'); }

        mensagem['text'] = req.body.text
        mensagem['likes'] = req.body.likes

        mb.update(mensagem['id'], mensagem['text'], mensagem['likes'])
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

app.patch('/posts/:id/like', (req, res) => {
        id = req.params.id
        mensagem = mb.retrieve(id)

        if (mensagem == -1) { res.status(404).send('Não encontrado'); }

        mensagem['likes'] = req.body.likes

        mb.update(mensagem['id'], mensagem['text'], mensagem['likes'])
        res.status(200).send('Patch executado com sucesso');
});




