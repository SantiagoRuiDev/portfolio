// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  // https://nuxtseo.com/docs/site-config/guide/getting-started
  site: {
    url: 'https://santiagorui.lat',
    name: 'Santiago Rui',
    description: 'Portfolio of Santiago Rui, a Software Engineer based in Argentina building digital products end to end with AI-assisted workflows.',
    language: 'en',
    indexable: true
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  // Remote images used in blog posts and avatars (NuxtImg)
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com'
      }
    ]
  },

  routeRules: {
    // Hidden (not deleted) for now: redirect any direct visits to the homepage.
    // Remove this rule to bring the page back once it's needed again.
    '/speaking': {
      redirect: '/'
    }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    clientBundle: {
      // Scan component usage and inline custom (brand) icons into the client
      // & server bundles so they never depend on the runtime API endpoint
      // (which races with SSR / prerender cold caching).
      scan: true,
      includeCustomCollections: true
    },
    customCollections: [
      {
        prefix: 'brand',
        dir: './app/assets/icons'
      }
    ]
  },

  ogImage: {
    zeroRuntime: true
  },

  prerender: {
    routes: [
      '/',
      // Include SEO files as physical files in the deploy output
      '/robots.txt',
      '/sitemap.xml'
    ],
    crawlLinks: true
  }
})
