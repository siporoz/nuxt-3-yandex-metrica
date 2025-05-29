import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  id: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'yandex-metrica',
    configKey: 'yandexMetrica',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    id: '',
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.yandexMetricaId = options.id
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
