export function setUsers (state, users) {
    state.users = users
}

export function setNewUser(state, user) {
    state.users.push(user)
}

export function setDeleteUser(state, userId) {
    state.users = state.users.filter(i => i.id !== userId)
}

export function setEditUser(state, data) {
    const updatedUser = {
        id: data.id,
        firstName: data.name,
        lastName: data.surname,
        email: data.email,
        age: data.age
    }
    const index = state.users.findIndex(i => i.id === data.id)

    if (index !== -1) {
        state.users.splice(index, 1, updatedUser)
    }
}
