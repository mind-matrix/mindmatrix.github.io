<template>
    <v-container fluid>
        Outline
        <v-divider />
        <v-list>
            <v-list-item
                :style="{ 'margin-left': `${getMargin(link.depth)}px`, 'font-size': `${getSize(link.depth)}px`}"
                :key="index"
                v-for="(link, index) in links"
                class="link font-weight-regular"
            >
                <a :href="`#${link.id}`" class="link-tag">
                    {{link.text}}
                </a>
            </v-list-item>
        </v-list>
        <v-divider />
    </v-container>
</template>

<script>
export default {
    props: {
        header: {
            type: String,
            default: 'Outline'
        },
        links: {
            type: Array,
            required: true
        }
    },
    methods: {
        getMargin(depth) {
            return Math.max(depth - 2, 0) * 24;
        },
        getSize(depth) {
            return 12 + (6 - depth) * 2;
        }
    },
}
</script>

<style scoped>

.link-tag {
    text-decoration: none;
    color: inherit;
}

.link-tag::before {
    content: '#';
    margin-right: 2px;
    opacity: 0;
}

.link:hover > .link-tag::before {
    opacity: 1;
}
</style>
