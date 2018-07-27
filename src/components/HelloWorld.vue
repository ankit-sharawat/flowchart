<template>
  <b-container class="container">
  <b-card title=""
                header-tag="header"
                footer-tag="footer">
            
    <!-- <b-card> -->
    <b-row slot="header">
      <b-col>
        <b-form-select v-model="selecteddoc" text="Flowchart" @click="getcollections">
          <option></option>
          <option v-for="(doc,index) in total_doc" :value="doc" v-bind:key="index">{{doc}}</option>
        </b-form-select>
        {{selecteddoc}}
      </b-col>
      <b-col>
        <b-button variant="white" v-on:click="saveData">
         Save As Recipe
      </b-button>
        <b-button variant="primary" v-on:click="getData" class="create_operator pull-right">
                      Run
                    </b-button>
        
      </b-col>
      <b-col>
        <div id="select-components">
          <select  v-model="currentComponent" @change="show=true">
          <option v-for="(comp,index) in components"
             v-bind:key="index"
             :value="comp"
             >{{ comp }}
             </option></select> {{show}}
           
          <b-modal id="modal1" title="Bootstrap-Vue" v-model="show">
            <component v-bind:is="currentComponent" class="tab" @add-operator="createOperator"></component>
            <div slot="modal-footer">
            </div>
          </b-modal>
        </div>
      <div id="d1"></div>
      </b-col>
    </b-row>
    <!-- <add-operator @add-operator="createOperator" ></add-operator> -->
       <div id="chart">
    </div>
    </b-card>
    <!-- <div v-for="(element,index) in elements" :is="scomponent" :key="index"></div> -->
    <!-- </b-card> -->
  </b-container>
</template>

<script>
  import 'jquery.flowchart/jquery.flowchart.css'
  import {
    DATATBASE
  } from '../../config/firebase_con.js'
  import AddOperator from './AddOperator'
  import Vue from 'vue'
  import Train from './Train'
  import Deploy from './Deploy'
  window.$ = window.jQuery = require('jquery')
  require('jquery-ui-dist/jquery-ui')
  require('jquery.flowchart/jquery.flowchart.js')
  
  var db = DATATBASE
  export default {
    name: 'HelloWorld',
    components: {
      AddOperator,
      Train,
      Deploy
    },
    data() {
      return {
        show: false,
        data: "",
        count:0,
        total_doc: [],
        selecteddoc: "null",
        components: ["AddOperator", "Train", "Deploy"],
        currentComponent: ''
      }
    },
    mounted: function() {
      setTimeout(() => {
        this.getcollections()
        var flowchart = $('#chart')
        flowchart.flowchart({
          data: this.data,
          canUserEditLinks: true
        })
      }, 500)
  
    },
    computed: {
      currentTabComponent: function() {
        return this.currentComponent.toLowerCase()
      }
    },
    methods: {
      createOperator(op_data) {
        this.count += 1
        var operatorI = this.count
        var flowchart = $('#chart');
        var operatorId = 'created_operator_' + operatorI;
        flowchart.flowchart('createOperator', operatorId, op_data);
        this.show = false
      },
      saveData() {
        var data = $('#chart').flowchart('getData')
        if(this.selecteddoc != "null"){
          db.collection('flowchart').doc(this.selecteddoc).set({
            data: data
          })
        }
        else{
          db.collection('flowchart').add({
            data: data
          }).then(function(docRef) {
            alert("saved")
          })

        }
      },
      getcollections() {
        var self = this
        db.collection("flowchart").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            self.total_doc.push(doc.id)
            // doc.data() is never undefined for query doc snapshots
  
          });
        });
        console.log(this.$refs)
         Vue.nextTick(() => $(".container").refresh())
      },
      getData(todo) {
        var self = this
        db.collection('flowchart').doc(this.selecteddoc).get().then(function(doc) {
          if (doc.data() !== undefined) {
            self.data = doc.data().data
            self.count = Object.keys(self.data.operators).length
            $('#chart').flowchart('setData', self.data)
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
  .container {
    width: 800px;
    height: 400px;
  }
  
  .flowchart-container {
    width: 800px;
    height: 4000px;
  }
  #chart {
    width: 800px;
    height: 400px;
  } 
  h1,
  h2 {
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
  /* .flowchart-operator-connector-small-arrow {
    border:5px;
    border-radius: 5px;
  }
  */
  .flowchart-operator .flowchart-operator-title {
    background: transparent !important;
    border-bottom: 0px !important;
  }
</style>
