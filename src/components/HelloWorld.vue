<template>
<div class="container">
  <button  v-on:click="getData" class="create_operator">
                  Load Chart
                </button>
  <button  v-on:click="saveData">
     save
  </button>
  <select v-model="selecteddoc">
    <option></option>
    <option v-for="(doc,index) in total_doc" :value="doc" v-bind:key="index">{{doc}}</option>
  </select>
  <add-operator @add-operator="createOperator"></add-operator>
  <canvas id="chart">
  </canvas>
</div>
</template>

<script>
import 'jquery.flowchart/jquery.flowchart.css'
import AddOperator from './AddOperator'
window.$ = window.jQuery = require('jquery')
require('jquery-ui-dist/jquery-ui')
require('jquery.flowchart/jquery.flowchart.js')
import { DATATBASE } from '../../config/firebase_con.js'
var db = DATATBASE
export default {
  name: 'HelloWorld',
  components:{
    AddOperator
  },
  data () {
    return {
      data: "",
      count: 0,
      total_doc: [],
      selecteddoc:""
  }
  },
  mounted: function () {
    this.getcollections()
    setTimeout(() => {
      $('#chart').flowchart({
        data: this.data,
        canUserEditLinks: true
      })
    }, 500)
    
  },
  methods: {
    createOperator (op_data) {
      this.count +=1
      var operatorI = this.count
      var $flowchart = $('#chart');
      var operatorId = 'created_operator_' + operatorI;
      $flowchart.flowchart('createOperator', operatorId, op_data);
    },
    saveData () {
      console.log(this.selecteddoc + "wrgrij")
    //  if(this.selecteddoc !=""){
      //  var data = $('#chart').flowchart('getData')
      //  db.collection('flowchart').doc(this.selecteddoc).set({
      //   data: data
      // })
    //   console.log("wfr")
    //  }
    },
    getcollections () {
      var self= this
       db.collection("flowchart").get().then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
           self.total_doc.push(doc.id)
        // doc.data() is never undefined for query doc snapshots
        
    });
});
    },
    getData (todo) {
      var self = this
      db.collection('flowchart').doc(this.selecteddoc).get().then(function (doc) {
      if (doc.data() !== undefined) {
        self.data = doc.data().data
        self.count = Object.keys(self.data.operators).length
        $("#chart").flowchart('setData', self.data);
        
      }
    })
    },
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.container{
  width:800px;
  height:400px;
  border:1px solid red
}
.flowchart-container {
  width:800px;
  height:400px;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>