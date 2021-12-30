import { ajax } from 'rxjs/ajax';
import { map, take, reduce } from 'rxjs/operators';
import { from } from 'rxjs';
import Post from './posts';

export default class Server {
  constructor() {
    this.url = 'https://ahj-rx-posts.herokuapp.com/posts/';
  }

  ajaxRxPosts() {
    ajax.getJSON(`${this.url}?posts=latest`).subscribe({
      next: (posts) => {
        from(posts).pipe(
          take(10),
          map((item) => {
            ajax.getJSON(`${this.url}?post_id=${item.id}`).subscribe({
              next: (comments) => {
                from(comments).pipe(
                  take(3),
                  reduce((acc, cur) => [...acc, cur], []),
                ).subscribe((comm) => Post.renderPost(item, comm));
              },
              complete: () => console.log('complete comments'),
            });
          }),
        ).subscribe({
          complete: () => console.log('complete posts'),
        });
      },
      complete: () => console.log('complete request'),
    });
  }
}
