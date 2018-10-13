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

export const saveRule = (http, ruleID, yaml, onSucces, onFail) => {
  http
    .post(`../api/elastalert/rules/${ruleID}`, {
      yaml: yaml
    })
    .then(resp => {
      if (resp.status === 200) {
        onSucces();
      }
    })
    .catch(e => {
      onFail(e);
    });
};

export const copyRule = (http, originalRuleID, newRuleID, onSucces, onFail) => {
  http.get(`../api/elastalert/rules/${originalRuleID}`).then(resp => {
    // Get content of original rule
    const yaml = resp.data;

    // Save new rule with original content
    saveRule(http, newRuleID, yaml, onSucces, onFail);
  });
};
