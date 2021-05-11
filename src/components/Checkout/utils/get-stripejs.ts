/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    // stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
    stripePromise = loadStripe(
      "pk_test_51IG6MSLvlbaFqlOj6f6JcNKj2k5OrjORqo9a5Hns88hbD0mpBB9m2Sf2sUTvrFdA4Zh9m7BOIoYjr6AVLzyuVjhc00hvevBwBK"
    );
  }
  return stripePromise;
};

export default getStripe;
