// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Jenko is ERC721, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event registerArtistEv(address _address, string _artistVerificationId);
    event mintEv(uint256 _tokenId);

    struct Token {
        address artistAddress;
        string artPieceId;
        string title;
        string description;
    }
    mapping(uint256 => Token) public tokensById;
    
    struct Artist {
      string artistVerificationId;  
    }
    mapping(address => Artist) public artistsByAddress;
    
    using Strings for uint256;
    mapping (uint256 => string) private _tokenURIs;
    string private _baseURIextended;

    constructor () ERC721("JenkoAuthenticityToken", "JNK") {
    }
    
    function registerArtist(string memory _verificationId) public {
        artistsByAddress[msg.sender] = Artist(_verificationId);
        emit registerArtistEv(msg.sender, _verificationId);
    }
    
    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }
    
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }
    
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
    
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();
        
        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function mint(
        string memory _artPieceId,
        string memory _title, 
        string memory _description,
        string memory _tokenUri
    ) public {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        
        tokensById[newTokenId] = Token(msg.sender, _artPieceId, _title, _description);
        
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenUri);
        emit mintEv(newTokenId);
    }

    function mintAndRegisterArtist(
        address _artistAddress,
        string memory _artistVerificationId,
        string memory _artPieceId,
        string memory _title, 
        string memory _description,
        string memory _tokenUri
    ) public onlyOwner {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        
        tokensById[newTokenId] = Token(_artistAddress, _artPieceId, _title, _description);
        
        _mint(_artistAddress, newTokenId);
        _setTokenURI(newTokenId, _tokenUri);
        emit mintEv(newTokenId);
    
        artistsByAddress[_artistAddress] = Artist(_artistVerificationId);
        emit registerArtistEv(_artistAddress, _artistVerificationId);
    }
    
    function lastToken() public view returns (string memory) {
        return _tokenIds.current().toString();
    }
}
