// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ['stqhnnknkophznapfdst.supabase.co', 's.gravatar.com']
//   }
// }
const { withSuperjson } = require('next-superjson')
module.exports = withSuperjson()({
  reactStrictMode: true,
  images: {
    domains: ['stqhnnknkophznapfdst.supabase.co', 's.gravatar.com']
  }
})
