export default {
  state: {
    userFields: [
      {
        label: 'Name',
        field: 'name',
        type: 'string',
        validator: 'nameValidator'
      },
      {
        label: 'Gender',
        field: 'gender',
        type: 'select',
        validator: 'genderValidator',
        meta: {
          values: [
            {
              label: 'Male',
              value: 'male'
            },
            {
              label: 'Female',
              value: 'female'
            }
          ]
        }
      },
      {
        label: 'Subscription',
        field: 'sub',
        type: 'date',
        validator: 'dateValidator'
      }
    ],
    userData: {
      name: 'User Name',
      gender: 'male',
      sub: '2020-03-04Т13:40Z'
    },
    status: false
  },
  mutations: {
    updateUserData(state, payload) {
      state.userData[payload.field] = payload.value
    },
    setStatus(state, payload) {
      state.status = payload
    }
  },
  actions: {
    SET_STATUS({ commit }, payload) {
      commit('setStatus', payload)
    }
  },
  getters: {
    getStatus: (state) => state.status,
    getUserFields: (state) => state.userFields,
    getUserData: (state) => (field) => state.userData[field]
  }
}
