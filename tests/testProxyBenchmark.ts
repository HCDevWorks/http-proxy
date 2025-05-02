import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { config } from '../src/config';

const proxyUrl = `http://${config.auth.username}:${config.auth.password}@localhost:${config.server.port}`;

const httpsAgent = new HttpsProxyAgent(proxyUrl);

const TOTAL_REQUESTS = 10;
const TARGET_URL = 'https://google.com/';

async function makeRequest(index: number) {
  const start = Date.now();

  try {
    const response = await axios.get(TARGET_URL, {
      httpsAgent,
      timeout: 10000,
    });

    const duration = Date.now() - start;
    console.log(`[SUCCESS] Request #${index} | Status: ${response.status} | Time: ${duration}ms`);
  } catch (error) {
    const duration = Date.now() - start;
    console.error(`[ERROR] Request #${index} | Time: ${duration}ms`);
    if (axios.isAxiosError(error)) {
      console.error(`Reason: ${error.message}`);
    }
  }
}

async function runBenchmark() {
  console.log(`[INFO] Starting proxy benchmark through: ${proxyUrl}`);
  for (let i = 1; i <= TOTAL_REQUESTS; i++) {
    await makeRequest(i);
  }
  console.log('[INFO] Benchmark finished.');
}

runBenchmark();