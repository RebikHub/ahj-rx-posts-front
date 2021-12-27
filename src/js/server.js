import { ajax } from 'rxjs/ajax';
import Post from './posts';
// import { map } from 'rxjs/operators';

export default class Server {
  constructor() {
    this.url = 'http://localhost:3333/posts/';
    this.post = null;
    this.comments = null;
  }

  ajaxRxPosts() {
    const obs$ = ajax.getJSON(`${this.url}?posts=latest`);
    const sub = obs$.subscribe((data) => {
      data.forEach((item) => {
        const commentsPost = ajax.getJSON(`${this.url}?post_id=${item.id}`);
        const subComm = commentsPost.subscribe((comm) => {
          // console.log(item);
          // console.log(comm);
          Post.render(item, comm);
        });
        setTimeout(() => subComm.unsubscribe(), 2000);
      });
    });

    setTimeout(() => sub.unsubscribe(), 5000);
  }
}
