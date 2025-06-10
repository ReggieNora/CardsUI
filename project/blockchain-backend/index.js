import 'dotenv/config';
import express from 'express';
import algosdk from 'algosdk';

const app = express();
import cors from 'cors';
app.use(cors());
app.use(express.json());

const algodToken = process.env.ALGOD_TOKEN || '';
const algodServer = process.env.ALGOD_SERVER || 'https://testnet-api.algonode.cloud';
const algodPort = '';
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

const mnemonic = process.env.MNEMONIC;
const account = algosdk.mnemonicToSecretKey(mnemonic);

app.post('/api/verify', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const params = await algodClient.getTransactionParams().do();
    const note = new Uint8Array(Buffer.from(`Verified: ${email}`));
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: account.addr,
      to: account.addr,
      amount: 0,
      note,
      suggestedParams: params,
    });
    const signedTxn = txn.signTxn(account.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    res.json({ txId });
  } catch (err) {
    console.error('Algorand verify error:', err);
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
});

app.listen(4000, () => {
  console.log('Algorand backend running on http://localhost:4000');
});
