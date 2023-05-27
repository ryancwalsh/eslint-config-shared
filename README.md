# Install

1. Clone this repo.
2. In its root directory, run `yarn install` and then `npm link`.
3. In your project repo (the one that will import this package), add this to your `compilerOptions` in `tsconfig.json`:

```
"paths": {
    "eslint-config-shared": ["./node_modules/eslint-config-shared/src"]
}
```

4. In the root of that project repo, run `yarn add -D https://github.com/ryancwalsh/eslint-config-shared`.
5. Run `npm link eslint-config-shared`.

# TODO

1. Figure out which dependencies can be downgraded to dev or uninstalled from `package.json`.
1. Figure out how this library can host the Prettier config too.