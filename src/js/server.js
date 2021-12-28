import { ajax } from 'rxjs/ajax';
import { map, take } from 'rxjs/operators';
import { from } from 'rxjs';
import Post from './posts';

export default class Server {
  constructor() {
    this.url = 'https://ahj-rx-posts.herokuapp.com/posts/';
  }

  // ajaxRxPosts() {
  //   ajax.getJSON(`${this.url}?posts=latest`)
  //     .subscribe((data) => {
  //       data.forEach((item) => {
  //         ajax.getJSON(`${this.url}?post_id=${item.id}`)
  //           .subscribe((comm) => {
  //             Post.renderPost(item, comm);
  //           });
  //       });
  //     });
  // }

  ajaxRxPosts() {
    ajax.getJSON(`${this.url}?posts=latest`).subscribe({
      next: (posts) => {
        const lastPosts = posts.slice(posts.length - 10, posts.length);
        from(lastPosts).pipe(
          take(10),
          map((item) => {
            ajax.getJSON(`${this.url}?post_id=${item.id}`).subscribe({
              next: (comments) => {
                const commentArray = [];
                const lastComments = comments.slice(comments.length - 10, comments.length);
                from(lastComments).pipe(
                  take(3),
                ).subscribe((comm) => commentArray.push(comm));
                Post.renderPost(item, commentArray);
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
