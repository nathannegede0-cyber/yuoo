const { Client, Environment } = require("square");
const crypto = require("crypto");

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // Change to Production when ready
});

const processPayment = async (req, res) => {
  const { sourceId, amount } = req.body;
  try {
    const { result } = await client.paymentsApi.createPayment({
      sourceId, // The token from React
      idempotencyKey: crypto.randomBytes(12).toString("hex"),
      amountMoney: {
        amount: amount * 100, // Square uses cents ($10.00 = 1000)
        currency: "USD",
      },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
