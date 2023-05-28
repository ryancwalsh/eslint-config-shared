// https://eslint.org/blog/2022/08/new-config-system-part-2/
// https://stackoverflow.com/a/74819187/
/* This file is just so that this repo itself can take advantage of the rules that it defines. 
The actual exported rules that other projects will import are at dist/eslint.config.js. */

import eslintConfig from './dist/eslint.config';

console.log({ eslintConfig });
// console.log(JSON.stringify(eslintConfig, null, 2));

export default [...eslintConfig];
