import Post from './posts';
import Server from './server';

console.log('app started');

const server = new Server();
const post = new Post(server);

post.init();
