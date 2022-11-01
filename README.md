<p align="center">
    <a href="https://travel-log-omega-six.vercel.app/">
        <h1 align="center">Travel Log</h1>
    </a>
</p> 
<p align="center">
  Track, sort, and filter travel destinations and discover your next vacation.
</p>

## Set up Contenful

1. Create a new space on [Contentful](https://www.contentful.com/).
2. Build a new Content Model to store travel destinations.
3. Click on your space Settings and navigate to API keys.
4. Copy and store the Space ID amd Content Delivery API - access token.

## Set up and run the app

1. Create a `.env.local` file at the root of the project.
```shell
touch .env
```

2. Add the saved Space ID and Content Delivery API - access token from Contentful.
```env
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
```

3. Install dependencies
```shell
npm install
```

4. Run the Next app 
```shell
npm run dev
```

## Made With
- [Chakra](https://chakra-ui.com/)
- [Contentful](https://www.contentful.com/)
- [Next.js](https://nextjs.org/)

