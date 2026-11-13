import { injectSpeedInsights } from '@vercel/speed-insights';

if (location.hostname && !['localhost', '127.0.0.1'].includes(location.hostname)) {
  injectSpeedInsights();
}
