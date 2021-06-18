<template>
    <div
        class="q-pa-md q-gutter-sm absolute-center"
    >
        <div
            class="q-card justify-center q-pa-md"
            style="width: 400px"
        >
            <q-form
                @submit.prevent="router"
                @reset="onReset"
                class="q-gutter-md"
            >
                <q-input
                    filled
                    data-id="name"
                    :value="propName"
                    @change="onEdit"
                    label="Your name *"
                    lazy-rules
                    :rules="[
                        val => val && val.length > 0 || 'Please type something',
                        val => val && !val.match(/\d+/g) || 'Is your name is Number type?'
                    ]"
                />

                <q-input
                    filled
                    data-id="surname"
                    :value="propSurname"
                    @change="onEdit"
                    label="Your surname *"
                    lazy-rules
                    :rules="[
                        val => val && val.length > 0 || 'Please type something',
                        val => val && !val.match(/\d+/g) || 'Is your name is Number type?'
                    ]"
                />

                <q-input
                    filled
                    data-id="email"
                    :value="propEmail"
                    @change="onEdit"
                    label="Your email *"
                    lazy-rules
                    :rules="[
                        val => val && val.includes('@') || 'Email must include @',
                        val => val && val.length > 3 || 'Email is too short',
                    ]"
                />

                <q-input
                    filled
                    data-id="age"
                    type="number"
                    @change="onEdit"
                    :value="propAge"
                    label="Your age *"
                    lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Please type your age',
                        val => val > 0 && val < 100 || 'Please type a real age'
                    ]"
                />
                <div>
                    <template v-if="this.edit">
                        <q-btn
                            label="Update"
                            type="submit"
                            color="secondary"
                        />
                    </template>
                    <template v-else>
                        <q-btn
                            label="Submit"
                            type="submit"
                            color="positive"
                        />
                        <q-btn
                            label="Reset"
                            type="reset"
                            color="negative"
                            flat
                            class="q-ml-sm"
                        />
                    </template>
                    <q-btn
                        label="Close"
                        color="primary"
                        flat
                        class="q-ml-sm"
                        @click="onClose"
                    />
                </div>
            </q-form>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            propEmail: {
                type: String,
                default: ''
            },
            propAge: {
                type: [Number, String],
                default: 0
            },
            propSurname: {
                type: String,
                default: ''
            },
            propName: {
                type: String,
                default: ''
            },
            edit: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onSubmit: function () {
                this.$emit('submit-modal')
            },
            onReset: function () {
                this.$emit('reset-modal')
            },
            onClose: function () {
                this.$emit('close-modal')
            },
            onEditModal: function () {
                this.$emit('edit-modal')
            },
            onEdit: function (e) {
                this.$emit('edit-input', e.target)
            },
            router: function () {
                this.edit ? this.onEditModal() : this.onSubmit()
            }
        }
    }
</script>
