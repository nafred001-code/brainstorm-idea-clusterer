# brainstorm-idea-clusterer

Transcribes a brainstorm session and clusters the ideas into themes, on-device. Built with [Tether's QVAC SDK](https://github.com/tetherto/qvac) — the model runs on-device, so nothing leaves your machine.

## What it does

Transcribes a brainstorm session and clusters the ideas into themes, on-device.

**QVAC functions used:** `loadModel`, `transcribe` and `completion`.

![brainstorm-idea-clusterer demo](demo.png)

## Why I built it

Brainstorms produce great ideas and a recording nobody ever re-listens to.

## Requirements

- Node.js >= 22
- `@qvac/sdk` `^0.19.0` (installed automatically via `npm install`)

## Install

```bash
git clone https://github.com/nafred001-code/brainstorm-idea-clusterer.git
cd brainstorm-idea-clusterer
npm install
```

## Run

```bash
node index.js path/to/brainstorm.wav
```

See the comments at the top of `index.js` for the exact input this app expects. On first run, QVAC downloads the model it needs once and caches it locally; every run after that is fully offline.

## SDK version used

`@qvac/sdk` `0.19.1`

## License

MIT — see [LICENSE](LICENSE).
