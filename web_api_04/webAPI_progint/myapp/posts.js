function compare(a, b) {
    if (a.data < b.data) {
        return -1;
    }
    if (a.data > b.data) {
        return 1;
    }
    return 0;
}

const loadPosts = async () => {
    const response = await fetch('http://localhost:3000/Posts');
    var posts = await response.json();

    posts.sort(compare);
    posts.reverse();

    posts.forEach(post => {
        appendPost(post);
    });


}

appendPost = (post) => {
    const template = document.getElementById('post-template');
    const postElement = document.importNode(template.content, true);
    const postItens = postElement.querySelectorAll('p');
    postItens[0].innerText = post.text;
    postItens[1].innerText = post.likes + " like(s)";
    postItens[2].innerText = 'Data: ' + post.data;
    document.getElementById('timeline').append(postElement);
}

const addPost = async () => {
    const newPost = {
        "text": document.getElementById('post-text').value,
        "likes": 0
    }
    const config = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
    }
    let response = await fetch('http://localhost:3000/Posts', config).then(res => res.text()).then(text => console.log(text));
    response = await fetch('http://localhost:3000/Posts');
    const posts = response.json();
    appendPost(posts);
    loadPosts();
    document.location.reload(true);
}

window.onload = () => {
    var addNovoPost = document.getElementById('add-post');
    addNovoPost.addEventListener('click', addPost);
    loadPosts();
}