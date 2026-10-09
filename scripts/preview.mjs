import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = 8080;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.png': 'image/png',
};

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const segments = pathname.replaceAll('\\', '/').split('/');
    const path = resolve(root, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`);
    if (!path.startsWith(`${root}${sep}`) || segments.some((segment) => segment.startsWith('.')) || !types[extname(path).toLowerCase()]) {
      response.writeHead(404).end('Not found');
      return;
    }

    const body = await readFile(path);
    response.writeHead(200, {
      'Content-Type': types[extname(path).toLowerCase()],
      'Content-Length': body.length,
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404).end('Not found');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Preview: http://127.0.0.1:${port}/`);
});
