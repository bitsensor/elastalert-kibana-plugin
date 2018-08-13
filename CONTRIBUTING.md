## Development

See the [kibana contributing guide](https://github.com/elastic/kibana/blob/master/CONTRIBUTING.md) for instructions setting up your development environment. Once you have completed that, git clone our plugin into a folder next to your cloned kibana folder. Once that is done you can use the commands below.

  - `yarn kbn bootstrap`

    Install dependencies and crosslink Kibana and all projects/plugins.

  - `yarn start`

    Start kibana and have it include this plugin. You can pass any arguments that you would normally send to `bin/kibana`

      ```bash
      yarn start --elasticsearch.url http://localhost:9220
      ```

  - `yarn build`

    Build a distributable archive of the plugin.

  - `yarn test:browser`

    Run the browser tests in a real web browser.

  - `yarn test:server`

    Run the server tests using mocha.

For more information about any of these commands run `yarn ${task} --help`. For a full list of tasks checkout the `package.json` file, or run `yarn run`.

## Releasing

In the develop branch the Kibana version in `package.json` should always point to the latest unreleased stable version. For example: if Kibana 6.3.2 has been released the version should be 6.3.3. 

The develop branch is merged to master when a new version is ready (do not forget to increment the version inside `package.json`). The new version is tagged and uploaded to GitHub releases.

A GitHub release should at least contain a build for the latest stable Kibana version, but if possible builds for older minor versions should be created as well. Building for a specific Kibana version can be done easily with: `yarn build -k kibana-version-here`.
