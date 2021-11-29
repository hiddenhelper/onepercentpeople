import { Request, Response, NextFunction } from 'express';

var plaid = require('plaid');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const plaidClient = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: process.env.NODE_ENV.toUpperCase() === 'PRODUCTION' ? plaid.environments.production : plaid.environments.sandbox
});



/**
 * Connect Plaid.
 *
 * @returns plaid access token.
 */
async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const publicToken = req.body.publicToken;

    const exchangeResponse = await plaidClient.exchangePublicToken(publicToken);
    const accessToken = exchangeResponse.access_token;

    // Generate a bank account token
    // TODO: Test once Plaid and Stripe are linked
    /*plaidClient.createStripeToken(accessToken, '{{ACCOUNT_ID}}', function(err, res) {
        var bankAccountToken = res.stripe_bank_account_token;
    });

    stripe.customers.create({
        source: PLAID_TOKEN_GOES_HERE,
        description: "Example customer"
        }, function(err, customer) {
    });*/

    // Save Stripe CUSTOMER_ID to the database for this employer so that they can later be charged
    // await queries.saveCustomerID(email, accessToken);

    res.json({});

  } catch (err) {
    console.log(err);
    res.json({ error: err.message, code: err.code });
  }
}


module.exports = {
  store,
}
