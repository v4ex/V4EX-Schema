import schemasIndex from '../schema/index.json'
// import schemasJsText from '../schema/compile/schemas.cjs.txt'

export default {
  async fetch(request, env) {
    const Url = new URL(request.url)

    // ========================================================================
    // Handle root request

    if (Url.pathname == '/') {
      const schemasKey = Object.keys(schemasIndex)
      let html = '<ul>'
      schemasKey.forEach(key => {
        let $id = (new URL(key, 'https://schema.v4ex.com')).href
        html += `<li><a href="${$id}" target="_blank">${$id}</a> -> ${schemasIndex[key]}</li>`
      })
      html += '</ul>'

      return new Response(html, {
        status: 200,
        headers: {
          "content-type": "text/html;charset=UTF-8"
        }
      })
    }


    // ========================================================================
    // Handle schemas.js file request

    // if (Url.pathname == '/schemas.js') {
      
      // const event = {}
      // event.request = request
      // const options = {}
      // const schemasJsFile = await getAssetFromKV(event, options)

      // console.log(env)

    //   return new Response(schemasJsText, { status: 200 })
    // }


    // ========================================================================
    // Handle schema request

    const schema = Url.pathname.split('/')[1]
    if (schemasIndex.hasOwnProperty(schema)) {
      // BUG
      // Too many redirects
      // return fetch(schemasIndex[schema])
      return Response.redirect(schemasIndex[schema], 301)
    }


    // ========================================================================
    // Fallback response

    return new Response('V4EX', { status: 200 })
  },
}
