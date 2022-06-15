var admin = require("./node_modules/firebase-admin");

var serviceAccount = require("./keys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore()


var currentdate = new Date();
var data_atual = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

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
        db.collection('posts').add({
            //new Post(id, text, likes
            id: uuidv4(),
            text: text,
            likes: likes,
            data: data_atual
        });
    }

    // db.collection('posts').add({
    //      text : "nova postagem via node ",
    //    likes: 3
    //  });

    // retrieve: recebe um id por parâmetro, pesquisana coleção por esse id e o retorna, caso seja encontrado
    async retrieve(id_procurando) {
        const postsRef = db.collection('posts').doc(id_procurando);
        const doc = await postsRef.get();
        if (!doc.exists) {
            console.log('No such document!');
        } else {
            return doc.data();
        }
    }

    // update: recebe um post, pesquisa se ele já existe, e o substitui caso encontrado
    async update(id_procurando, novo_text, novo_likes) {
        await db.collection('posts').doc(id_procurando).update({
            text: novo_text,
            likes: novo_likes,
            data: data_atual
        });
    }

    // delete: recebe um id como parâmetro, faz uma pesquisa e caso encontre o post com o id na coleção, exclui
    delete(id_procurando) {
        db.collection('posts').doc(id_procurando).delete().catch((error) => {
            return -1;
        });
        return 1;
    }

    // retrieveAll: retorna todos os itens da coleção
    async retrieveAll() {
        const postsRef = db.collection('posts');
        const snapshot = await postsRef.orderBy('data').get();
        const posts = [];
        snapshot.forEach(doc => {
            posts.push(doc.data());
        });
        return posts.reverse()
    }

};

module.exports = Microblog