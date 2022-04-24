# ETH Amsterdam

## Developemnt

After cloning, install dependencies by running `yarn`. Update submodules:

```bash
git submodule update --init --recursive
```

## Backend

1. Run `ipfs` locally:

```bash
ipfs init
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs daemon
```
2. Add value to the `CHANNEL_PK` in the config
3. `yarn start:dev`

## Frontend

1. Add value to the `WEB3AUTH_CLIENT_ID` in the consts
2. Run `yarn build`
3. Run `yarn start`
