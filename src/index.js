export default {
  async fetch(request, env) {
    const Url = new URL(request.url)

    // ========================================================================
    // Handle root request

    if (Url.pathname == '/') {
      return new Response('V4EX', { status: 200 })
    }

    // ========================================================================
    // Handle schema request

    const schema = Url.pathname.split('/')[1]
    switch (schema) {
      case 'mining-task': {
        return fetch('https://v4ex-coin.v4ex.workers.dev/schema/mining-task')
      }
      case 'mining-task-work': {
        return fetch('https://v4ex-coin.v4ex.workers.dev/schema/mining-task-work')
      }
      default: {
        return new Response('V4EX', { status: 200 })
      }
    }
  },
}
