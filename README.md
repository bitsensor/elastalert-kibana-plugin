# ElastAlert Kibana plugin

![img](https://www.bitsensor.io/assets/img/screenshots/template.gif)

## Installation from build
Kibana 4
```bash
./bin/kibana plugin -i elastalert -u https://git.bitsensor.io/front-end/elastalert-kibana-plugin/builds/artifacts/develop/raw/build/elastalert-latest.zip?job=build
```

Kibana 5
```bash
sudo ./bin/kibana-plugin install https://git.bitsensor.io/front-end/elastalert-kibana-plugin/builds/artifacts/kibana5/raw/artifact/elastalert-`sudo ./bin/kibana --version`-latest.zip?job=build
```

Kibana 5 (if you have renamed the `kibana-5.x.x` folder
```bash
./bin/kibana-plugin install https://git.bitsensor.io/front-end/elastalert-kibana-plugin/builds/artifacts/kibana5/raw/artifact/elastalert-5.x.x-latest.zip?job=build
```

Append to the `config/kibana.yml` file the host of ElastAlert server, if it is different than localhost. Typically the case if you are running on macOS. 
```
elastalert.serverHost: docker.for.mac.localhost
```

## Starting the [ElastAlert](https://github.com/bitsensor/elastalert) server

### Docker installation
The default configuration uses localhost as ES host. You will want to mount the volumes for configuration and rule files to keep them after container updates. 

In order to do that conviniently, please do a `git clone https://github.com/bitsensor/elastalert.git; cd elastalert`

#### Bash
```bash
docker run -d -p 3030:3030 \
    -v `pwd`/config/elastalert.yaml:/opt/elastalert/config.yaml \
    -v `pwd`/config/config.json:/opt/elastalert-server/config/config.json \
    -v `pwd`/rules:/opt/elastalert/rules \
    -v `pwd`/rule_templates:/opt/elastalert/rule_templates \
    --net="host" \
    --name elastalert bitsensor/elastalert:latest
```

#### Fish
```bash
docker run -d -p 3030:3030 \
    -v (pwd)/config/elastalert.yaml:/opt/elastalert/config.yaml \
    -v (pwd)/config/config.json:/opt/elastalert-server/config/config.json \
    -v (pwd)/rules:/opt/elastalert/rules \
    -v (pwd)/rule_templates:/opt/elastalert/rule_templates \
    --net="host" \
    --name elastalert bitsensor/elastalert:latest
```

A more detailed description is available at the [ElastAlert](https://github.com/bitsensor/elastalert) repository.

## Building artifact from source

```bash
npm run build
```

## Development

### Branch strategy
The repository is split in a `develop` branch, targeted at Kibana 4 development, and a `kibana5` branch. 
If changes are made in develop that should be applied to all kibana versions, make sure to pick that commit in both the develop as well as `kibana5` branch. 

### Tests
Run the browser tests in a real web browser, or mocha. 
```bash
npm run test:browser
npm run test:server
```

## Kibana Plugin Development
See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, use the following npm tasks within Kibana.
