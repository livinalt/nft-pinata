# nft-pinata
Minting my NFT using IPFS

## Overview

The **Genesis NFT Project** is a smart contract that implements a non-fungible token (NFT) collection, compliant with the ERC721 standard. It leverages OpenZeppelin’s robust library of contracts to provide core functionality, including pausing, minting, burning, and URI management. The contract is designed to be managed by an owner, with the ability to mint new tokens, pause/unpause operations, and update metadata.

## Features

- **ERC721 Compliant**: Implements the ERC721 standard for non-fungible tokens.
- **Enumerable**: Allows tokens to be enumerated, providing functionality to list tokens owned by an account.
- **URI Storage**: Associates metadata (e.g., images, descriptions) with each token via a URI.
- **Pausable**: The contract can be paused and unpaused by the owner to temporarily disable token transfers and minting.
- **Burnable**: Tokens can be destroyed by the owner.
- **Ownable**: The contract assigns ownership to a specific address, allowing only the owner to perform certain privileged actions.

## Contract Structure

### Smart Contract: `Genesis.sol`

This contract inherits from multiple OpenZeppelin contracts to achieve its functionality:

- `ERC721`: The base contract for NFTs.
- `ERC721Enumerable`: Allows enumerating tokens.
- `ERC721URIStorage`: Manages token metadata via URIs.
- `ERC721Pausable`: Adds pausable functionality.
- `ERC721Burnable`: Allows token burning.
- `Ownable`: Restricts certain actions to the owner.

### Key Functions

- **pause**: Pauses the contract, disabling transfers and minting.
- **unpause**: Unpauses the contract, re-enabling transfers and minting.
- **safeMint**: Mints a new token, assigns it to an address, and sets its URI.
- **tokenURI**: Returns the URI for a given token ID.

### Dependencies

- OpenZeppelin Contracts (v5.0.0 or higher)

### Constructor

The contract requires an initial owner to be set when deployed.

```solidity
constructor(address initialOwner)
    ERC721("Genesis", "GTK")
    Ownable(initialOwner)
{}
```

### Overrides

- `_update`: Manages token updates.
- `_increaseBalance`: Handles balance updates for accounts.
- `tokenURI`: Returns the metadata URI for a specific token.
- `supportsInterface`: Checks for supported interfaces.

## Deployment

### Hardhat Ignition Module

A Hardhat Ignition module is provided for easy deployment of the Genesis contract. The module deploys the contract with a predefined initial owner address.

```js
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const GenesisModule = buildModule("GenesisModule", (m) => {
  const initialOwner = "0xBeEF7C26f0804d099f49533a477809cF08c45aC2";
  const genesis = m.contract("Genesis", [initialOwner]);
  return { genesis };
});

export default GenesisModule;
```

### Steps to Deploy

1. Ensure you have the required OpenZeppelin and Hardhat Ignition dependencies installed:
   ```bash
   npm install @openzeppelin/contracts @nomicfoundation/hardhat-ignition
   ```

2. Run the Hardhat Ignition module to deploy the contract:
   ```bash
   npx hardhat run scripts/deploy.js
   ```

## Metadata Example

An example of the metadata for a minted NFT is provided in `Genesis-metadata.json`:

```json
{
  "name": "Genesis NFT",
  "description": "Trees in the beginning",
  "external_url": "https://pinata.cloud/",
  "image": "ipfs/QmcrK4GNN7i5ZqY2nW9cw7jXoLh9WgrCxeWyE5HMSxB3UD"
}
```

- **name**: The name of the NFT.
- **description**: A brief description of the NFT.
- **external_url**: An external URL for more information about the NFT.
- **image**: IPFS hash of the NFT’s image.

## Usage

### Minting NFTs

The contract owner can mint new NFTs by calling the `safeMint` function with the recipient's address and a URI that points to the token's metadata.

```solidity
function safeMint(address to, string memory uri) public onlyOwner
```

### Pausing and Unpausing

The contract owner can pause or unpause the contract by calling `pause` or `unpause` respectively. This is useful for temporarily disabling token transfers.

```solidity
function pause() public onlyOwner
function unpause() public onlyOwner
```

## License

This project is licensed under the MIT License.
