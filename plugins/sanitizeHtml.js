import Vue from 'vue'
import sanitizeHtml from 'sanitize-html'

function renderHtml(content) {
  return sanitizeHtml(content, {})
}

Vue.mixin({
  methods: {
    renderHtml
  }
})
