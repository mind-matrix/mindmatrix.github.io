<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn tag="a" href="https://github.com/mind-matrix/" target="_blank" icon>
        <v-icon large>
          mdi-github
        </v-icon>
      </v-btn>
      <v-btn tag="a" href="https://www.linkedin.com/in/sagnik-modak/" target="_blank" icon>
        <v-icon large>
          mdi-linkedin
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: 'jG0Ke4b9LviBTWijok6ztz4QxRc9qdnKFpKo0-CKqHM'
        },
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: '#ffffff'
        }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'manifest',
          href: '/site.webmanifest'
        }
      ]
    }
  },
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Blog',
          to: '/blog'
        },
        {
          icon: 'mdi-flask-outline',
          title: 'Lab',
          to: '/lab'
        },
        {
          icon: 'mdi-brush',
          title: 'Art',
          to: '/art'
        },
        {
          icon: 'mdi-help-circle',
          title: 'About',
          to: '/about'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'mind-matrix.github.io'
    }
  }
}
</script>
