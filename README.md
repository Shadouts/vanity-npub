# Vanity nPub
This is a quick and dirty script to mine a vanity npub for nostr.

## Requirements
This was built and used with NodeJS 18.

## Usage
Install packages:
```
[localhost]$ npm i
```

Set some values. `FIND` represents the string you want to mine and `NUM_WORKERS` is the max number of simultaneous mining threads. Make sure that your search string conforms to the [bech32](https://github.com/bitcoin/bips/blob/d8599f9b6b59702a96c3a86a4a16650cb33c7890/bip-0173.mediawiki) characterset or you will never find a match:
```
[localhost]$ export FIND=<string>; export NUM_WORKERS=<integer>
```

Start the process:
```
[localhost]$ node script.js
```

The incremental reporting is just for fun. It should not be regarded as progress toward finding your vanity npub. There is no progress toward finding an npub. You have the same probability of finding it on your first attempt as you do on your one billionth attempt.

The process will exit when it finds a npub beginning with your string.

## Conbtributions
I'm sure this could be made more efficient. I've experimented with limited process messaging (instead of on each iteration), but it didn't significantly improve performance.
