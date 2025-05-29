/* eslint-disable */
// @ts-nocheck
import { defineNuxtPlugin, useRuntimeConfig } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  const { public: config } = useRuntimeConfig()
  const yandexMetricaId = config.yandexMetricaId

  if (!import.meta.dev && yandexMetricaId) {
    _nuxtApp.hook('app:mounted', () => {
      (function (m, e, t, r, i, k, a) {
        m[i] =
          m[i] ||
          function () {
            (m[i].a = m[i].a || []).push(arguments);
          };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) {
            return;
          }
        }
        (k = e.createElement(t)),
          (a = e.getElementsByTagName(t)[0]),
          (k.async = 1),
          (k.src = r),
          a.parentNode.insertBefore(k, a);
      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

      ym(yandexMetricaId, 'init', {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    })

    _nuxtApp.hook('page:finish', () => {
      ym(yandexMetricaId, 'hit', window.location.href);
    });
  }
})
