const { Worker } = require('worker_threads');

const NPUB_OFFSET = "npub1".length;
const NUM_WORKERS = process.env.NUM_WORKERS || 2;
const FIND = process.env.FIND || "0000";

process.stdout.write(`Workers: ${NUM_WORKERS}\r\n`);
process.stdout.write(`Goal: "${FIND}"\r\n`);

let index = 1;
let workers = [];
let attempts = 0;
let startTime = new Date();

const run = () => {
  process.stdout.write(`Finding through index: ${index}\r\n`)
  for (let i = 0; i < NUM_WORKERS; i++) {
    workers.push(
      new Worker('./process.js', { workerData: { index, searchString: FIND }})
    );
  }

  for (const worker of workers) {
    provisionWorker(worker);
  }
}

function provisionWorker (worker) {
  worker.on('message', (data) => {
    report(data)

    if (!data.loopStart) {
      for (worker of workers) {
        worker.terminate();
      }
      workers = [];
      index++;
      run();
    }
  });
}

function report (data) {
  if (data.loopStart) {
    attempts++
  } else {
    const now = new Date();
    process.stdout.write(
      `\rIndex ${index} completed at ${now.toISOString()}:\r\nnpub: ${data.npub}\r\npublic: ${data.pk}\r\nsecret: ${data.sk}\r\n\n`
    );
    
    if (data.npub.indexOf(FIND) === NPUB_OFFSET) {
      clearInterval(interval);
      process.stdout.write(`Total attempts: ${attempts}\r\n`);
      process.stdout.write(`Total time: ${(now.getTime() - startTime.getTime())/1000}s\r\n`);
      process.exit();
    }
  }
}

run();

const interval = new setInterval(() => {
  const timeDiff = (new Date().getTime() - startTime.getTime()) / 1000;
  process.stdout.write((`Total attempts: ${attempts} at ${(attempts / timeDiff).toFixed(2)}/s\r`));
}, 1000);
