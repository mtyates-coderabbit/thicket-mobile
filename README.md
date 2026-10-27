# thicket-mobile

Mobile app for **Thicket**, built with Expo, React Native, and Apollo Client. Browse
products, check out, and view orders and receipts.

It consumes the GraphQL API in
[thicket-api](https://github.com/mtyates-coderabbit/thicket-api).

## Requirements

- Node.js 20 or later
- A running thicket-api on port 4000
- The iOS Simulator (Xcode), an Android emulator, or the Expo Go app on a device

## Running locally

Start the API first:

```bash
git clone https://github.com/mtyates-coderabbit/thicket-api.git
cd thicket-api && npm install && npm run dev
```

Then, in this repository:

```bash
npm install
npm start
```

Press `i` for the iOS Simulator or `a` for an Android emulator, or scan the QR code
with Expo Go.

The app calls `http://localhost:4000/graphql` by default, which works in the iOS
Simulator. For an Android emulator or a physical device, point it at your machine:

```bash
EXPO_PUBLIC_API_URL=http://<your-lan-ip>:4000/graphql npm start
```

## GraphQL workflow

Operations and fragments live in `src/graphql/`. Typed documents are generated into
`src/gql/graphql.ts`:

```bash
npm run schema:pull   # refresh schema/thicket-api.graphql
npm run codegen       # regenerate src/gql/graphql.ts
```

## Scripts

| Script | Description |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run ios` / `npm run android` | Start and open a simulator or emulator |
| `npm run typecheck` | Type-check the project |
| `npm test` | Run tests |
| `npm run schema:pull` | Refresh the vendored API schema |
| `npm run codegen` | Generate typed GraphQL documents |
