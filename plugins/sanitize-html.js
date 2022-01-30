/**
 * Plugin: Sanitize HTML.
 * -----------------------------------------------------------------------------
 */
import sanitizeHtml from 'sanitize-html'

/**
 * Processes and returns a clean HTML string.
 * @param {String} content - HTML string.
 * @returns {String}
 */
export function sanitize(content) {
  return sanitizeHtml(content, {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'article',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'iframe',
      'img',
    ],
    disallowedTagsMode: 'discard',
    allowedAttributes: {
      a: ['href', 'name', 'target', 'class', 'title', 'rel'],
      article: ['class'],
      h1: ['class'],
      pre: ['class'],
      code: ['class'],
      // We don't currently allow img itself by default, but this
      // would make sense if we did. You could add srcset here,
      // and if you do the URL is checked for safety
      img: ['src', 'alt', 'title', 'loading'],
    },
    // Lots of these won't come up by default because we don't allow them
    selfClosing: [
      'img',
      'br',
      'hr',
      'area',
      'base',
      'basefont',
      'input',
      'link',
      'meta',
    ],
    // URL schemes we permit
    allowedSchemes: ['http', 'https', 'ftp', 'mailto'],
    allowedSchemesByTag: {},
    allowedSchemesAppliedToAttributes: ['href', 'src', 'cite'],
    allowProtocolRelative: true,
    transformTags: {
      a: (tagName, attribs) => {
        if (attribs?.title?.includes('image')) {
          return {
            tagName: 'a',
            attribs: {
              class: 'has-image',
              href: attribs.href,
              alt: attribs.alt,
            },
          }
        } else if (
          !['ashcroft.dev', 'jonashcroft.co.uk'].includes(attribs?.href)
        ) {
          return {
            tagName: 'a',
            attribs: {
              href: attribs.href,
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          }
        } else {
          return {
            tagName: 'a',
            attribs: {
              href: attribs.href,
            },
          }
        }
      },
    },
  })
}
