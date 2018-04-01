# ElastAlert Kibana plugin for Kibana 4.6.6

![img](https://raw.githubusercontent.com/bitsensor/elastalert-kibana-plugin/master/kibana-elastalert-plugin-showcase.gif)

## Requirements
- Our [ElastAlert server](https://github.com/bitsensor/elastalert) fork
- [Kibana 4.6.6](https://www.elastic.co/downloads/past-releases/kibana-4-6-6)

## Installation
```bash
./bin/kibana plugin -i elastalert -u 'https://git.bitsensor.io/front-end/elastalert-kibana-plugin/builds/artifacts/4.6.6/raw/build/elastalert-kibana-plugin-latest.zip?job=build'
```

If your ElastAlert server is running on something else than localhost change the following in `config/kibana.yml`: 

```
elastalert.serverHost: 123.0.0.1
```
