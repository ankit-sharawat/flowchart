<template>
<div class='ui basic content center aligned segment'>
      <div class='content'>
          <div class='field'>
            <b-input-group prepend="Key" :model="key">
              <b-form-input v-model="value"></b-form-input>
              <b-button @click="addmore()"></b-button>
            </b-input-group>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data () {
    return {
      top: '',
      value: '',
      key: '',
    }
  },
  methods: {
    addmore (){
      this.$emit('add')
    }
  }
}
</script>
<style scoped>

</style>
