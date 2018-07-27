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
           top: 70,
           left: 70,
           properties: {
             title: this.title,
             class:"train",
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
<style>
.flowchart-operator-outputs .flowchart-operator-connector-arrow {
    right: 0px;
}
.flowchart-operator-connector {
    position:unset;
    padding-top: 0px;
    padding-bottom: 0px;
}
.flowchart-operator .flowchart-operator-inputs-outputs {
    margin-top: 0px;
    margin-bottom: 0px;
    border-radius:10px;
}
.flowchart-operator-connector-arrow {
  top:22px;
}
.flowchart-operator {
  border:0px;
}
 .train {
  padding: 15px;
  color:white;
  height:60px;
  background: linear-gradient(to right, #278ea0 , #88dfee);
  border-radius: 8px;
  border-bottom: 0px;
}

.flowchart-operator-inputs .flowchart-operator-connector-arrow {
    left: -5px;
}
.flowchart-operator-outputs .flowchart-operator-connector-arrow {
    right: -5px;
}
.train .flowchart-operator-connector-arrow {
  border: 6px solid rgb(161, 225, 236);
  border-radius: 6px;
}
.flowchart-operator-connector-small-arrow {
  border:0px;
}

</style>
