const { withSuperjson } = require('next-superjson')

const supabaseDomain = process.env.SUPABASE_URL.split('/')[2]
module.exports = withSuperjson()({
  reactStrictMode: true,
  images: {
    domains: [supabaseDomain, 's.gravatar.com']
  }
})
