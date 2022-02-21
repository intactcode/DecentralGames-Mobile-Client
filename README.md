# mobile-client

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing with multiple accounts in Blisk

First, start by creating an **_.env.local_** file under the root. It should have the following structure:

```
USE_STATIC_MOBILE_ACCOUNTS=true
ACCOUNT_1_ADDRESS=
ACCOUNT_1_TOKEN=
ACCOUNT_2_ADDRESS=
ACCOUNT_2_TOKEN=
ACCOUNT_3_ADDRESS=
ACCOUNT_3_TOKEN=
```

Second, add three wallet addresses and their respective tokens to the fields above. You may fetch these values from **_Local Storage_**:

![This is an image](https://res.cloudinary.com/dnzambf4m/image/upload/v1645451978/address_token_hy5vir.png)

Third, open Blisk and load **_http://localhost:3000_**, and add the devices defined in **_next.config.js_**:

(You may ammend this list with your own additional devices)

```
 MOBILE_WIDTHS: {
      390: {
        address: process.env.ACCOUNT_1_ADDRESS,
        token: process.env.ACCOUNT_1_TOKEN,
        deviceName: 'iPhone 13 Pro',
      },
      428: {
        address: process.env.ACCOUNT_2_ADDRESS,
        token: process.env.ACCOUNT_2_TOKEN,
        deviceName: 'iPhone 13 Pro Max',
      },
      375: {
        address: process.env.ACCOUNT_3_ADDRESS,
        token: process.env.ACCOUNT_3_TOKEN,
        deviceName: 'iPhone 13 Mini',
      },
},
```

You should now be able to play with multiple devices on multiple accounts in Blisk, with no need for connecting to MetaMask

**_Important_**: ensure you uncheck **_URL Sync_**:

![This is an image](https://res.cloudinary.com/dnzambf4m/image/upload/v1645454189/blisk_m09b2u.png)

\*Note: Set **_USE_STATIC_MOBILE_ACCOUNTS=false_** to use a real device on the **_MOBILE_WIDTHS_** list - outside of Blisk

## Learning Resources

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Making a Progressive Web App (PWA)](https://create-react-app.dev/docs/making-a-progressive-web-app/) - from the Create React App people
