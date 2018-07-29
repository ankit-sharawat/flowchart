<template>
<b-row>
<b-col>
<div class='ui basic content center aligned segment'>
      <div class='content'>
      {{name}}
          <div class='field'>
            <label>Title</label>
            <input v-model="title" type='text' ref='title'>
          </div>
          <div class='ui two button attached buttons'>
            <button class='ui basic blue button' v-on:click="sendForm">
              Create
            </button>
            <button class='ui basic red button' @click="close">
              Cancel
            </button>
          </div>
        </div>
  </div>
</b-col>
<b-col>
  <b-card title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </p>
    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
  </b-col>
  </b-row>
</template>

<script>
export default {
  props: ["name"],
  data () {
    return {
      top: '',
      left: '',
      title: '',
    }
  },
  methods: {
    close () {
      this.$emit('close-modal');
    },
    clearForm () {
      this.title = ""
    },
    sendForm () {
      if (this.title.length > 0) {
        this.$emit('add-operator', {
           top: 50,
           left: 60,
           properties: {
             title: this.title,
             class: this.name,
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
      this.clearForm();
    }
  }
}
</script>
<style  scoped>
.modal-header {
  border-bottom:0px
}
</style>
