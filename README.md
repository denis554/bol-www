# bol-www

The Frontend Application for [mancalive](https://secure-cliffs-35079.herokuapp.com/auth), a realtime mancala experiment.

## TOC
- [Requirements](#requirements)
- [Development](#development)
- [Building for production](#building-for-production)
- [TODO](#todo)
- [FAQ](#faq)
  * [Backend code repository](#backend-code-repository)
- [Useful links](#useful-links)
- [License](#license)
- [Author](#author)

## Requirements

* [Node 8.x](https://nodejs.org/en/)

## Development

**Clone and run the [backend application](https://github.com/lifenautjoe/bol)**

It is a must.
The development server will forward requests to it on port `8080`.

**Clone the repository**

```sh
git clone git@github.com:lifenautjoe/bol-www.git
```

**Change to the root directory**

```sh
cd bol-www
```

**Install the project dependencies**

```sh
npm install
```

**Start the development server**

```sh
npm start
```

## Building for production

Bundle and optimize the application and it's assets for production.

```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## TODO

- [ ] Responsive game route
- [ ] Game route code cleanup
- [ ] PROFIT!

## FAQ

#### Backend code repository
The backend code repository is [here](https://github.com/lifenautjoe/bol).

## Useful links

* [Angular CLI reference](https://github.com/angular/angular-cli/blob/master/README.md)
* [Angular reference](https://angular.io/docs)

## License

MIT

## Author

Joel Hernandez  | [Website](www.lifenautjoe.com)
