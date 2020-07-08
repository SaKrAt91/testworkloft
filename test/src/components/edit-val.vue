<template>
  <div class="data_field">
    <!-- string -->
    <label v-if="type === 'string'">
      {{ label }}
      <input
        type="text"
        v-model="userData"
        @input="showErr = false"
        @change="valid($event.target.value, validator)"
        class="input"
      />
    </label>
    <!-- select -->
    <label v-else-if="type === 'select'">
      {{ label }}
      <select
        @change="valid($event.target.value, validator)"
        v-model="userData"
      >
        <option
          :value="option.value"
          v-for="(option, i) in metaVal.values"
          :key="'option' + i"
          >{{ option.label }}</option
        >
      </select>
    </label>
    <!-- date -->
    <label v-else-if="type === 'date'">
      {{ label }}
      <input
        type="datetime-local"
        v-model="userData"
        @input="showErr = false"
        @change="valid($event.target.value, validator)"
        class="input"
      />
    </label>
    <p v-if="showErr">{{ errorText }}</p>
  </div>
</template>

<script>
export default {
  name: 'EditValue',
  props: ['inValue', 'label', 'type', 'field', 'validator', 'metaVal'],

  data() {
    return {
      val: '',
      showErr: false,
      errorText: ''
    }
  },
  methods: {
    valid(value, validator) {
      this.showErr = false
      this.errorText = ''

      if (validator === 'nameValidator') {
        value = this._.trim(value)
        if (value.match(/\d/)) {
          this.showErr = true
          this.errorText = 'Введено неверное имя'
        }
      } else if (validator === 'genderValidator') {
        const indexVal = this._.findIndex(this.metaVal.values, ['value', value])
        if (indexVal >= 0) {
        } else {
          this.showErr = true
          this.errorText = 'Введен неверный пол'
        }
      } else if (validator === 'dateValidator') {
        value = this.$moment(
          value,
          this.$moment.HTML5_FMT.DATETIME_LOCAL
        ).format('YYYY-MM-DD[T]HH:mm[Z]')
        if (this.$moment(value, 'YYYY-MM-DD[T]HH:mm[Z]').isValid() === true) {
        } else {
          this.showErr = true
          this.errorText = 'Введена неверная дата'
        }
      }
      this.$emit('updStatusVal', this.showErr)
      this.$store.commit('updateUserData', {
        field: this.field,
        value: value
      })
    }
  },
  computed: {
    userData: {
      get() {
        if (this.type === 'date') {
          const t = this.$store.getters.getUserData(this.field)
          const d = this.$moment(t, 'YYYY-MM-DD[T]HH:mm[Z]').format(
            this.$moment.HTML5_FMT.DATETIME_LOCAL
          )
          return d
        } else {
          return this.$store.getters.getUserData(this.field)
        }
      },
      set(value) {
        if (this.type === 'date') {
          value = this.$moment(
            value,
            this.$moment.HTML5_FMT.DATETIME_LOCAL
          ).format('YYYY-MM-DD[T]HH:mm[Z]')
        }
        this.$store.commit('updateUserData', {
          field: this.field,
          value: value
        })
      }
    }
  },
  destroyed() {
    this.$destroy()
  }
}
</script>
