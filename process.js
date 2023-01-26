const { workerData, parentPort } = require('worker_threads');
const NostrTools = require("nostr-tools");

const NPUB_OFFSET = "npub1".length;

const process = ({ index, searchString }) => {
  const findSubstr = searchString.substring(0, index);

  while (true) {
    parentPort.postMessage({ loopStart: true });
    sk = NostrTools.generatePrivateKey();
    pk = NostrTools.getPublicKey(sk);
  
    const npub = NostrTools.nip19.npubEncode(pk);
  
    if (npub.indexOf(findSubstr) === NPUB_OFFSET) {
      parentPort.postMessage({ npub, pk, sk });
      break;
    }
  }
}

process(workerData);
