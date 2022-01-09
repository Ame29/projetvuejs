<template>
  <div>
    <label>{{label}}</label>
    <input type="text" :class="required">
  </div>
</template>

<script>
  export default {
    name:'FormTexte',
    props:{
      label:String,
      obligatoire:Boolean
    },
    computed:{
      required:function (){
        if(this.obligatoire){
          return "required";
        }else{
          return "unrequired";
        }
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