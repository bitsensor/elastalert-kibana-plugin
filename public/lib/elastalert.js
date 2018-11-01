export const deleteRule = (http, rules, onSuccess, onFail) => {
  const rulesCopy = rules.slice();

  rules.forEach(rule => {
    http.delete(`../api/elastalert/rules/${rule}`)
      .then(() => {
        // Loop through all rules marked for deletion
        const index = rulesCopy.indexOf(rule);
        rulesCopy.splice(index, 1);

        // When we successfully deleted all rules
        if (rulesCopy.length === 0) {
          onSuccess();
        }
      })
      .catch(e => {
        onFail(e);
      });
  });
};

export const saveRule = (http, ruleID, yaml, onSuccess, onFail) => {
  http
    .post(`../api/elastalert/rules/${ruleID}`, {
      yaml: yaml
    })
    .then(resp => {
      if (resp.status === 200) {
        onSuccess();
      }
    })
    .catch(e => {
      onFail(e);
    });
};

export const copyRule = (http, originalRuleID, newRuleID, onSuccess, onFail) => {
  // TODO: Check if rule with newRuleID should probably be done server side
  // This should probably be done from a new endpoint in the ElastAlert API
  http.get(`../api/elastalert/rules/${newRuleID}`).then(() => {
    // Resource with newRuleID as ID already exists
    const err = new Error('Rule with name already exists');
    err.status = 409;
    err.statusText = `Rule with name '${newRuleID}' already exists`;
    throw err;
  }).catch(e => {
    // If a rule with this name did not yet exist, we can continue with adding it as a new rule
    if (e.status === 404) {
      http.get(`../api/elastalert/rules/${originalRuleID}`).then(resp => {
        // Get content of original rule
        const yaml = resp.data;

        // Save new rule with original content
        saveRule(http, newRuleID, yaml, onSuccess, onFail);
      }).catch(e => onFail(e));
    } else {
      // In case a different error happened on the server
      onFail(e);
    }
  });
};
