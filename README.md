# Youpi SDK

__Build__

```bash
npm run build
```

__Getting started__

Add the __private repostory__ of the SDK in your dependencies.
```json
"dependencies": {
    ...
    "youpi-sdk": "git+ssh://git@github.com:derniercri/youpi-sdk.git"
}
```

Start playing with the SDK.

```typescript
import { Sdk } from 'youpi-sdk'

const sdk = new Sdk('https://youpiapp.io')
sdk.setToken('your-token-string')

const sensors = await sdk.getSensors()
```