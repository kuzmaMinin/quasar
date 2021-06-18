import axios from 'axios'

export async function fetchUsers({commit}) {
    const res = await axios
        .get('http://fakeapi.jsonparseronline.com/users')
        .catch(err => console.log(err))

    commit('setUsers', res.data)
    console.log(res.data)
}

export async function addUser({commit}, user) {
    const res = await axios
        .post('http://fakeapi.jsonparseronline.com/users', user)
        .catch(err => console.log(err))

    commit('setNewUser', res.data)
    console.log(res.data)
}

export async function deleteUser({commit}, userId) {
    const res = await axios
        .delete(`http://fakeapi.jsonparseronline.com/users/${userId}`)
        .catch(err => console.log(err))

    commit('setDeleteUser', userId)
    console.log(res)
}

export async function editUser({commit}, data) {
    const res = await axios
        .put(`http://fakeapi.jsonparseronline.com/${data.id}`)
        .catch(err => console.log(err))

    commit('setEditUser', data)
    console.log(res)
}
