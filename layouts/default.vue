<template>
  <div>
    <SiteNav />
    <Nuxt />
    <SiteFooter />
  </div>
</template>

<script>
/**
 * Layout: Default
 * -----------------------------------------------------------------------------
 */
import SiteFooter from '@/components/footer/Footer'
import SiteNav from '@/components/site-nav/SiteNav'

export default {
  components: {
    SiteFooter,
    SiteNav,
  },
}
</script>
