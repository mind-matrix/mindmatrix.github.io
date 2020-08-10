<template>
    <v-container fluid>
        <v-card>
            <v-card-title>Art</v-card-title>
            <v-card-subtitle>Check out my latest 3D artworks.</v-card-subtitle>
            <v-card-text>
                <v-list>
                    <v-list-item v-for="(art, index) in arts" :to="`/art/post/${art.slug}`" :key="index">
                        <v-list-item-avatar size="150">
                            <v-img :src="art.cover" />
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold">
                                {{ art.title }}
                            </v-list-item-title>
                            {{ art.description }}
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
    async asyncData({ $content }) {
        let arts = await $content('art').sortBy('createdAt', 'desc').only(['title','slug','cover','description']).fetch();
        console.log(arts);
        return {
            arts
        };
    }
}
</script>
