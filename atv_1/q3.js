var axios = require("axios")
let url_api = "https://api.thecatapi.com/v1/images/search"
const fs = require('fs') // file system
const https = require('https')

axios.get(url_api).then(function (response) {
    url_imagem = (response.data[0].url)
    function downloadImage(url_imagem, path) {

        // permite escrever no endereço 'path'
        var localPath = fs.createWriteStream(path)

        // get que 'pega' a imagem pelo link
        var request = https.get(url_imagem, function (response) {
            // salva a imagem no endereço 'localPath'
            response.pipe(localPath) 
        })
    }
    // downloadImage(link, local/nome.png)
    downloadImage(url_imagem, "./downloads/" + Date.now() + ".png") 
})


