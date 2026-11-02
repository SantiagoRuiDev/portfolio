<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { global } = useAppConfig()

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.buttons"
          class="flex flex-wrap items-center gap-2"
        >
          <UButton
            v-for="(button, index) in page.buttons"
            :key="index"
            v-bind="button"
          />
        </div>
      </template>
      <UColorModeAvatar
        class="sm:rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-bg"
        :light="global.picture?.light!"
        :dark="global.picture?.dark!"
        :alt="global.picture?.alt!"
      />
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <div class="space-y-8">
        <div class="space-y-4">
          <p
            v-for="(paragraph, index) in page.intro"
            :key="`intro-${index}`"
            class="text-muted text-sm sm:text-base leading-7"
          >
            {{ paragraph }}
          </p>
        </div>

        <div
          v-for="section in page.sections"
          :key="section.heading"
          class="space-y-3"
        >
          <h3 class="text-lg font-medium text-highlighted">
            {{ section.heading }}
          </h3>
          <p
            v-for="(paragraph, index) in section.paragraphs"
            :key="`${section.heading}-${index}`"
            class="text-muted text-sm sm:text-base leading-7"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <USeparator class="my-10" />

      <div class="grid gap-10 lg:grid-cols-5 items-start">
        <div class="lg:col-span-3">
          <h2 class="text-xl font-medium text-highlighted">
            Tech Stack
          </h2>
          <p class="text-sm text-muted mt-1">
            Technologies I use to build and ship products every day.
          </p>
          <ul class="flex flex-wrap gap-2.5 mt-5">
            <Motion
              v-for="(skill, index) in page.techStack"
              :key="skill.name"
              as="li"
              :initial="{ opacity: 0, transform: 'scale(0.9)' }"
              :animate="{ opacity: 1, transform: 'scale(1)' }"
              :transition="{ delay: 0.1 + index * 0.05 }"
              class="inline-flex items-center gap-2 rounded-full border border-default bg-elevated/50 px-3.5 py-1.5 text-sm font-medium text-default hover:bg-accented/10 hover:border-accented/50 transition-colors"
            >
              <UIcon
                :name="skill.icon"
                :style="skill.color ? { color: skill.color } : undefined"
                class="size-4 shrink-0"
              />
              {{ skill.name }}
            </Motion>
          </ul>

          <Motion
            :initial="{ opacity: 0, transform: 'translateY(10px)' }"
            :animate="{ opacity: 1, transform: 'translateY(0)' }"
            :transition="{ delay: 0.5 }"
          >
            <NuxtLink
              :to="page.githubCard.to"
              target="_blank"
              rel="noopener noreferrer"
              class="group mt-8 flex flex-col gap-4 rounded-xl border border-default bg-elevated/50 p-5 transition-colors hover:border-accented/50 hover:bg-accented/10 focus-visible:outline-primary/25 sm:flex-row sm:items-center"
            >
              <span
                class="inline-flex items-center justify-center size-10 rounded-full border border-default bg-default shrink-0"
              >
                <UIcon
                  name="i-simple-icons-github"
                  class="size-5"
                />
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-medium text-highlighted">
                  {{ page.githubCard.title }}
                </span>
                <span class="block text-sm text-muted mt-0.5">
                  {{ page.githubCard.description }}
                </span>
              </span>
              <span class="text-sm text-primary flex items-center gap-1 shrink-0">
                {{ page.githubCard.label }}
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                />
              </span>
            </NuxtLink>
          </Motion>
        </div>

        <div class="lg:col-span-2">
          <h2 class="text-xl font-medium text-highlighted">
            At a Glance
          </h2>
          <p class="text-sm text-muted mt-1">
            Key facts about me and how I work.
          </p>
          <div class="mt-5 space-y-5">
            <Motion
              v-for="(item, index) in page.info"
              :key="item.label"
              :initial="{ opacity: 0, transform: 'translateY(10px)' }"
              :animate="{ opacity: 1, transform: 'translateY(0)' }"
              :transition="{ delay: 0.2 + index * 0.1 }"
              class="flex items-start gap-3"
            >
              <span
                class="inline-flex items-center justify-center size-9 rounded-full border border-default bg-elevated/50 shrink-0"
              >
                <UIcon
                  :name="item.icon"
                  class="size-4 text-muted"
                />
              </span>
              <div class="min-w-0">
                <p class="text-sm font-medium text-highlighted">
                  {{ item.label }}
                </p>
                <p class="text-sm text-muted mt-0.5 text-balance">
                  {{ item.value }}
                </p>
              </div>
            </Motion>
          </div>
        </div>
      </div>

      <div
        v-if="page.images?.length"
        class="flex flex-row justify-center items-center py-10 -space-x-8"
      >
        <PolaroidItem
          v-for="(image, index) in page.images"
          :key="index"
          :image="image"
          :index
        />
      </div>
    </UPageSection>
  </UPage>
</template>
