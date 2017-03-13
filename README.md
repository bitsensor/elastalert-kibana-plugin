# ElastAlert Kibana plugin for Kibana5

## Installation from build
```bash
./bin/kibana-plugin install https://github.com/Baoban/elastalert-kibana-plugin/raw/kibana5/build/elastalert-0.0.6.zip
```

Append to the `config/kibana.yml` file the host of ElastAlert server. 
```
elastalert.serverHost: localhost
```

## Building artifact from source

```bash
npm run build
```

## Development
Run the browser tests in a real web browser, or mocha. 
```bash
npm run test:browser
npm run test:server
```

## Kibana Plugin Development
See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following npm tasks within Kibana.


## Development Steps

- run elasticsearch
- run elastalert-server
- npm start