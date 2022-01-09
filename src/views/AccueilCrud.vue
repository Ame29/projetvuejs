<template>
  <div>
      <h1 v-if="user">Bienvenue sur votre back-office {{user.username}} !</h1>
    <p>Voici votre back-office, en tant qu'administrateur de ce forum, vous pouvez gérer différentes parties : les catégories et les messages.</p>
    <p>Si vous souhaitez commencer à gérer votre forum, cliquez sur un des deux boutons ci-dessous.</p>
    <div class="liensAccueil">
      <router-link to="categories">
        <div class="divLienAccueil">
          <img src="../assets/tags-solid.svg">
          <p>Gérer les catégories du forum</p>
        </div>
      </router-link>
      <router-link to="messages">
        <div class="divLienAccueil">
          <img src="../assets/comments-solid.svg">
          <p>Gérer les messages du forum</p>
        </div>
      </router-link>
    </div>
    <div>
      <h2>Vidéo tutoriel de gestion du back-office : </h2>
      <video src="../assets/Sunrise.mp4" controls></video>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AccueilCrud',
  components: {
  },
  data()
  {
    return {
      user: localStorage.user ? JSON.parse(localStorage.user) : "",
    }
  }
}
</script>
<style>
.divLienAccueil p{
  font-size:25px;
  text-decoration: none;
  color: black;
}

.liensAccueil a{
  text-decoration: none;
}

.divLienAccueil{
  background-color: lightgray;
  height: 100px;
  border: black solid 1px;
  padding:5%;
  display: flex;
}

.liensAccueil{
  display: flex;
  width: 60%;
  justify-content: space-between;
  margin: 50px auto 60px;
}

.divLienAccueil img{
  width: 20%;
  vertical-align: middle;
  margin-right: 2vw;
  color: #99E8C4;
}
</style>