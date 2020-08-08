<template>
    <v-container fluid>
        About me.
    </v-container>
</template>

<script>
export default {
    head () {
        return {
            title: 'ABOUT | Sagnik Modak',
            meta: [
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: 'ABOUT | Sagnik Modak'
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: 'This is the page where you get to know the awesome person I am.'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: 'A little bit about me.'
                }
            ]
        }
    }
}
</script>
