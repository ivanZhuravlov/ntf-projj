// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Jenko is ERC721, Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    event registerArtistEvent(address _address, string _artistVerificationId);
    event mintEvent(uint256 _tokenId);

    struct Token {
        address artistAddress;
        string artPieceId;
        string title;
        string description;
        string size;
        string technical;
        string material;
        string tirage;
        string movement;
    }
    mapping(uint256 => Token) public tokensById;
    
    struct Artist {
      string verificationId;
      string firstname;
      string lastname;
      bool hasValidateTermsAndCondition;
    }
    mapping(address => Artist) public artistsByAddress;
    
    using Strings for uint256;
    mapping (uint256 => string) private _tokenURIs;
    string private _baseURIextended;

    constructor () ERC721("Art Fruit Token", "AFT") {}
    
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

    function lastToken() public view returns (string memory) {
        return _tokenIds.current().toString();
    }

    function mint(
        address _artistAddress,
        string memory _artPieceId,
        string memory _tokenUri,
        string memory _title,
        string memory _description,
        string memory _size,
        string memory _technical,
        string memory _material,
        string memory _tirage,
        string memory _movement
    ) public onlyOwner returns(uint256) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();
        
        tokensById[newTokenId] = Token(
            _artistAddress,
            _artPieceId,
            _title,
            _description,
            _size,
            _technical,
            _material,
            _tirage,
            _movement
        );

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenUri);
        emit mintEvent(newTokenId);

        return newTokenId;
    }

    function registerArtist(
        address _artistAddress,
        string memory _firstname,
        string memory _lastname,
        string memory _artistVerificationId
    ) public onlyOwner {
        artistsByAddress[_artistAddress] = Artist(
            _artistVerificationId,
            _firstname,
            _lastname,
            true
        );
        emit registerArtistEvent(_artistAddress, _artistVerificationId);
    }
}
