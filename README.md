# bem-decl

Library with a couple of methods to work with sets of BEM entities (aka BEMDECL files).

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][david-img]][david]

[npm]:          https://www.npmjs.org/package/bem-decl
[npm-img]:      https://img.shields.io/npm/v/bem-decl.svg
[travis]:       https://travis-ci.org/bem-sdk/bem-decl
[test-img]:     https://img.shields.io/travis/bem-sdk/bem-decl.svg?label=tests
[coveralls]:    https://coveralls.io/r/bem-sdk/bem-decl
[coverage-img]: https://img.shields.io/coveralls/bem-sdk/bem-decl.svg
[david]:        https://david-dm.org/bem-sdk/bem-decl
[david-img]:    https://img.shields.io/david/bem-sdk/bem-decl.svg

## Requirements

* [Node.js 4+](https://nodejs.org/en/)

## Installation

Run in your project directory:

```bash
npm install --save bem-decl
```

## Usage

```js
const bemDecl = require('bem-decl');

// Since we using sets stored in files we need to load them asynchronously
async function() {
    /*
       Await loading of file and put it to `set1` variable
       Note: There are few formats of declaration files but bem-decl here to read them all
    */
    const set1 = await bemDecl.load('set1.bemdecl.js');
    /*
       File set1.bemdecl.js:
       exports.blocks = [
          {name: 'button', elems: [{name: 'control'}, {name: 'icon'}]}
        ];
    */

    /*
       `set1` is an array of BemCell objects,
       convert them to strings using `.map` and special `id` property:
    */
    set1.map(c => c.id);
    // ['button', 'button__control', 'button__icon']

    // Let's load another set:
    const set2 = await bemDecl.load('set2.bemdecl.js');
    /* File set2.bemdecl.js:
       exports.deps = [
         {block: 'button', elem: 'icon'},
         {block: 'link', mods: {theme: 'normal'}}
       ];
    */

    set2.map(c => c.id);
    // ['button__icon', 'link', 'link_theme', 'link_theme_normal']

    // To subtract one set from another just use `.subtract` method:
    bemDecl.subtract(set1, set2).map(c => c.id);
    // ['button', 'button__control']

    // Result will be different if we swap arguments (as expected):
    bemDecl.subtract(set2, set1).map(c => c.id);
    // ['link', 'link_theme', 'link_theme_normal']

    // To merge two sets use `.merge` method:
    bemDecl.merge(set1, set2).map(c => c.id);
    /*
     ['button', 'button__control', 'button__icon',
      'link', 'link_theme', 'link_theme_normal']
    */

    // Also there is `.intersect` method to calculate intersection between them:
    bemDecl.intersect(set1, set2).map(c => c.id);
    // ['button__icon']
}
```

## BEMDECL formats

There are several formats and `bem-decl` is here to rule them all.

* 'v1' - the old [BEMDECL](https://en.bem.info/methodology/declarations/) format also known as `exports.blocks = ...`.
* 'v2' - format based on [`deps.js`](https://en.bem.info/platform/deps/)-files also known as `exports.deps = ...`.
* 'enb' - legacy format for widely used enb deps reader.

## API

<!-- * [`save(file: String, decl: BemCell[], opts: *): Promise<?>`](#savefile-string-decl-bemcell-opts-promise) -->

* [load()](#load-method)
* [merge()](#merge-method)
* [intersect()](#intersect-method)
* [subtract()](#subtract-method)
* [parse()](#parse-method)
* [stringify()](#stringify-method)

### load method

Loads BEM entities from a file in any format.

#### Syntax

`load(filename[, options])`

#### Input parameters

| Parameter | Type | Description |
|----------|-----|----------|
|**filename**|`string`|`bemdecl.js`-filename.|
|**options**|`*`|???|

#### Output data

A promise that represents `BemCell[]`.

#### Example

```js
bemDecl.load('set1.bemdecl.js')
    .then(decl => {
        // Work with declaration
    });
```

<!--
### `save(file: String, decl: BemCell[], opts: *): Promise<?>`

Formats and saves a file with BEM entities from a file in any format

```js
const decl = [
    new BemCell({ entity: new BemEntityName({ block: 'button' }) })
];
bemDecl.save('set1.bemdecl.js', decl, { format: 'enb' });
```

TODO: https://github.com/bem-sdk/bem-decl/issues/4
-->

### merge method

Merges many sets of BEM entities into one.

#### Syntax

`merge(BemCell[], BemCell[], ...)`

#### Output data

`BemCell[]`

#### Example

```js
const decl1 = [
    new BemCell({ entity: new BemEntityName({ block: 'button' }) })
];

const decl2 = [
    new BemCell({ entity: new BemEntityName({ block: 'link' }) })
];

const decl3 = [
    new BemCell({ entity: new BemEntityName({ block: 'button' }) }),
    new BemCell({ entity: new BemEntityName({ block: 'link' }) })
];

bemDecl.merge(decl1, decl2, decl3).map(c => c.id);

// ['button', 'link']
```

### intersect method

Calculates the set of BEM entities that exists in each passed set.

#### Syntax

`intersect(BemCell[], BemCell[], ...)`

#### Output data

`BemCell[]`

#### Example

```js
const decl1 = [
    new BemCell({ entity: new BemEntityName({ block: 'button' }) }),
    new BemCell({ entity: new BemEntityName({ block: 'select' }) })
];

const decl2 = [
    new BemCell({ entity: new BemEntityName({ block: 'button' }) }),
    new BemCell({ entity: new BemEntityName({ block: 'link' }) })
];

const decl3 = [
    new BemCell({ entity: new BemEntityName({ block: 'button' }) }),
    new BemCell({ entity: new BemEntityName({ block: 'attach' }) })
];

bemDecl.intersect(decl1, decl2, decl3).map(c => c.id);

// ['button']
```

### subtract method

Calculates the set of BEM entities that occur only in the first passed set and does not exist in the rest.

#### Syntax

`subtract(BemCell[], BemCell[])`

#### Output data

`BemCell[]`

#### Example

```js
const decl1 = [
    new BemCell({ entity: new BemEntityName({ block: 'button' }) }),
    new BemCell({ entity: new BemEntityName({ block: 'select' }) }),
    new BemCell({ entity: new BemEntityName({ block: 'link' }) })
];

const decl2 = [
    new BemCell({ entity: new BemEntityName({ block: 'link' }) })
];

const decl3 = [
    new BemCell({ entity: new BemEntityName({ block: 'select' }) })
];

bemDecl.subtract(decl1, decl2, decl3).map(c => c.id);

// ['button']
```

### parse method

Parses raw string or evaluated JS object to a set of BEM entities.

#### Syntax

`parse(bemdecl)`

#### Input parameters

| Parameter | Type | Description |
|----------|-----|----------|
|**bemdecl**|`string|Object`|???|

#### Output data

`BemCell[]`

#### Example

```js
bemDecl.parse('exports.deps = [{ block: "button" }]').map(c => c.id);

// ['button']
```

See also [Declarations in BEM](https://en.bem.info/methodology/declarations/)

### stringify method

Stringifies set of BEM entities to a specific format.

**Note** Temporary there is just `enb` format. It will be fixed later.

#### Syntax

`stringify(BemCell[], {format: 'enb'})`

#### Output data

`String`

#### Example

```js
const decl = [
    new BemCell({ entity: new BemEntityName({ block: 'button' }) })
];

bemDecl.stringify(decl, { format: 'enb' });

// 'exports.deps = [\n {\n "block": "button"\n }\n];\n'
```

## Contributing

Please read [CONTRIBUTING.md](https://github.com/bem-sdk/bem-sdk/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/bem-sdk/bem-decl/tags).

## Authors

* **Andrew Abramov** - *Initial work* - [blond](https://github.com/blond)

> See also the full list of [contributors](https://github.com/bem-sdk/bem-decl/contributors) who participated in this project.

You may also get it with `git log --pretty=format:"%an <%ae>" | sort -u`.

## License

Code and documentation copyright © 2012 — 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.md).
