#!/usr/bin/env node
'use strict';

const args = process.argv.slice(2);

function usage() {
  console.log(`Usage: hex-decode [options] <hex-string>

Decode a hexadecimal string to text (UTF-8) or raw bytes.

Options:
  -r, --raw      Output raw bytes (binary) instead of UTF-8 text
  -s, --strip    Strip common separators (spaces, colons, dashes, 0x prefixes)
  -h, --help     Show this help message
  -v, --version  Show version

Examples:
  hex-decode 48656c6c6f
  echo "48 65 6c 6c 6f" | hex-decode -s
  hex-decode -r 89504e47 > header.bin
  hex-decode 0x48:0x65:0x6c:0x6c:0x6f -s`);
}

let raw = false;
let strip = false;
const positional = [];

for (const arg of args) {
  if (arg === '-h' || arg === '--help') { usage(); process.exit(0); }
  if (arg === '-v' || arg === '--version') {
    console.log(require('./package.json').version);
    process.exit(0);
  }
  if (arg === '-r' || arg === '--raw') { raw = true; continue; }
  if (arg === '-s' || arg === '--strip') { strip = true; continue; }
  positional.push(arg);
}

function decode(hex) {
  if (strip) {
    hex = hex.replace(/0x/gi, '').replace(/[\s:\-,]/g, '');
  }
  hex = hex.replace(/\s+/g, '');

  if (hex.length === 0) {
    process.stderr.write('Error: empty hex string\n');
    process.exit(1);
  }
  if (hex.length % 2 !== 0) {
    process.stderr.write('Error: hex string must have even length\n');
    process.exit(1);
  }
  if (!/^[0-9a-fA-F]+$/.test(hex)) {
    process.stderr.write('Error: invalid hex characters\n');
    process.exit(1);
  }

  const buf = Buffer.from(hex, 'hex');
  if (raw) {
    process.stdout.write(buf);
  } else {
    process.stdout.write(buf.toString('utf8') + '\n');
  }
}

if (positional.length > 0) {
  decode(positional.join(''));
} else if (!process.stdin.isTTY) {
  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => { data += chunk; });
  process.stdin.on('end', () => {
    decode(data.trim());
  });
} else {
  usage();
  process.exit(1);
}
