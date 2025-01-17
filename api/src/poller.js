require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const { ethers } = require("ethers");
const { provider } = require("./web3");
const sql = require("./pg");
const { log } = require("./utils");
const abi = require("../../contracts/jenko.abi.json");

const { CONTRACT_ADDRESS } = process.env;
if (!CONTRACT_ADDRESS) {
  throw new Error("invalid CONTRACT_ADDRESS");
}

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

async function registerArtistEvent(_address, _artistVerificationId) {
  try {
    log(`[registerArtistEvent] ${_address}`);
    await sql`
      update artists
      set ${sql({ is_validate: true })}
      where address = ${_address} and is_validate IS NOT TRUE
    `;
  } catch (error) {
    log(error);
  }
}

async function mintEvent(_tokenId, _artistAddress, _artPieceId) {
  try {
    log(`[mintEvent] ${_tokenId} for ${_artistAddress}`);
    const [tokenData, token_uri] = await Promise.all([
      contract.tokensById(_tokenId),
      contract.tokenURI(_tokenId),
    ]);

    if (tokenData[0] === "0x0000000000000000000000000000000000000000") {
      throw new Error(`Token ${_tokenId} as no artist`);
    }

    const token = {
      artistAddress: tokenData[0],
      artPieceId: tokenData[1],
      title: tokenData[2],
      description: tokenData[3],
      size: tokenData[4],
      technical: tokenData[5],
      tirage: tokenData[6],
    };

    await sql`
      update certificates
      set ${sql({ is_validate: true, token_id: _tokenId })}
      where is_validate IS NOT TRUE
      and data->>'artPieceId' = ${token.artPieceId}
      and data->>'artistAddress' = ${_artistAddress}
    `;
    await sql`
      update certificates
      set ${sql({ token_uri })}
      where token_id = ${_tokenId}
    `;
  } catch (error) {
    log(error);
  }
}

async function royaltiesEvent(_tokenId) {
  try {
    log(`[royaltiesEvent] ${_tokenId}`);
    const data = await contract.royaltiesByTokenId(_tokenId);
    const royalties = {
      roylatiesArtist: parseInt(data[0]._hex ?? '0x0', 16),
      roylatiesGallery: parseInt(data[1]._hex ?? '0x0', 16),
      roylatiesCollector0: parseInt(data[2]._hex ?? '0x0', 16),
      roylatiesCollector1: parseInt(data[3]._hex ?? '0x0', 16),
      roylatiesCollector2: parseInt(data[4]._hex ?? '0x0', 16),
      roylatiesCollectorX: parseInt(data[5]._hex ?? '0x0', 16),
    };

    const [{ id, data: tokenData}] = await sql`
      select id, data 
      from certificates 
      where token_id = ${_tokenId}
    `;

    await sql`
      update certificates
      set ${sql({ 
        data: JSON.stringify({ 
          ...tokenData,
          royalties
        })
      })}
      where id = ${id}
    `;

  } catch (error) {
    log(error);
  }
}

async function listen() {
  log(`Start poller in ${process.env.NODE_ENV} mode`);
  
  contract.on("registerArtistEvent", registerArtistEvent);
  contract.on("mintEvent", mintEvent);
  contract.on("royaltiesEvent", royaltiesEvent);
}

listen();
