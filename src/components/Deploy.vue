<template>
<div class='ui basic content center aligned segment'>
      <div class='content'>
          <div class='field'>
            <label>Title</label>
            <input v-model="title" type='text' ref='title' defaultValue="">
          </div>
          <div class='ui two button attached buttons'>
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
           top: 50,
           left: 60,
           properties: {
             title: this.title,
             class:"deploy",
             inputs: {
               input_1: {
                 label: '',
               }
             },
             outputs: {
               output_1: {
                 label: '',
               }
             }
           }
        })
      }
    }
  }
}
</script>
<style scoped>

 .deploy{
  color:white;
  height:60px !important;
  background: linear-gradient(to right, #6e2a8a , #c280d8);
  border-radius: 8px;
  border-bottom: 0px;
}

.deploy  .flowchart-operator-connector-arrow {
  border: 6px solid rgb(162, 23, 221);
  border-radius: 6px;
}

.deploy .flowchart-operator-connector:hover .flowchart-operator-connector-arrow {
    border-left: 6px solid rgb(162, 23, 221);
}

</style>
