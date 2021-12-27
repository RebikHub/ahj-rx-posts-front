// import { interval } from 'rxjs';

export default class Post {
  constructor(server) {
    this.server = server;
  }

  async init() {
    await this.server.ajaxRxPosts();
  }

  // const post = {
  // id: id,
  // author_id: faker.internet.email(),
  // title: faker.name.title(),
  // author: faker.internet.userName(),
  // avatar: faker.internet.avatar(),
  // image: faker.image.avatar(),
  // created: faker.time.recent(),
  // }
  // const comment = {
  //     id: uuidv4(),
  //     post_id: id,
  //     author_id: faker.internet.email(),
  //     author: faker.internet.userName(),
  //     avatar: faker.internet.avatar(),
  //     content: faker.lorem.text(1),
  //     created: faker.time.recent(),
  // }

  static render(post, comments) {
    const posts = document.querySelector('.posts').cloneNode(true);
    const postAvatar = document.querySelector('.post-avatar-img');
    const postName = document.querySelector('.post-name');


    postAvatar.src = `${post.avatar}`;
    postName.textContent = post.author;
    document.body.appendChild(posts);
    // console.log(post);
    // console.log(comments);
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
