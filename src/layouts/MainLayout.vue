<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="leftDrawerOpen = !leftDrawerOpen"
                />

                <q-toolbar-title>
                    Phone | Book
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            content-class="bg-grey-1"
        >
            <q-list>
                <q-item-label
                    header
                    class="text-grey-8"
                />
                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<script>
    import EssentialLink from 'components/EssentialLink.vue'

    const linksData = [
        {
            title: 'HH.ru',
            caption: 'kaluga.hh.ru/kuzmin',
            icon: 'school',
            link: 'https://kaluga.hh.ru/resume/9d2d07cfff06140abe0039ed1f5151596f316e'
        },
        {
            title: 'Github',
            caption: 'github.com/kuzmaMinin',
            icon: 'code',
            link: 'https://github.com/kuzmaMinin/'
        }
    ]

    export default {
        name: 'MainLayout',
        components: {EssentialLink},
        data() {
            return {
                leftDrawerOpen: false,
                essentialLinks: linksData
            }
        }
    }
</script>
