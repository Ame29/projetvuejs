<template>
  <div>
    <h1>Connexion au back-office</h1>
    <p>Bienvenue sur le back-office du forum, merci de vous connecter afin de commencer à utiliser le site.</p>

    <form>
      <div class="row">
        <label for="login">Adresse mail : </label>
        <input v-model="email" id="login" type="text" placeholder="Votre login">
      </div>
      <div class="row">
        <label for="mdp">Mot de passe : </label>
        <input v-model="password" id="mdp" type="password" placeholder="Votre mot de passe">
      </div>
      <button @click="connectUser">Se connecter au back-office</button>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
import {ConnexionUser} from "@/api/authentication";

export default {
  name: "Connexion",
  data(){
    return{
      email:'',
      password:''
    }
  },
  methods:{
    connectUser : async function(){
      await ConnexionUser(this.email,this.password);
    },
  },
};
</script>

<style scoped>

#login, #mdp{
  margin-bottom: 30px;
}
</style>