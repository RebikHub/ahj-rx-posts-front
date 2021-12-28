export default class Post {
  constructor(server) {
    this.server = server;
  }

  async init() {
    await this.server.ajaxRxPosts();
  }

  static renderPost(post, comments) {
    const postAvatar = document.querySelector('.post-avatar-img');
    const postName = document.querySelector('.post-name');
    const postTime = document.querySelector('.post-time');
    const postImage = document.querySelector('.post-img');

    postAvatar.src = post.avatar;
    postName.textContent = post.author;
    postTime.textContent = Post.getDate(post.created);
    postImage.src = post.image;

    const posts = document.querySelector('.posts').cloneNode(true);
    document.body.appendChild(posts);
    posts.classList.remove('none');

    for (const i of comments) {
      Post.renderComments(i, posts);
    }
  }

  static renderComments(comment, posts) {
    const commentName = document.querySelector('.comment-name');
    const commentAvatar = document.querySelector('.comment-avatar-img');
    const commentText = document.querySelector('.comment-text');
    const commentTime = document.querySelector('.comment-time');

    commentName.textContent = comment.author;
    commentAvatar.src = comment.avatar;
    commentText.textContent = comment.content;
    commentTime.textContent = Post.getDate(comment.created);

    const comments = document.querySelector('.comment').cloneNode(true);
    posts.querySelector('.comments-list').appendChild(comments);
    comments.classList.remove('none');
  }

  static getDate(time) {
    const year = new Date(time).getFullYear();
    let month = new Date(time).getMonth() + 1;
    let day = new Date(time).getDate();
    let hours = new Date(time).getHours();
    let minute = new Date(time).getMinutes();

    if (String(month).length === 1) {
      month = `0${month}`;
    }
    if (String(day).length === 1) {
      day = `0${day}`;
    }
    if (String(minute).length === 1) {
      minute = `0${minute}`;
    }
    if (String(hours).length === 1) {
      hours = `0${hours}`;
    }
    return `${hours}:${minute} ${day}.${month}.${String(year).slice(2)}`;
  }
}
