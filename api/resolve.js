import { extract } from 'oembed-parser'

export default async function handler(req, res) {
  const { url } = req.query

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
