const config = require('./config.json');
const { sendToSlack, getSlotsForAge, fetch, watch } = require('./utils');

function check() {
  return fetch(config.cowin.search)
    .then((res) => res.json())
    .then((response) => {
      const slotsForAge = getSlotsForAge(response);

      if (slotsForAge.length) {
        const msg = slotsForAge
          .map((s) => `[${s.pin}] ${s.name}. Vaccines: ${s.vaccines}`)
          .join('\n');

        sendToSlack(`Found slots!\n${msg}`);

        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error(error);

      sendToSlack('Script errored!', error);

      return true;
    });
}

watch(check);
