<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="user" to="/home">Accueil</router-link>
      <router-link v-else to="/">Accueil</router-link>

      <router-link v-if="user" to="/categories">Catégories</router-link>
      <router-link v-else to="/">Catégories</router-link>

      <router-link v-if="user" to="/messages">Messages</router-link>
      <router-link v-else to="/">Messages</router-link>

      <router-link v-if="user" to="/recherche">Recherche</router-link>
      <router-link v-else to="/">Recherche</router-link>

      <!--<button v-if="user" @click="deconnexion">Déconnexion</button>-->
    </div>
    <router-view/>

    <footer id="footer">
      <div id="Divfooter">
          <p>Copyright Guillaume Derrien - LP Dev - IUT de Troyes</p>
          <p class="lienFooter"><router-link to="/">Accueil</router-link></p>
          <p class="lienFooter"><router-link to="/categories">Catégories</router-link></p>
          <p class="lienFooter"><router-link to="/messages">Messages</router-link></p>
          <p class="lienFooter"><router-link to="/recherche">Recherche</router-link></p>
      </div>
    </footer>
  </div>
</template>

<script>
//import {deconnexionUser} from "@/api/authentication";

export default {
  name: 'App',
  data: () => {
    return {
      user: localStorage.user ? JSON.parse(localStorage.user) : "",
    }
  },
  /*methods: {
    deconnexion(){
      deconnexionUser();
    }
  },*/
  computed: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;

}

#nav {
  padding: 30px 500px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  background-color: #99E8C4;
  border: black solid 1px;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 35px;
  border-right: black solid 1px;
  padding-right: 35px;
}

#nav a:first-child{
  border-left: black solid 1px;
  padding-left: 35px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  margin-top: 50px;
  border: black solid 1px;
}

#footer{
  background-color: #99E8C4;
}

#Divfooter{
  padding: 30px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  width: 75%;
}

body{
  margin:0;
}

#Divfooter p, #Divfooter p a {
  font-size:25px;
  color: #2c3e50;
  text-decoration: none;
}
</style>