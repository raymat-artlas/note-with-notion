const SUCCESS_URL = process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true` : '/dashboard?success=true';
const CANCEL_URL = process.env.NEXT_PUBLIC_URL ? `${process.env.NEXT_PUBLIC_URL}/plans?error=payment_cancelled` : '/plans?error=payment_cancelled';

const session = await stripe.checkout.sessions.create({
  success_url: SUCCESS_URL,
  cancel_url: CANCEL_URL,
}); 