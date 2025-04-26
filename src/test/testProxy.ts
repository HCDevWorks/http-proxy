import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { config } from '../config/config';

const proxyUrl = `http://${config.proxyUsername}:${config.proxyPassword}@localhost:${config.port}`;

const httpsAgent = new HttpsProxyAgent(proxyUrl);

async function testProxy() {
  try {
    console.log(`[INFO] Testing proxy connection through: ${proxyUrl}`);

    const response = await axios.get('https://discord.com/', {
      httpsAgent,
      timeout: 10000,
    });

    console.log('[SUCCESS] Connection successful!');
    console.log(`[STATUS] Response code: ${response.status}`);
  } catch (error) {
    console.error('[ERROR] Connection failed.');
    if (axios.isAxiosError(error)) {
      console.error(`Message: ${error.message}`);
      if (error.response) {
        console.error(`Status code: ${error.response.status}`);
      }
    } else {
      console.error(error);
    }
  }
}

testProxy();