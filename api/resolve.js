import { extract } from 'oembed-parser'

export default async function handler(req, res) {
  const { url, secret } = req.query

  // The 'SECRETS' environment variable contains tokens we may authenticate with
  const secrets = process.env.SECRETS.split(',')

  if (!secrets.includes(secret)) {
    res.statusCode = 401
    res.end("No secret provided")
  }

  if (url == null) {
    res.statusCode = 400
    res.end("No url provided")
  }

  try {
    const embed = await extract(url)
    if (embed) {
      res.statusCode = 200
      res.json(embed)
    } else {
      throw "Not found"
    }
  } catch (error) {
    res.statusCode = 404
    console.error(error)
    res.end(`Embed data for ${url} could not be resolved`)
  }
}
