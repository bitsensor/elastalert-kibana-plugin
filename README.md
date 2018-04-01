# ElastAlert Kibana plugin for Kibana 5.6.8

![img](https://www.bitsensor.io/assets/img/screenshots/template.gif)

## Requirements
- Our [ElastAlert server](https://github.com/bitsensor/elastalert) fork
- [Kibana 5.6.8](https://www.elastic.co/downloads/past-releases/kibana-5-6-8)

## Installation
```bash
./bin/kibana-plugin install 'https://git.bitsensor.io/front-end/elastalert-kibana-plugin/builds/artifacts/5.6.8/raw/artifact/elastalert-kibana-plugin-latest.zip?job=build'
```

If your ElastAlert server is running on something else than localhost change the following in `config/kibana.yml`: 

```
elastalert.serverHost: 123.0.0.1
```
