# Install

1. Clone this repo.
2. In its root directory, run `yarn install` and then `npm link`.
3. In the root of that project repo, run `yarn add -D https://github.com/ryancwalsh/eslint-config-shared`.
4. Run `npm link eslint-config-shared`.

`(cd ~/code/eslint-config-shared/ && yarn build) && yarn eslint .` is a useful command.

# TODO

1. Figure out which dependencies can be downgraded to dev or uninstalled from `package.json`.
1. Figure out how this library can host the Prettier config too.
