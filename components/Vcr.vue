<template>
  <div
    class="tv-screen"
    :style="[defaultColours, albumColours]"
    :class="[isLoaded ? 'loaded' : 'not-loaded']"
  >
    <div class="container">
      <div class="tv-screen__init">AV-1</div>
      <h1 class="tv-screen__white-text tv-screen__intro-heading" tabindex="0">
        Jon Ashcroft
      </h1>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste
        doloremque repudiandae nemo architecto quidem nulla temporibus ex,
        eveniet, nobis quis earum rerum accusamus fugit ut ad nesciunt, soluta
        natus hic ullam odio vero.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste
        doloremque repudiandae nemo architecto quidem nulla temporibus ex,
        eveniet, nobis quis earum rerum accusamus fugit ut ad nesciunt, soluta
        natus hic ullam odio vero.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste
        doloremque repudiandae nemo architecto quidem nulla temporibus ex,
        eveniet, nobis quis earum rerum accusamus fugit ut ad nesciunt, soluta
        natus hic ullam odio vero.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste
        doloremque repudiandae nemo architecto quidem nulla temporibus ex,
        eveniet, nobis quis earum rerum accusamus fugit ut ad nesciunt, soluta
        natus hic ullam odio vero.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste
        doloremque repudiandae nemo architecto quidem nulla temporibus ex,
        eveniet, nobis quis earum rerum accusamus fugit ut ad nesciunt, soluta
        natus hic ullam odio vero.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste
        doloremque repudiandae nemo architecto quidem nulla temporibus ex,
        eveniet, nobis quis earum rerum accusamus fugit ut ad nesciunt, soluta
        natus hic ullam odio vero.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro iste
        doloremque repudiandae nemo architecto quidem nulla temporibus ex,
        eveniet, nobis quis earum rerum accusamus fugit ut ad nesciunt, soluta
        natus hic ullam odio vero.
      </p>

      <NowPlaying @updateColours="doColours" />
    </div>
  </div>
</template>

<script>
import NowPlaying from '~/components/NowPlaying.vue'

export default {
  components: {
    NowPlaying
  },
  data() {
    return {
      isLoaded: false,
      defaultColours: {
        color: '#fff',
        backgroundColor: '#0127f8'
      },
      albumColours: {
        color: '#fff',
        backgroundColor: '#0127f8'
      }
    }
  },
  mounted() {},
  methods: {
    doColours(colours) {
      this.albumColours = colours
      this.isLoaded = true
    }
  }
}
</script>

<style src="~/assets/styles/components/vcr.scss" lang="scss"></style>
