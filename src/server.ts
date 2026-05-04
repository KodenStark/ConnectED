import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

app.get('/api/events', async (req, res) => {
  const endsAfterParam = req.query['endsAfter'];
  const takeParam = req.query['take'];
  const statusParam = req.query['status'];
  const queryParam = req.query['query'];

  const endsAfter =
    typeof endsAfterParam === 'string' && endsAfterParam.length > 0
      ? endsAfterParam
      : new Date().toISOString();
  const take = typeof takeParam === 'string' && takeParam.length > 0 ? takeParam : '15';
  const status = typeof statusParam === 'string' && statusParam.length > 0 ? statusParam : 'Approved';
  const query = typeof queryParam === 'string' ? queryParam : '';

  const params = new URLSearchParams({
    endsAfter,
    status,
    take,
    query,
  });

  try {
    const response = await fetch(
      `https://myndsu.ndsu.edu/api/discovery/event/search?${params.toString()}`,
    );

    if (!response.ok) {
      res.status(response.status).json({ error: 'Failed to fetch events.' });
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch {
    res.status(502).json({ error: 'Unable to reach upstream events service.' });
  }
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
