const notFound = (req, res) => res.status(404).send('Route does not exist here')

module.exports = notFound
