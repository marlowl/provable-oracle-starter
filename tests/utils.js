const waitForEvent = _event => 
  new Promise((resolve, reject) => 
    _event.watch((err, res) =>
      err ? reject(err) : (resolve(res), _event.stopWatching())))

const PREFIX = "VM Exception while processing transaction: "

module.exports = {
  waitForEvent,
  PREFIX
}
