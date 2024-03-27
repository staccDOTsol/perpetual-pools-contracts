const Web3 = require('web3');
const web3 = new Web3('https://arb-mainnet.g.alchemy.com/v2/KebS3a1XP3rzFHvzpsokZZHbqHQjmF_e'); // or your Ethereum node's URL

module.exports = async (hre) => {
    const { getNamedAccounts, ethers } = hre
    const { deploy, execute } = deployments
    const { deployer } = await getNamedAccounts()
    const accounts = await ethers.getSigners()

    const BTC_POOL_CODE = "BTC/USD+USDC"
    const ETH_POOL_CODE = "ETH/USD+USDC"
    const SOL_POOL_CODE = "SOL/USD+USDC"
    const DOGE_POOL_CODE = "DOGE/USD+USDC"
    const SHIB_POOL_CODE = "SHIB/USD+USDC"
    const PEPE_POOL_CODE = "PEPE/USDT+USDC"
    const FLOKI_POOL_CODE = "FLOKI/USDT+USDC"
    const BONK_POOL_CODE = "BONK/USD+USDC"
    const MEME_POOL_CODE = "MEME/USDT+USDC"
    const BABYDOGE_POOL_CODE = "BABYDOGE/USDT+USDC"
    const LADYS_POOL_CODE = "LADYS/USDT+USDC"
    const BONE_POOL_CODE = "BONE/USDT+USDC"
    const ELON_POOL_CODE = "ELON/USDT+USDC"

    const DEPLOY_POOL_GAS_LIMIT = 100000000

    const POOL_DEFAULT_MINTING_FEE = ethers.utils.parseEther("0.000000001")
    const POOL_DEFAULT_BURNING_FEE = ethers.utils.parseEther("0.000000001")
    const POOL_DEFAULT_FRONT_RUNNING_INTERVAL = 60 * 60 * 8 // 8 hours
    const POOL_DEFAULT_UPDATE_INTERVAL = 60 * 60 // 1 hour
    const POOL_DEFAULT_CHANGE_INTERVAL = "0"

    const THREE_LEVERAGE = 10000

    const SMA_DEFAULT_PERIODS = 8
    const SMA_DEFAULT_UPDATE_INTERVAL = 60 * 60 // 1 hour

    const USDC_ADDRESS = "0xaf88d065e77c8cc2239327c5edb3a432268e5831"
    //const TCR_ADDRESS = "0xA72159FC390f0E3C6D415e658264c7c4051E9b87"
    const DEV_MULTISIG_ADDRESS = "0xd9c281C5501c3Fe2C95587A99C9d0a54dDa63712"

    const arbitrumOneEthUsdOracle = {
        address: "0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2",
    }
    const arbitrumOneBtcUsdOracle = {
        address: "0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2",
    }
    const arbitrumOneSolUsdOracle = {
        address: "0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2",
    }
    
// ...
let feedName = "BTC/USD";
let feedNameHex = web3.utils.asciiToHex(feedName);
let feedNameBytes32 = web3.utils.padRight(feedNameHex, 64); // 32 bytes = 64 hex characters
// base btc usd oracle wrapper
const btcOracleWrapper = await deploy("BtcUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneBtcUsdOracle.address,  "BTC/USD", "BTC/USD", "BTC/USD"],
})

 feedName = "ETH/USD";
  feedNameHex = web3.utils.asciiToHex(feedName);
  feedNameBytes32 = web3.utils.padRight(feedNameHex, 64); // 32 bytes = 64 hex characters

// base eth usd oracle wrapper
const ethOracleWrapper = await deploy("EthUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneEthUsdOracle.address,  "ETH/USD", "ETH/USD", "ETH/USD"],
})

feedName = "ETH/USD";
feedNameHex = web3.utils.asciiToHex(feedName);
feedNameBytes32 = web3.utils.padRight(feedNameHex, 64); // 32 bytes = 64 hex characters

// base wti usd oracle wrapper
const wtiOracleWrapper = await deploy("SolUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "SOL/USD", "SOL/USD", "SOL/USD"],
})


// base wti usd oracle wrapper
const dogeOracleWrapper = await deploy("DogeUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "DOGE/USD", "DOGE/USD", "DOGE/USD"],
})

const shibOracleWrapper = await deploy("ShibUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "SHIB/USD", "SHIB/USD", "SHIB/USD"],
})

const pepeOracleWrapper = await deploy("PepeUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "PEPE/USDT", "PEPE/USDT", "PEPE/USDT"],
})

const flokiOracleWrapper = await deploy("FlokiUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "FLOKI/USDT", "FLOKI/USDT", "FLOKI/USDT"],
})

const bonkOracleWrapper = await deploy("BonkUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "BONK/USDT", "BONK/USDT", "BONK/USDT"],
})

const memeOracleWrapper = await deploy("MemeUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "MEME/USDT", "MEME/USDT", "MEME/USDT"],
})

const babydogeOracleWrapper = await deploy("BabydogeUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "BABYDOGE/USDT", "BABYDOGE/USDT", "BABYDOGE/USDT"],
})

const ladysOracleWrapper = await deploy("LadysUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "LADYS/USDT", "LADYS/USDT", "LADYS/USDT"],
})

const boneOracleWrapper = await deploy("BoneUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "BONE/USDT", "BONE/USDT", "BONE/USDT"],
})

const elonOracleWrapper = await deploy("ElonUsdOracleWrapper", {
    from: deployer,
    log: true,
    contract: "ChainlinkOracleWrapper",
    gasLimit: 100000000,
    args: ["0xeb28036e166D67e85CCB28E59407Ab09Eb494EC2", arbitrumOneSolUsdOracle.address,  "ELON/USDT", "ELON/USDT", "ELON/USDT"],
})



// deploy PoolSwapLibrary
    // deploy PoolSwapLibrary
    const library = await deploy("PoolSwapLibrary", {
        from: deployer,
        log: true,
        gasLimit: 100000000,
    })

    // deploy CalldataLogic
    const calldataLogic = await deploy("CalldataLogic", {
        from: deployer,
        log: true,
        gasLimit: 100000000,
    })

    // deploy L2Encoder
    const l2Encoder = await deploy("L2Encoder", {
        from: deployer,
        log: true,
        gasLimit: 100000000,
    })

    // deploy PoolFactory
    const factory = await deploy("PoolFactory", {
        from: deployer,
        gasLimit: 100000000,
        log: true,
        libraries: { PoolSwapLibrary: library.address },
        // (fee receiver, governance)
        args: [DEV_MULTISIG_ADDRESS, deployer],
    })

    // deploy InvariantCheck
    const invariantCheck = await deploy("InvariantCheck", {
        from: deployer,
        log: true,
        gasLimit: 100000000,
        args: [factory.address],
    })

    // deploy Autoclaim
    const autoClaim = await deploy("AutoClaim", {
        from: deployer,
        log: true,
        args: [factory.address],
    })

    // deploy PoolKeeper
    const poolKeeper = await deploy("PoolKeeper", {
        from: deployer,
        gasLimit: 100000000,
        log: true,
        libraries: { PoolSwapLibrary: library.address },
        args: [factory.address],
    })

    // deploy keeper rewards
    const keeperRewards = await deploy("KeeperRewards", {
        from: deployer,
        log: true,
        gasLimit: 100000000,
        libraries: { PoolSwapLibrary: library.address },
        args: [poolKeeper.address],
    })

    // set keeper rewards
    await execute(
        "PoolKeeper",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setKeeperRewards",
        keeperRewards.address
    )

    // set keeper gas price
    await execute(
        "PoolKeeper",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setGasPrice",
        ethers.utils.parseUnits("2", "gwei")
    )

    // Set PoolKeeper
    await execute(
        "PoolFactory",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setPoolKeeper",
        poolKeeper.address
    )

    // Set Autoclaim
    await execute(
        "PoolFactory",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setAutoClaim",
        autoClaim.address
    )

    const token = "0x1C5884AB83729f47Cd2d2c383d5C433456AEad8E"

    const erc20Factory = await ethers.getContractFactory("ERC20", accounts[0])

    const TCR = await erc20Factory.attach(token);

    let ok = await TCR.approve(factory.address, ethers.BigNumber.from('340282366920938463463374607431768211455'))
console.log(ok, ok, ok, ok)
    // Set pool deployment fee
       await execute(
        "PoolFactory",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setDeploymentFee",
        "0x1C5884AB83729f47Cd2d2c383d5C433456AEad8E", // Token address
        ethers.utils.parseEther("0.000001"), // Fee amount
        DEV_MULTISIG_ADDRESS // Receiver address
    )

    console.log("Setting factory fee")
    const fee = ethers.utils.parseEther("0.000001")
 await execute(
        "PoolFactory",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setFee",
        fee
    )

    await execute(
        "PoolFactory",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setInvariantCheck",
        invariantCheck.address
    )

    // deploy ETH SMA Oracle
    const ethSmaOracleWrapper = await deploy("EthUsdSMAOracle", {
        from: deployer,
        log: true,
        gasLimit: 100000000,
        contract: "SMAOracle",
        args: [
            ethOracleWrapper.address, //Oracle Address
            SMA_DEFAULT_PERIODS, // number of periods
            SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
            deployer, // deployer address
            deployer,
            deployer,
        ],
    })
//await new Promise(r => setTimeout(r, 10000));
try {
    // Poll so there is an initial price
    await execute(
        "EthUsdSMAOracle",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "poll"
    )


} catch (error) {
    console.log(error)
}
    // set the SMA poolkeeper to the actual pool keeper after the initial poll
    await execute(
        "EthUsdSMAOracle",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setPoolKeeper",
        poolKeeper.address
    )

    const btcSmaOracleWrapper = await deploy("BtcUsdSMAOracle", {
        from: deployer,
        log: true,
        gasLimit: 100000000,
        contract: "SMAOracle",
        args: [
           btcOracleWrapper.address, //Oracle Address
            SMA_DEFAULT_PERIODS, // number of periods
            SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
            deployer, // deployer address
            deployer,
            deployer,
        ],
    })
    //await new Promise((resolve) => setTimeout(resolve, 10000));
    try {
    // Poll so there is an initial price
    await execute(
        "BtcUsdSMAOracle",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "poll"
    )

    } catch (error) {
        console.log(error)
    }
    // set the SMA poolkeeper to the actual pool keeper after the initial poll
    await execute(
        "BtcUsdSMAOracle",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setPoolKeeper",
        poolKeeper.address
    )

    const wtiSmaOracleWrapper = await deploy("SolUsdSMAOracle", {
        from: deployer,
        log: true,
        gasLimit: 100000000,
        contract: "SMAOracle",
        args: [
            wtiOracleWrapper.address, //Oracle Address
            SMA_DEFAULT_PERIODS, // number of periods
            SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
            deployer, // deployer address
            deployer,
            deployer,
        ],
    })
//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
    // Poll so there is an initial price
    await execute(
        "SolUsdSMAOracle",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "poll"
    )


} catch (error) {
    console.log(error)
}
    // set the SMA poolkeeper to the actual pool keeper after the initial poll
    await execute(
        "SolUsdSMAOracle",
        {
            from: deployer,
            gasLimit: 100000000,
            log: true,
        },
        "setPoolKeeper",
        poolKeeper.address
    )
const dogeSmaOracleWrapper = await deploy("DogeUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        dogeOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods
        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})
//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
// Poll so there is an initial price
await execute(
    "DogeUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "DogeUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)

const shibSmaOracleWrapper = await deploy("ShibUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        shibOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods
        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})
//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
// Poll so there is an initial price
await execute(
    "ShibUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "ShibUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)

const pepeSmaOracleWrapper = await deploy("PepeUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        pepeOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods
        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})
//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
// Poll so there is an initial price
await execute(
    "PepeUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the
// SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "PepeUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)

const flokiSmaOracleWrapper = await deploy("FlokiUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        flokiOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods
        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})
//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
// Poll so there is an initial price
await execute(
    "FlokiUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the
// SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "FlokiUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)

const bonkSmaOracleWrapper = await deploy("BonkUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        bonkOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods
        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})
//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
// Poll so there is an initial price
await execute(
    "BonkUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the
// SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "BonkUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)

const memeSmaOracleWrapper = await deploy("MemeUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        memeOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods
        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})

//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
// Poll so there is an initial price
await execute(
    "MemeUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the
// SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "MemeUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)

const babydogeSmaOracleWrapper = await deploy("BabydogeUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        babydogeOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods
        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})

//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
// Poll so there is an initial price
await execute(
    "BabydogeUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the
// SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "BabydogeUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)

const ladysSmaOracleWrapper = await deploy("LadysUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        ladysOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods
        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})

//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
// Poll so there is an initial price
await execute(
    "LadysUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the
// SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "LadysUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)

const boneSmaOracleWrapper = await deploy("BoneUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        boneOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods
        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})

//await new Promise((resolve) => setTimeout(resolve, 10000));
try {

// Poll so there is an initial price
await execute(
    "BoneUsdSMAOracle",
    {
        from: deployer,

        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the
// SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "BoneUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)

const elonSmaOracleWrapper = await deploy("ElonUsdSMAOracle", {
    from: deployer,
    log: true,
    gasLimit: 100000000,
    contract: "SMAOracle",
    args: [
        elonOracleWrapper.address, //Oracle Address
        SMA_DEFAULT_PERIODS, // number of periods

        SMA_DEFAULT_UPDATE_INTERVAL, // Update interval
        deployer, // deployer address
        deployer,
        deployer,
    ],
})

//await new Promise((resolve) => setTimeout(resolve, 10000));
try {
// Poll so there is an initial price
await execute(
    "ElonUsdSMAOracle",
    {

        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "poll"
)

}
catch (error) {
console.log(error)
}
// set the
// SMA poolkeeper to the actual pool keeper after the initial poll
await execute(
    "ElonUsdSMAOracle",
    {
        from: deployer,
        gasLimit: 100000000,
        log: true,
    },
    "setPoolKeeper",
    poolKeeper.address
)




    // ETH-USD 3x
    const ethUsd3 = {

        quoteToken: token,
        poolName: ETH_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: ethSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    // BTC-USD 3x
    const btcUsd3 = {

        quoteToken: token,
        poolName: BTC_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: btcSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    // SOL-USD 3x
    const wtiUsd3 = {

        quoteToken: token,
        poolName: SOL_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: wtiSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    const dogeUsd3 = {
        
        quoteToken: token,
        poolName: DOGE_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: dogeSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    const shibUsd3 = {

        quoteToken: token,
        poolName: SHIB_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: shibSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    const pepeUsd3 = {

        quoteToken: token,
        poolName: PEPE_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: pepeSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    const flokiUsd3 = {

        quoteToken: token,
        poolName: FLOKI_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: flokiSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    const bonkUsd3 = {

        quoteToken: token,
        poolName: BONK_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: bonkSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    const memeUsd3 = {

        quoteToken: token,
        poolName: MEME_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: memeSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    const babydogeUsd3 = {

        quoteToken: token,
        poolName: BABYDOGE_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: babydogeSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    const ladysUsd3 = {

        quoteToken: token,
        poolName: LADYS_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: ladysSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }


    const boneUsd3 = {

        quoteToken: token,
        poolName: BONE_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: boneSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }

    const elonUsd3 = {

        quoteToken: token,
        poolName: ELON_POOL_CODE,
        frontRunningInterval: POOL_DEFAULT_FRONT_RUNNING_INTERVAL,
        updateInterval: POOL_DEFAULT_UPDATE_INTERVAL,
        leverageAmount: THREE_LEVERAGE,
        settlementToken: USDC_ADDRESS,
        oracleWrapper: elonSmaOracleWrapper.address,
        settlementEthOracle: ethOracleWrapper.address,
        feeController: deployer,
        mintingFee: POOL_DEFAULT_MINTING_FEE,
        burningFee: POOL_DEFAULT_BURNING_FEE,
        changeInterval: POOL_DEFAULT_CHANGE_INTERVAL,
    }




    const deploymentData = [ pepeUsd3, flokiUsd3, bonkUsd3, memeUsd3, babydogeUsd3, ladysUsd3, boneUsd3, elonUsd3]
console.log(deploymentData)
    console.log(`Deployed TestToken: ${USDC_ADDRESS}`)
    console.log(`Deployed PoolFactory: ${factory.address}`)
    console.log(`Deployed PoolSwapLibrary: ${library.address}`)
    console.log(`Deployed CalldataLogic: ${calldataLogic.address}`)
    console.log(`Deployed L2Encoder: ${l2Encoder.address}`)
    console.log(`Deployed PoolKeeper: ${poolKeeper.address}`)
    console.log(`Deployed KeeperRewards: ${keeperRewards.address}`)
    console.log(`Deployed InvariantCheck: ${invariantCheck.address}`)
    console.log(`Deployed AutoClaim: ${autoClaim.address}`)
    console.log(`Deployed EthUsdSMAOracle: ${ethSmaOracleWrapper.address}`)
    console.log(`Deployed BtcUsdSMAOracle: ${btcSmaOracleWrapper.address}`)
    console.log(`Deployed SolUsdSMAOracle: ${wtiSmaOracleWrapper.address}`)
    console.log(`Deployed DogeUsdSMAOracle: ${dogeSmaOracleWrapper.address}`)
    console.log(`Deployed ShibUsdSMAOracle: ${shibSmaOracleWrapper.address}`)
    console.log(`Deployed PepeUsdSMAOracle: ${pepeSmaOracleWrapper.address}`)
    console.log(`Deployed FlokiUsdSMAOracle: ${flokiSmaOracleWrapper.address}`)
    console.log(`Deployed BonkUsdSMAOracle: ${bonkSmaOracleWrapper.address}`)
    console.log(`Deployed MemeUsdSMAOracle: ${memeSmaOracleWrapper.address}`)
    console.log(`Deployed BabydogeUsdSMAOracle: ${babydogeSmaOracleWrapper.address}`)
    console.log(`Deployed LadysUsdSMAOracle: ${ladysSmaOracleWrapper.address}`)
    console.log(`Deployed BoneUsdSMAOracle: ${boneSmaOracleWrapper.address}`)
    console.log(`Deployed ElonUsdSMAOracle: ${elonSmaOracleWrapper.address}`)
    console.log(`Deployed TestToken: ${token}`)


    for (var i = 0; i < deploymentData.length; i++) {
        try {
        let receipt = await execute(
            "PoolFactory",
            {
                from: deployer,
                log: true,
                gasLimit: DEPLOY_POOL_GAS_LIMIT ,
            },
            "deployPool",
            deploymentData[i]
        )
        const event = receipt.events.find((el) => el.event === "DeployPool")

        console.log(`Deployed LeveragedPool: ${event.args.pool}`)
        console.log(`Deployed PoolCommitter: ${event.args.poolCommitter}`)
        } catch (err){
            console.log(err)
        }
    }

    // Commented out because if fails if already verified. Need to only do it once or modify to not failed if already verified
    // await hre.run("verify:verify", {
    //     address: oracleWrapper.address,
    //     constructorArguments: [arbitrumOneBtcUsdOracle.address, deployer],
    // })
    // await hre.run("verify:verify", {
    //     address: keeperOracle.address,
    //     constructorArguments: [arbitrumOneEthUsdOracle.address, deployer],
    // })
    // await hre.run("verify:verify", {
    //     address: poolKeeper.address,
    //     constructorArguments: [factory.address],
    // })
}

module.exports.tags = ["ArbitrumOneDeploy"]
