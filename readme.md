# hex-decode-cli

[![npm version](https://img.shields.io/npm/v/@kszongic/hex-decode-cli)](https://www.npmjs.com/package/@kszongic/hex-decode-cli)
[![license](https://img.shields.io/npm/l/@kszongic/hex-decode-cli)](./LICENSE)

Decode hexadecimal strings to text or binary from the command line. Zero dependencies.

## Install

```bash
npm install -g @kszongic/hex-decode-cli
```

## Usage

```bash
# Decode hex to text
hex-decode 48656c6c6f
# Hello

# Pipe from stdin
echo "48656c6c6f20576f726c64" | hex-decode

# Strip separators (spaces, colons, dashes, 0x prefixes)
hex-decode -s "48 65 6c 6c 6f"
hex-decode -s "0x48:0x65:0x6c:0x6c:0x6f"

# Output raw binary
hex-decode -r 89504e470d0a1a0a > header.bin
```

## Options

| Flag | Description |
|------|-------------|
| `-r, --raw` | Output raw bytes instead of UTF-8 text |
| `-s, --strip` | Strip separators (spaces, colons, dashes, `0x`) before decoding |
| `-h, --help` | Show help |
| `-v, --version` | Show version |

## License

MIT © 2026 kszongic
