<template>
      <div class='content'>
        Train Component
        <div class='ui form'>
          <div class='field'>
            <label>Title</label>
            <input v-model="title" type='text' ref='title' defaultValue="">
          </div>
          <div class='field'>
            <label>Left</label>
            <input v-model="left" type='text' ref='project' defaultValue="">
            <label>Top</label>
            <input v-model="top" type='text' ref='project' defaultValue="">
          </div>
          <div >
            <button class='ui basic blue button' v-on:click="sendForm()">
              Create
            </button>
            <button class='ui basic red button' v-on:click="closeForm">
              Cancel
            </button>
          </div>
        </div>
      </div>   
</template>

<script>
export default {
  props: ['active'],
  data () {
    return {
      top: '',
      left: '',
      title: '',
    }
  },
  methods: {
    openForm () {
      this.isCreating = true
    },
    closeForm () {
      this.isCreating = false
    },
    sendForm () {
      if (this.title.length > 0) {
        this.$emit('add-operator', {
           top: this.top,
           left: this.left,
           properties: {
             title: this.title,
             inputs: {
               input_1: {
                 label: 'Input 1',
               }
             },
             outputs: {
               output_1: {
                 label: 'Output 1',
               }
             }
           }
        })
      }
    }
  }
}
</script>
