import express from 'express';
import fetch from 'cross-fetch';
import { createProxyMiddleware } from 'http-proxy-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigFn from '../webpack.config';
import { User } from '@/web/lib/api';

const app = express();

const webpackConfig = webpackConfigFn(null, { mode: 'development' });
const compiler = webpack(webpackConfig);

app.use('/api', createProxyMiddleware({ target: 'http://localhost:3001' }));
app.use('/auth', createProxyMiddleware({ target: 'http://localhost:3001' }));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

app.use(
  webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  })
);

app.get('*', async (req, res, next) => {
  let user: User | null;

  try {
    user = await fetch(`${process.env.BASE_URL}/auth/me`, {
      // forward cookies
      headers: {
        cookie: req.headers.cookie,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  } catch (err) {
    return next(err);
  }

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=" rel="icon" type="image/x-icon" />
        <title>Linkkit</title>
        <link rel="stylesheet" href="/main.css" />
      </head>
      <body>
        <div id="app" tabindex="-1"></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify({
            auth: { isAuthenticated: !!user, user },
          }).replace(/</g, '\\u003c')};
        </script>
        <script src="/main.js"></script>
      </body>
    </html>
  `);
});

app.listen(process.env.WEB_PORT, () => {
  console.log(`server listening on port ${process.env.WEB_PORT}`);
});
