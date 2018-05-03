# ElastAlert Kibana plugin for Kibana 6.2.4 (experimental)

![img](https://raw.githubusercontent.com/bitsensor/elastalert-kibana-plugin/master/kibana-elastalert-plugin-showcase.gif)

# Experimental
Support for Kibana 6.2.4 is currently experimental and might not fully work yet. Please report any issues.

## Requirements
- Our [ElastAlert server](https://github.com/bitsensor/elastalert) fork
- [Kibana 6.2.4](https://www.elastic.co/downloads/past-releases/kibana-6-2-4)

## Installation
```bash
./bin/kibana-plugin install 'https://git.bitsensor.io/front-end/elastalert-kibana-plugin/builds/artifacts/6.2.4/raw/artifact/elastalert-kibana-plugin-latest.zip?job=build'
```

If your ElastAlert server is running on something else than localhost change the following in `config/kibana.yml`: 

```
elastalert.serverHost: 123.0.0.1
```
