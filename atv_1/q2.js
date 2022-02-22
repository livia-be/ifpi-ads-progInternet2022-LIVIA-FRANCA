var axios = require("axios")
var meu_url = "http://www.ifpi.edu.br"

function getStatus(url) {
    axios.get(url).then(function (resp) {
        console.log("Status code: ", resp.status)
    })
}

function getLength(url) {
    axios.get(url).then(function (resp) {
        console.log("Length: ", resp.headers['content-length'])
    })
}

function getBody(url) {
    axios.get(url).then(function (resp) {
        console.log("Corpo: ", resp)
    })
}

getBody(meu_url)
getStatus(meu_url)
getLength(meu_url)

