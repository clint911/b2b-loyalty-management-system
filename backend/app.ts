require('dotenv').config();
const express = require('express');

const app = express()
const port = process.env.PORT || 8080

//Endpoint to be used
app.use("/", require("./routes/homeHandler.ts")); //HomePage
app.use("/CreateToken", require("./routes/CreateTokenRoute"))
app.use('/GetTokenBalance', require("./routes/getTokenBalanceRoute"))
app.use('/mintTokens', require("./routes/MintTokenRoute"))
app.use('/getTokenTotalSupply', require('./routes/TotalSupplyRoute'))
app.use('/TransferTokens', require('./routes/TransferRoute'))
app.use('/BurnTokens', require('./routes/BurnTokenRoute'))

//Initializing the server
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});


