const auth = (req, res, next) => {
  const { tcc_token } = req.headers

  if (tcc_token !== process.env.VERXUS_TOKEN) {
    return res.status(403).json('Invalid token!')
  }

  return next()
}

module.exports = auth
