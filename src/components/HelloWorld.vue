<template>
  <b-container refs="container">
  <b-card title="" header-tag="header" footer-tag="footer">
    <b-row slot="header">
      <b-col>
        <b-form-select v-model="selecteddoc" text="Flowchart" >
         <option :value="null" @click="clear()"></option>
          <option v-for="(doc,index) in total_doc" :value="doc" v-bind:key="index">{{doc}}</option>
        </b-form-select>
      </b-col>
      <b-col>
        <b-button variant="white" v-on:click="saveData"> Save As Recipe </b-button>
        <b-button variant="primary" v-on:click="getData" class="create_operator pull-right"> Run </b-button>
      </b-col>

      <b-col>
        <div id="select-components">
          <b-form-select  v-model="currentComponent" @change="show=true">
          <option></option>
          <option v-for="(comp,index) in components"
             v-bind:key="index"
             :value="comp"
             ><h2>{{comp}} <b-badge>New</b-badge></h2>
             </option></b-form-select>
          
            <add-operator @add-operator="createOperator" :name="currentComponent" :show="show" @close="close()"></add-operator>
       </div>
       </b-col>
       </b-row>
       <div id="chart">
      </div>
    </b-card>
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
        refresh: false,
        count:0,
        total_doc: [],
        selecteddoc: "null",
        components: ["DataTask", "Train", "Deploy"],
        currentComponent: ''
      }
    },
    mounted: function() {
      this.getcollections()
      setTimeout(() => {
        var flowchart = $('#chart')
        flowchart.flowchart({
          data: this.data,
          distanceFromArrow: 2,
          defaultLinkColor: '#c6c4c5',
          multipleLinksOnOutput: true,
          multipleLinksOnInput: true,
          linkWidth:2
        })
      }, 500)
  
    },
    computed: {
      currentTabComponent: function() {
        return this.currentComponent.toLowerCase()
      },
      reload: function() {
        return this.selecteddoc
      },
      // getdocs: function() {
      //   //this.getcollections()
      //   return this.selecteddoc
      // }
    },
    methods: {
      close() {
        this.show = false
        this.currentComponent = ""
      },
      clear() {
        location.reload()
      },
      createOperator(op_data) {
        this.count += 1
        var operatorI = this.count
        var flowchart = $('#chart');
        var operatorId = 'created_operator_' + operatorI;
        flowchart.flowchart('createOperator', operatorId, op_data);
        this.currentComponent = ""
        this.show = false    
      },
      saveData() {
        var data = $('#chart').flowchart('getData')
        console.log(this.selecteddoc)
        self = this
        if(this.selecteddoc != "null"){
          db.collection('flowchart').doc(this.selecteddoc).set({
            data: data
          })
        }
        else{
          db.collection('flowchart').add({
            data: data
          }).then(function(docRef) {
            self.total_doc.push(docRef.id)
            alert(docRef.id)
            alert("cdc")    
          })

        }
          this.refresh = true
      },
      getcollections() {
        var self = this
        db.collection("flowchart").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            self.total_doc.push(doc.id)
            // doc.data() is never undefined for query doc snapshots
  
          });
        });
        // console.log(this.$ref
        
        //this.$refs.container.refresh()
        //this.$refs.container.$forceUpdate()
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
  .Deploy{
  color:white;
  height:60px !important;
  background: linear-gradient(to right, #6e2a8a , #c280d8);
  border-radius: 8px;
  border-bottom: 0px;
}
.Deploy  .flowchart-operator-connector-arrow {
  border: 6px solid rgb(162, 23, 221);
  border-radius: 6px;
}
.flowchart-operator .flowchart-operator-title{
  background:transparent;
  border-bottom:0px;
}
.Deploy .flowchart-operator-connector:hover .flowchart-operator-connector-arrow {
    border-left: 6px solid rgb(162, 23, 221);
}
.flowchart-operator-inputs .flowchart-operator-connector-arrow {
    left: -5px;
}
.flowchart-operator-outputs .flowchart-operator-connector-arrow {
    right: -5px;
}
.Train .flowchart-operator-connector-arrow {
  border: 6px solid rgb(161, 225, 236);
  border-radius: 6px;
}
.flowchart-operator-connector-small-arrow {
  border:0px;
}
.Train {
  padding: 15px;
  color:white;
  height:60px;
  background: linear-gradient(to right, #278ea0 , #88dfee);
  border-radius: 8px;
  border-bottom: 0px;
}
.Train .flowchart-operator-connector:hover .flowchart-operator-connector-arrow {
    border-left: 6px solid rgb(161, 225, 236);
}
.DataTask .flowchart-operator-connector-arrow {
  border: 6px solid rgb(252, 22, 103);
  border-radius: 6px;
}
.DataTask {
  padding: 15px;
  color:white;
  height:60px;
  background: linear-gradient(to right, #f7482a ,#f72a71);
  border-radius: 8px;
  border-bottom: 0px;
}
.DataTask .flowchart-operator-connector:hover .flowchart-operator-connector-arrow {
    border-left: 6px solid rgb(252, 22, 103);
}
</style>
