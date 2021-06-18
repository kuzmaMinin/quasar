<template>
    <div class="full-width relative-position">
        <q-table
            :data="getAllUsers"
            :columns="columns"
            row-key="name"
            :pagination.sync="pagination"
            :filter="filter"
            :loading="loading"
            hide-pagination
        >
            <template #body="props">
                <q-tr :props="props">
                    <q-td
                        key="name"
                        :props="props.data"
                    >
                        {{ props.row.firstName }}
                    </q-td>
                    <q-td
                        key="surname"
                        :props="props.data"
                    >
                        {{ props.row.lastName }}
                    </q-td>
                    <q-td
                        key="email"
                        :props="props.data"
                    >
                        {{ props.row.email }}
                    </q-td>
                    <q-td
                        key="age"
                        :props="props.data"
                    >
                        <q-badge
                            color="red"
                            v-if="new Date().getFullYear() - 2003 === props.row.age"
                        >
                            {{ props.row.age }}
                        </q-badge>
                        <template v-else>
                            {{ props.row.age }}
                        </template>
                    </q-td>
                    <q-td
                        :props="props"
                        key="action"
                    >
                        <q-btn
                            color="primary"
                            icon-right="edit"
                            no-caps
                            flat
                            dense
                            @click="onEditButton(props.row)"
                        />
                        <q-btn
                            color="negative"
                            icon-right="delete"
                            no-caps
                            flat
                            dense
                            @click="onDelete(props.row.id)"
                        />
                    </q-td>
                </q-tr>
            </template>
            <template #top>
                <q-btn
                    color="primary"
                    label="Add user"
                    @click="showModal"
                />
                <q-space/>
                <q-input
                    borderless
                    debounce="300"
                    dense
                    v-model="filter"
                    placeholder="Search"
                >
                    <template #append>
                        <q-icon name="search"/>
                    </template>
                </q-input>
            </template>
        </q-table>

        <div class="row justify-center q-mt-md">
            <q-pagination
                v-model="pagination.page"
                color="grey-8"
                :max="pagesNumber"
                size="sm"
            />
        </div>
        <transition name="fade">
            <UserModal
                v-if="visibleModal"
                @close-modal="closeModal"
                @submit-modal="submitModal"
                @edit-modal="editModal"
                @reset-modal="resetModal"
                @edit-input="editInput"
                :prop-email="userFields.email"
                :prop-surname="userFields.surname"
                :prop-age="userFields.age"
                :prop-name="userFields.name"
                :edit="this.edit"
            />
        </transition>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import UserModal from 'components/UserModal'

    export default {
        name: 'PhoneBook',
        components: {UserModal},
        data() {
            return {
                loading: false,
                visibleModal: false,
                edit: false,
                userFields: {
                    id: '',
                    email: '',
                    surname: '',
                    name: '',
                    age: ''
                },
                filter: '',
                pagination: {
                    sortBy: 'desc',
                    descending: false,
                    page: 1,
                    rowsPerPage: 10
                },
                columns: [
                    {
                        name: 'firstName',
                        required: true,
                        label: 'Имя',
                        align: 'left',
                        field: row => row.firstName,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'lastName',
                        required: true,
                        label: 'Фамилия',
                        align: 'left',
                        field: row => row.lastName,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'email',
                        required: true,
                        label: 'Email',
                        align: 'left',
                        field: row => row.email,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'age',
                        required: true,
                        label: 'Возраст',
                        align: 'left',
                        field: row => row.age,
                        format: val => `${val}`,
                        sortable: true
                    },
                    {
                        name: 'action',
                        align: 'left',
                        field: 'action'
                    }
                ]
            }
        },
        methods: {
            ...mapActions('book', ['fetchUsers', 'addUser', 'deleteUser', 'editUser']),
            resetModal: function () {
                this.userFields.id = ''
                this.userFields.name = ''
                this.userFields.email = ''
                this.userFields.age = ''
                this.userFields.surname = ''
            },
            showModal: function () {
                this.resetModal()
                this.visibleModal = true
            },
            closeModal: function () {
                this.visibleModal = false
                this.edit = false
            },
            submitModal: function () {
                const newUser = {
                    firstName: this.userFields.name,
                    age: this.userFields.age,
                    lastName: this.userFields.surname,
                    email: this.userFields.email
                }
                this.addUser(newUser)
                this.closeModal()
            },

            editModal: function () {
                this.editUser(this.userFields)
                this.closeModal()
            },
            editInput: function (data) {
                this.userFields[data.dataset.id] = data.value
            },
            onEditButton: function (data) {
                this.edit = true

                this.userFields.id = data.id
                this.userFields.email = data.email
                this.userFields.surname = data.lastName
                this.userFields.name = data.firstName
                this.userFields.age = data.age

                this.visibleModal = true
            },
            onDelete: function (id) {
                console.log(id)
                this.deleteUser(id)
            }
        },
        async created() {
            this.loading = true
            await this.fetchUsers()
            this.loading = false
        },
        computed: {
            ...mapGetters('book', ['getAllUsers']),
            pagesNumber: function () {
                return Math.ceil(this.getAllUsers.length / this.pagination.rowsPerPage)
            }
        }
    }
</script>

<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .25s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
