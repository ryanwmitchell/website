# Directus Website
The official Directus marketing website

## Installation

Download or clone the `build` branch:

[todo]

```bash
$ git clone -b build https://github.com/directus/website.git
```

## Development

To work on this page: 

clone the repo

```bash
$ git clone https://github.com/directus/website
```

install the dependencies

```bash
$ npm install
```

build the front-end

```bash
$ npm run dev
```

## Deployment
```
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/directus/website master:build
```
