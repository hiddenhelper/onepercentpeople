import { Request, Response, NextFunction } from 'express';

async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    // TODO: Check if user has already initialized a Stripe account. Do that here if not.
    const account = await stripe.accounts.create({
      country: 'US',
      type: 'express',
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });

    const accountLinks = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'http://localhost:3000/api/stripe/reauth',
      return_url: 'https://localhost:3000/api/stripe/return',
      type: 'account_onboarding',
    });

    res.json({ 'success': true, 'account': account, 'accountLinks': accountLinks });
  } catch (err) {
    return res.send(err);
  }
}

module.exports = {
  store
}
