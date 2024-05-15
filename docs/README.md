# LSP Smart Contracts Utils &middot; [![npm version](https://img.shields.io/npm/v/@lukso/lsp-utils.svg?style=flat)](https://www.npmjs.com/package/@lukso/lsp-utils)

This package was created with the intent to help developers to use `@lukso/lsp-smart-contracts`. Its purpose is to provide a series of helper functions for each LSP.

-   For more information on LSPs see [Documentation](https://docs.lukso.tech/standards/smart-contracts/introduction) on _[docs.lukso.tech](https://docs.lukso.tech/standards/introduction)._
-   For more information on LIPs see [Specification](https://github.com/lukso-network/LIPs)

| :warning: | _This package is currently in early stages of development,<br/> use for testing or experimentation purposes only._ |
| :-------: | :----------------------------------------------------------------------------------------------------------------- |

## Installation

### npm

`@lukso/lsp-utils` is available as a [npm package](https://www.npmjs.com/package/@lukso/lsp-utils).

```bash
npm install @lukso/lsp-utils
```

### cloning the repository

Alternatively you can also clone the repository and install its dependencies to start using the smart contracts.

```bash
$ git clone https://github.com/lukso-network/lsp-utils.git
$ cd ./lsp-utils
$ npm install
```

## Usage

### in Javascript

You can use the utils by importing them as follow:

#### ES6 Modules:

```javascript
import { encodeAllowedCalls } from '@lukso/lsp-utils';

const allowedCalls = encodeAllowedCalls(
    allowedInteractions,
    allowedAddresses,
    allowedStandards,
    allowedFunctions,
);
```

#### CommonJS

```javascript
cosnt { encodeAllowedCalls } = require('@lukso/lsp-utils');

const allowedCalls = encodeAllowedCalls(
    allowedInteractions,
    allowedAddresses,
    allowedStandards,
    allowedFunctions
);
```

## Documentation

For more informations check the [`docs`](./docs/modules.md) folder

-   [IPFS](./docs/modules/IPFS.md)
-   [LSP2](./docs/modules/LSP2.md)
-   [LSP3](./docs/modules/LSP3.md)
-   [LSP4](./docs/modules/LSP4.md)
-   [LSP5](./docs/modules/LSP5.md)
-   [LSP6](./docs/modules/LSP6.md)
-   [LSP12](./docs/modules/LSP12.md)
