<template>
<div class="container">
  <div id="chart">
  </div>
</div>
</template>

<script>
  window.$ = window.jQuery = require('jquery');
  require('jquery-ui-dist/jquery-ui');
  require('jquery.flowchart/jquery.flowchart.js');
  import 'jquery.flowchart/jquery.flowchart.css';
  
export default {
  name: 'HelloWorld',
  data () {
    return {
      data: {
        operators: {
          operator1: {
            top: 50,
            left: 50,
            properties: {
              title: 'Operator 1',
              inputs: {},
              outputs: {
                output_1: {
                  label: 'Output 1'
                }
              }
            }
          },
          operator2: {
            top: 80,
            left: 300,
            properties: {
              title: 'Operator 2',
              inputs: {
                input_1: {
                  label: 'Input 1'
                },
                input_2: {
                  label: 'Input 2'
                }
              },
              outputs: {}
            }
          }
        },
        links: {
          link_1: {
            fromOperator: 'operator1',
            fromConnector: 'output_1',
            toOperator: 'operator2',
            toConnector: 'input_2'
          }
        }
      }
    }
  },
  mounted: function () {
    setTimeout(()=> {
      $('#chart').flowchart({
        data: this.data
      })
    }, 500)
    
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