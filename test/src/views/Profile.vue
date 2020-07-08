<template>
  <div>
    <h1>Профиль пользователя</h1>
    <div v-for="(input, i) in getUserFields" :key="'input' + i">
      <edit-value
        :label="input.label"
        :type="input.type"
        :field="input.field"
        :metaVal="input.meta"
        :validator="input.validator"
        v-on:updStatusVal="updStatus"
      ></edit-value>
    </div>
    <button @click="save">Сохранить</button>
    <p v-show="getStatus">
      Перед сохранеием исправте ошибки
    </p>
  </div>
</template>

<script>
import EditValue from '../components/edit-val'

export default {
  name: 'Profile',
  data() {
    return {}
  },
  components: {
    EditValue
  },
  methods: {
    save() {
      if (!this.getStatus) {
        console.log('Данные сохранены')
      } else {
        console.log('Ошибка')
      }
    },
    updStatus(status) {
      this.$store.dispatch('SET_STATUS', status)
    }
  },
  computed: {
    getUserFields() {
      return this.$store.getters.getUserFields
    },
    getStatus() {
      return this.$store.getters.getStatus
    }
  }
}
</script>
