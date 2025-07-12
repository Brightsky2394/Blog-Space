let blogContainer = document.getElementById('blog-container');
let postsArr = [];

const renderPosts = () => {
    let html = '';
        postsArr.forEach(post => {
            html += `
              <h1>${post.title}</h1>
              <p>${post.body}</p>
              <hr/>
            `
        });
        blogContainer.innerHTML = html
}

const getData = async () => {
    const url = 'https://apis.scrimba.com/jsonplaceholder/posts';
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error(`Response status: ${resp.status}`);
        }
        const data = await resp.json();
        console.log(data);
        
        postsArr = data.splice(0, 5);
        renderPosts();
    } catch (err) {
        console.log(err.message)
    }
}

getData();


const formData = document.getElementById('form-data');

formData.addEventListener('submit', e => {
    e.preventDefault();
    const titleText = document.getElementById('title').value;
    const messageText = document.getElementById('message').value;
    const newDataObj = {
         title: `${titleText}`,
         body: `${messageText}`
    }
   const options = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        title: `${titleText}`,
        body: `${messageText}`
    }),
    
}
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
      .then(resp => resp.json())
      .then(data => {
         console.log(data);
         postsArr.unshift(data)
         renderPosts();
         formData.reset();
      })
       
})