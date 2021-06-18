<template>
    <q-page class="flex flex-start">
        <PhoneBook/>
    </q-page>
</template>

<script>
    import PhoneBook from 'components/PhoneBook.vue'

    export default {
        name: 'PageIndex',
        components: {PhoneBook}
    }
</script>
