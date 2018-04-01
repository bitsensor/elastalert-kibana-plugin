# ElastAlert Kibana plugin

![img](https://www.bitsensor.io/assets/img/screenshots/template.gif)

## Requirements
- Our [ElastAlert server](https://github.com/bitsensor/elastalert) fork
- The latest release of [Kibana 4.6](https://github.com/elastic/kibana/tree/4.6)

## Installation
```bash
./bin/kibana plugin -i elastalert -u 'https://git.bitsensor.io/front-end/elastalert-kibana-plugin/builds/artifacts/4.6/raw/build/elastalert-kibana-plugin-latest.zip?job=build'
```

If your ElastAlert server is running on something else than localhost change the following in `config/kibana.yml`: 

```
elastalert.serverHost: 123.0.0.1
```
