// this is something specific to this deployment, using something like NEXT_PUBLIC_VERCEL_URL will be the deployment
// url that vercel uses and ultimately proxies with any kind of domain assignment to, as such, the CORS requests will
// fail, even tho they are the same deployment. in your own apps you should do something similar if you know the fixed
// domain this app will be deployed to

export const APP_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://nextjs-example.micro-stacks.dev';

// So the reason this is exists is that the stxAddress return from the useAccount hook
// is not the same as my wallet address. I tried to figure out why, but seems to be a common bug
// I opened the following issuse: https://github.com/fungible-systems/micro-stacks/issues/162
export const userAddress = 'ST3Y4P66VZ7JG5QXQ8MFR8D08GGBJR0KJCT2NXN4F';
