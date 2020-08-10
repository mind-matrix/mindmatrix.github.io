<template>
    <v-card outlined>
        <v-row class="text-left" dense justify="space-between">
            <v-col cols="auto">
                <v-card-title>
                    {{ repo.name }}
                </v-card-title>
                <v-card-subtitle>
                    {{ repo.full_name }}
                </v-card-subtitle>
            </v-col>
            <v-col cols="auto" class="ma-2 text-right">
                <div class="d-block text-secondary ellipsis">
                    <v-icon>mdi-scale-balance</v-icon>
                    {{ repo.license.name }}
                </div>
                <div class="d-block text-secondary mt-2">
                    <v-icon>{{ getLanguageIcon(repo.language) }}</v-icon>
                    {{ repo.language }}
                </div>
            </v-col>
        </v-row>
        <v-card-text class="text-left">
            {{ repo.description }}
        </v-card-text>
        <v-card-actions>
            <v-btn tag="a" :href="repo.html_url" target="_blank" tile elevation="0" color="primary">
                view
                <v-icon>
                    mdi-open-in-new
                </v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ['repo'],
    methods: {
        getLanguageIcon(lang) {
            lang = lang.toLowerCase();
            if ([
                'c','cpp','csharp','css3','fortran','go','haskell',
                'html5','java','javascript','kotlin','lua','markdown',
                'php','python','r','ruby','ruby-on-rails','swift','typescript','xaml'
            ].includes(lang)) {
                    return `mdi-language-${lang}`;
            }
            return 'mdi-code-json';
        }
    }
}
</script>

<style scoped>
.ellipsis {
    max-width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
