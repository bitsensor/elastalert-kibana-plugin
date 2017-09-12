#!/bin/bash
package_version=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)
mkdir artifact

while read kibana_version; do
  cat package.json.template | sed "s/kibana-version/$kibana_version/g" > package.json
  npm run build --quiet
  cp build/elastalert-$package_version.zip artifact/elastalert-$kibana_version-$package_version.zip
  cp build/elastalert-$package_version.zip artifact/elastalert-$kibana_version-latest.zip
done < kibana-versions-5.0-5.4.txt
