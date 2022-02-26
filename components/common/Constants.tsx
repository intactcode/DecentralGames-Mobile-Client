const constants = {
  SEGMENT_WRITE_KEY: 'pK03oncLYCxY1DJtTmnJnuwLByq2RlAb', // Segment public API key
  BASE_URL: 'https://app.decentral.games',
  TITLE: 'Mobile ICE',
  DESCRIPTION: 'Play to earn games. Play ICE Poker, trade NFTs, and earn real money from your favorite games.',
  MATIC_RPC: {137: 'https://polygon-rpc.com'},
  MATIC_CHAIN_ID: 137,
  AUTH_TOKEN_TTL: 24 * 7,
  RESULTS: [
    'High card',
    'Pair',
    'Two pair',
    'Three of a kind',
    'Straight',
    'Flush',
    'Full house',
    'Four of a kind',
    'Straight flush',
    'Royal flush',
  ],
  CHILD_TOKEN_ADDRESS_DG: '0xef938b6da8576a896f6E0321ef80996F4890f9c4',
  CHILD_TOKEN_ADDRESS_ICE: '0xc6c855ad634dcdad23e64da71ba85b8c51e5ad7c',
  FACTOR: 1000000000000000000, // ETH-to-WEI multiplication factor
};

export default constants;