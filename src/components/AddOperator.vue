<template>
<!--<b-modal ref="modal1"  v-model="show">-->
<transition name="modal" v-if="show">
<div class="modal-mask">
<div class="modal-wrapper">
<div class="modal-container">
<b-row>
<b-col style="padding-right:0px;">
<div style="position: relative;top: 35px;"><img src="../assets/medical-record.svg" class="file-icon" style="width:50px;"></img></div>
  <br><br><h1 style="color:grey;">Card</h1>
<div class='ui-basic'>
      <div class='content'>
          <div class='field' style="position: relative;left: 18px;">
          <b-form-textarea
                     v-model="title"
                     placeholder="Enter something"
                     :rows="1">
          </b-form-textarea>
          </div><br>
          <span style="padding-right:174px;">Tag-Value Pairs </span>
          <div class="component-contain">
          <tag-value-pair style="position: relative;left: 18px;" v-for="n in count" @add="add()"></tag-value-pair>
          </div>
          <div class='attached-buttons'>
            <b-button class='cancel' @click="close()">
              CANCEL
            </b-button>
            <b-button class='delete' v-on:click="">
              DELETE
            </b-button>
            <b-button class='save' v-on:click="sendForm">
              SAVE
            </b-button>
            
          </div>
        </div>
  </div>
</b-col>
<b-col style="padding-left:0px;">
<div class="left-container">
<button type="button" class="close" aria-label="Close" @click="close()">
  <span aria-hidden="true">&times;</span>
</button>
<table style="width:100%">
<tbody>
<tr style="height:50px;"></tr>
<tr><td>
<img src="../assets/medical-record.svg" class="file-icon" style="width:50px;">
 </img>
 </td>
 <td style="width:216px"></td>
 </tr>
 <tr><td><span style="color:white;font-size:26px;">title</span></td></tr>
 <tr><td colspan="2"><span style="color:white;padding-right:131px;">Made by Yochay</span></td></tr>
 </tbody>
 </table>
 <div>
 <h4 style="padding-right:36px; color:white;">Configurable params</h4>
 <div>
 </div>
 <b-form-group  class="default-options">
    <b-form-checkbox  v-model="checked" value="">Share to team</b-form-checkbox><br>
    <b-form-checkbox v-model="checked" value="">Customisatble HyperParams</b-form-checkbox><br>
    <b-form-checkbox v-model="checked" value="">Set default for easy resetup</b-form-checkbox>
  </b-form-group>
 </div>
 </div>
  </b-col>
  </b-row>
  </div>
  </div>
  </div>
  </transition>  
</template>

<script>
import TagValuePair from './TagValuePair'
export default {
  props: ["show","name"],
  components: {
    TagValuePair,
  },
  data () {
    return {
      top: '',
      left: '',
      count: 1,
      title: '',
      openmodal: this.show,
      checked: true
    }
  },
  mounted: function () {
   this.checked = true
   this.count = 1
  },
  methods: {
    add () {
     this.count ++;
    },
    close () {
      this.count = 1
      this.$emit('close')
      
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
<style>
.modal-header {
  border-bottom:0px;
  padding:0px;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 680px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.left-container{
  height:500px;
  background-color: #14202d;
  border-radius: 0px 12px 12px 0px;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.default-options{
  width: 267px;
  text-align: left;
  padding: 10px;
  position: relative;
  left: 30px;
  border-radius: 10px;
  color:white;
  background-color: #343e48;
}
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
    background-color: #343e48;
}
.ui-basic{
  position: relative;
  top: 36px;
}
.close {
  top: 10px;
  right: 25px;
  position: relative;
  background-color: transparent;
  color:grey;
}
.attached-buttons {
  top: 70px;
  position: relative;
  background-color: transparent;
}
.cancel {
  background-color: #c9cacc;
  color: #46494c;
  border-radius: 4px;
  border:none;
}
.delete {
  background-color: #fcb792;
  color: #f41637;
  border:none;
}
.save {
  background-color: #7bc5f7;
  color: #1060ea;
  border:none;
}
.component-contain {
  overflow-y: scroll;
  padding-left:4px;
  height: 100px;
  overflow-x: hidden;

}
</style>
