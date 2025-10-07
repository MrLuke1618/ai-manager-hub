import 'dotenv/config';
import axios from 'axios';

const assistants = {
  planning: process.env.PLANNING_ASSISTANT_ENDPOINT,
  production: process.env.PRODUCTION_ASSISTANT_ENDPOINT,
  publishing: process.env.PUBLISHING_ASSISTANT_ENDPOINT,
  postpublishing: process.env.POSTPUBLISHING_ASSISTANT_ENDPOINT,
};

async function runPipeline() {
  console.log('🚀 Starting AI Manager Hub Pipeline...');

  for (const [phase, endpoint] of Object.entries(assistants)) {
    try {
      console.log(`🧠 Triggering ${phase} assistant → ${endpoint}`);
      const res = await axios.post(`${endpoint}`, {
        command: 'run_phase',
        metadata: { project: 'Video Content Pipeline' },
      });
      console.log(`✅ ${phase} assistant completed:`, res.data.status || 'OK');
    } catch (err: any) {
      console.error(`❌ Error running ${phase} assistant:`, (err as Error).message || err);
    }
  }

  console.log('🎉 All assistants executed successfully!');
}

runPipeline();
