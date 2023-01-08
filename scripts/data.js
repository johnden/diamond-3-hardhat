/* global ethers */
/* eslint prefer-const: "off" */

const { getSelectors, FacetCutAction } = require('./libraries/diamond.js')
const key = ''
async function deployDiamond () {
  const accounts = await ethers.Wallet()
  // const contractOwner = accounts[0]

//   // deploy DiamondCutFacet
//   const DiamondCutFacet = await ethers.getContractFactory('DiamondCutFacet')
//   const diamondCutFacet = await DiamondCutFacet.deploy()
//   await diamondCutFacet.deployed()
//   console.log('DiamondCutFacet deployed:', diamondCutFacet.address)

//   // deploy Diamond
//   const Diamond = await ethers.getContractFactory('Diamond')
//   const diamond = await Diamond.deploy(contractOwner.address, diamondCutFacet.address)
//   await diamond.deployed()
//   console.log('Diamond deployed:', diamond.address)

//   // deploy DiamondInit
//   // DiamondInit provides a function that is called when the diamond is upgraded to initialize state variables
//   // Read about how the diamondCut function works here: https://eips.ethereum.org/EIPS/eip-2535#addingreplacingremoving-functions
  const diamondInit = await ethers.getContractAt('DiamondInit', '0xeb16F1fC52fDE856643F4f9aE8d4d82bc4123a9D')
//   const diamondInit = await DiamondInit.deploy()
//   await diamondInit.deployed()
//   console.log('DiamondInit deployed:', diamondInit.address)

  // deploy facets
  console.log('Data:')
  const FacetNames = [
    'DiamondLoupeFacet',
    'OwnershipFacet'
  ]
  const FacetAddresses = [
    '0xc98406f6cd0fAdC49b18403b39115b8976AEaC71',
    '0xEfE1867767D3e2Aa2D4869Fb59DF6298a700Ee31'
  ]
  const cut = []
  for (i = 0; i < FacetNames.length; i++) {
    const Facet = await ethers.getContractAt(FacetNames[i], FacetAddresses[i])
    // const facet = await Facet.deploy()
    // await facet.deployed()
    console.log(`${FacetNames[i]} deployed: ${FacetAddresses[i]}`)
    cut.push({
      facetAddress: FacetAddresses[i],
      action: FacetCutAction.Add,
      functionSelectors: getSelectors(Facet)
    })
  }

  // upgrade diamond with facets
  console.log('')
  console.log('Diamond Cut:', cut)
  const diamondCut = await ethers.getContractAt('IDiamondCut', '0x2F4bd6131FaF4d17b0A4DbcceCf945A413cc3872')
  let tx
  let receipt
//   // call to init function
  let functionCall = diamondInit.interface.encodeFunctionData('init')
  console.log('Function Call:', functionCall)
  // tx = await diamondCut.diamondCut(cut, '0xeb16F1fC52fDE856643F4f9aE8d4d82bc4123a9D', functionCall)
//   console.log('Diamond cut tx: ', tx.hash)
//   receipt = await tx.wait()
//   if (!receipt.status) {
//     throw Error(`Diamond upgrade failed: ${tx.hash}`)
//   }
//   console.log('Completed diamond cut')
//   return diamond.address
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployDiamond = deployDiamond
