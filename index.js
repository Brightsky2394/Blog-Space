const getData = async () => {
    const url = 'https://apis.scrimba.com/jsonplaceholder/posts';
    try {
        const resp = await fetch(url);
        if (!resp.ok) {
            throw new Error(`Response status: ${resp.status}`);
        }
        const data = await resp.json();
        console.log(data);
        let html = '';
        const postsArr = data.splice(0, 5);
        postsArr.forEach(post => {
            html += `
              <h1>${post.title}</h1>
              <p>${post.body}</p>
              <hr/>
            `
        });
        document.getElementById('blog-container').innerHTML = html;
    } catch (err) {
        console.log(err.message)
    }
}

getData();