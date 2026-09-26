#!/usr/bin/env node
// brainstorm-idea-clusterer
// Usage: node index.js <path-to-audio.wav>
import { existsSync, writeFileSync } from 'node:fs';
import { loadModel, transcribe, completion, unloadModel, WHISPER_TINY, LLAMA_3_2_1B_INST_Q4_0 } from '@qvac/sdk';

const audioPath = process.argv[2];

if (!audioPath || !existsSync(audioPath)) {
  console.error('Usage: node index.js <path-to-audio.wav>');
  process.exit(1);
}

console.log('Loading Whisper model on-device...');
const whisperId = await loadModel({ modelSrc: WHISPER_TINY, modelConfig: { language: 'en' } });

console.log(`Transcribing ${audioPath}...`);
const transcript = await transcribe({ modelId: whisperId, audioChunk: audioPath });
await unloadModel({ modelId: whisperId });

console.log('\nTranscript:');
console.log(transcript.trim());

console.log('\nLoading language model on-device...');
const llmId = await loadModel({ modelSrc: LLAMA_3_2_1B_INST_Q4_0 });

const prompt = "The text below is a transcript of a group brainstorm. Extract every distinct idea, group them into 3-5 themes with headings, and mark the 3 ideas the group seemed most excited about with a star. Output only the markdown." + '\n\n' + transcript;

const { tokenStream } = completion({ modelId: llmId, history: [{ role: 'user', content: prompt }], stream: true });

let output = '';
console.log('\nResult:\n');
for await (const token of tokenStream) {
  process.stdout.write(token);
  output += token;
}
console.log();

writeFileSync("idea-clusters.md", output.trim() + '\n');
console.log('\nSaved to idea-clusters.md');

await unloadModel({ modelId: llmId });
