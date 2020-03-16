# ElastAlert Kibana Plugin

> This plugin provides a way to create, test and edit ElastAlert rules within Kibana.

![GitHub release](https://img.shields.io/github/release/bitsensor/elastalert-kibana-plugin.svg)
![Github Releases](https://img.shields.io/github/downloads/bitsensor/elastalert-kibana-plugin/total.svg)
![GitHub stars](https://img.shields.io/github/stars/bitsensor/elastalert-kibana-plugin.svg?style=social&label=Stars)

---

## Demo
![Showcase](showcase.gif)

## Requirements
- Our [ElastAlert server](https://github.com/bitsensor/elastalert) fork
- Kibana 6.3.1 or higher

## Installation
Check the [releases](https://github.com/bitsensor/elastalert-kibana-plugin/releases) page to download and install the latest version of this plugin that is compatible with your Kibana version. Please be aware that you will need a running [ElastAlert server](https://github.com/bitsensor/elastalert#installation) to make use of this plugin.

## Configuration
By default the plugin will connect to `localhost:3030`. If your ElastAlert server is running on a different host or port add/change the following options in your `config/kibana.yml` file: 

```
elastalert-kibana-plugin.serverHost: 127.0.0.1
elastalert-kibana-plugin.serverPort: 9000
```

## Contribution
Please report any issues or suggestions you have on the [issues page](https://github.com/bitsensor/elastalert-kibana-plugin/issues). If you want to create a pull request please check our [contribution guide](CONTRIBUTING.md).
