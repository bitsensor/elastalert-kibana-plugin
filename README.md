# ElastAlert Kibana plugin

![img](https://www.bitsensor.io/assets/img/screenshots/template.gif)

## Requirements
- Our [ElastAlert server](https://github.com/bitsensor/elastalert) fork
- The latest release of [Kibana 5.6](https://github.com/elastic/kibana/tree/5.6)

## Installation
```bash
./bin/kibana-plugin install 'https://git.bitsensor.io/front-end/elastalert-kibana-plugin/builds/artifacts/5.6/raw/artifact/elastalert-kibana-plugin-latest.zip?job=build'
```

If your ElastAlert server is running on something else than localhost change the following in `config/kibana.yml`: 

```
elastalert.serverHost: 123.0.0.1
```
