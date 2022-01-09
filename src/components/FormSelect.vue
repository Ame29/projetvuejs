<template>
  <div>
    <label :for="id">{{label}}</label>
    <select :id="id" :name="name" :class="obligatoire">
      <option v-for="option in options" :key="option">{{option}}</option>
    </select>

  </div>
</template>

<script>
export default {
  name:'FormSelect',
  props:{
    label:String,
    name:String,
    id:String,
    classe:String,
    obligatoire:Boolean,
    optionsForm:Array
  },
  computed:{
    required:function (){
      if(this.obligatoire){
        return "required";
      }else{
        return "unrequired";
      }
    },
    options:function (){
      let array = [];
      array+=this.options
      return array
    }
  }
}

</script>

<style scoped>
.required{
  border: 1px solid red;
}

.unrequired{
  border: 1px solid black;
}
</style>