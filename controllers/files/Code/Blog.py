from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)

# Наша "база данных"
posts = []

@app.route('/')
def index():
    return render_template('index.html', posts=posts)

@app.route('/post/<int:post_id>')
def post(post_id):
    post = posts[post_id]
    return render_template('post.html', post=post, post_id=post_id)

@app.route('/create', methods=('GET', 'POST'))
def create():
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        posts.append({'title': title, 'content': content})
        return redirect(url_for('index'))

    return render_template('create.html')

@app.route('/edit/<int:post_id>', methods=('GET', 'POST'))
def edit(post_id):
    post = posts[post_id]

    if request.method == 'POST':
        post['title'] = request.form['title']
        post['content'] = request.form['content']
        return redirect(url_for('post', post_id=post_id))

    return render_template('edit.html', post=post)

@app.route('/delete/<int:post_id>', methods=('POST',))
def delete(post_id):
    del posts[post_id]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
