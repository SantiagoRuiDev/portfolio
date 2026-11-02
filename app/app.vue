<script setup lang="ts">
import { definePerson, defineWebSite } from '#imports'

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  titleTemplate: '%s - Santiago Rui',
  twitterCard: 'summary_large_image'
})

useSchemaOrg([
  defineWebSite({
    name: 'Santiago Rui',
    url: 'https://santiagorui.lat',
    inLanguage: 'en'
  }),
  definePerson({
    name: 'Santiago Rui',
    jobTitle: 'Software Engineer',
    url: 'https://santiagorui.lat',
    image: 'https://avatars.githubusercontent.com/u/117700156?v=4',
    email: 'santiagoruicontact@gmail.com',
    sameAs: [
      'https://github.com/SantiagoRuiDev',
      'https://www.linkedin.com/in/santiago-rui/',
      'https://x.com/santiagoruiar'
    ],
    worksFor: {
      '@type': 'Organization',
      'name': 'Althera',
      'url': 'https://www.althera.com.ar'
    }, knowsLanguage: ['Spanish', 'English', 'Italian'],
    alumniOf: {
      '@type': 'EducationalOrganization',
      'name': 'UNICEN - Universidad Nacional del Centro de la Provincia de Buenos Aires'
    }
  })
])

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData('navigation', () => {
    return Promise.all([
      queryCollectionNavigation('blog')
    ])
  }, {
    transform: data => data.flat()
  }),
  useLazyAsyncData('search', () => {
    return Promise.all([
      queryCollectionSearchSections('blog')
    ])
  }, {
    server: false,
    transform: data => data.flat()
  })
])
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
