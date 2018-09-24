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
