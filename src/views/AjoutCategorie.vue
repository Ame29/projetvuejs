<template>
  <div class="about">
    <div>
      <h1>Ajouter une nouvelle catégorie</h1>
      <div class="descriptionFormAjout">
        <p>Afin d'ajouter une nouvelle catégorie dans le forum, veuillez remplir les champs ci-dessous </p>
      </div>
      <div v-if="confirm">
        La catégorie {{libelle}} a été ajoutée avec succès !
      </div>
      <div class="formAjoutCategorie">
        <div class="DivFormAjout">
          <label for="libelle">Libellé de la nouvelle catégorie : </label>
          <input type="text" name="libelle" v-model="libelle"  id="libelle"/>
        </div>
        <div class="DivFormAjout">
          <label for="couleur">Couleur de la nouvelle catégorie : </label>
          <input type="text" name="couleur" v-model="couleur"  id="couleur"/>
        </div>
        <div class="DivFormAjout">
          <button @click="ajoutCategorie">Ajouter une nouvelle catégorie</button>
        </div>
      </div>

    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {postCategorie} from '../api/categorie'
export default {
  name: 'AjoutCategorie',
  data () {
    return {
      couleur: '',
      libelle: '',
      confirm: false
    }
  },
  methods: {
    async ajoutCategorie() {
      await postCategorie({
        couleur: this.couleur,
        libelle: this.libelle
      }).then((reponse) => {
        console.log(reponse)
        this.confirm = true //activation d'un bandeau de confirmation
        this.$router.push('/categories') //redirection
      })
    }
  }
}
</script>

<style>
  .formAjoutCategorie{
    border: black solid 1px;
    width: 35%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
    margin-bottom: 37.2vh;
  }
</style>