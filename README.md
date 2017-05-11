# nyc-street-normalizer

Normalizes New York City street and avenue names and abbreviations, part of the [NYC Space/Time Directory](http://spacetime.nypl.org) project.

Examples:

| Input          | Output               |
|:---------------|:---------------------|
| `Rivington`    | `Rivington Street`   |
| `Av B`         | `Avenue B`           |
| `W. 17th`      | `West 17th Street`   |
| `B'way`        | `Broadway`           |
| `Merchants Ex` | `Merchants Exchange` |
| `Grace Ct.`    | `Grace Court`        |

For more examples, see [`test/streets.json`](test/streets.json).

## Installation & usage

From Node.js:

    npm install --save nypl-spacetime/nyc-street-normalizer

```js
const normalizer = require('@spacetime/nyc-street-normalizer')

console.log(normalizer('b\'way'))
```

From the command line:

    npm install -g nypl-spacetime/nyc-street-normalizer

    nyc-street-normalizer "b'way"
