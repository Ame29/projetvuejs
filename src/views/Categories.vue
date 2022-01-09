<template>
  <div class="about">
    <div>
      <h1>Liste des catégories</h1>
      <router-link to="/ajout-categorie" class="ajoutCategorie"> + Ajouter une nouvelle catégorie + </router-link>
      <div v-if="confirm">
        La catégorie a été supprimée avec succès !
      </div>
      <div>
        <p>Vous vous trouvez ici sur la page permettant de gérer les catégories du forum, ajoutez, modifiez ou supprimer les catégories comme il vous plaît.</p>
        <p>Attention cependant, si certaines catégories ne peuvent être supprimées, c'est car il y a encore des messages liés à celle-ci, pensez donc à supprimer ces messages avant.</p>
      </div>
      <div>
        <table>
          <thead>
          <tr>
            <td>Libellé de la catégorie</td>
            <td>Couleur de la catégorie</td>
            <td>Nombre de message de la catégorie</td>
            <td>Modifier la catégorie</td>
            <td>Supprimer la catégorie</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="categorie in categories" :key="categorie.id">
            <td>
              <router-link :to="{name:'categorie_messages', params: {id: categorie.id}}">
                {{categorie.libelle}}
              </router-link>
            </td>
            <td>{{ categorie.couleur }}</td>
            <td>
              <router-link :to="{name:'categorie_messages', params: {id: categorie.id}}">
                {{ categorie.messages.length }} messages
            </router-link></td>
            <td>
              <router-link :to="{name:'modifier_categorie', params: {id: categorie.id}}">Modifier</router-link>
            </td>
            <td>
              <button v-if="!(categorie.messages.length>0)" @click="deleteCategorie(categorie.id)">Supprimer</button>
              <p v-else>Ne peut pas être supprimée</p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {getCategories, removeCategorie} from '../api/categorie'
export default {
  name: 'Categories',
  data () {
    return {
      categories: null,
      confirm: false,
      categorie: {}
    }
  },
  async mounted () {
    this.categories = await getCategories().then((response) => {
      return response.data['hydra:member']
    })
  },
  methods: {
    async deleteCategorie(id) {
      await removeCategorie(id).then((reponse) => {
        console.log(reponse);
        this.confirm = true;
        location.reload();
      })
    }
  }
}
</script>

<style>
  table td{
    border: black solid 1px;
  }
  table{
    margin-right: auto;
    margin-left: auto;
    margin-top: 50px;
  }

  table thead{
    font-size: 28px;
    background-color: lightgray;
    font-weight: bold;
  }

  table thead td{
    padding-left: 10px;
    padding-right:10px;
  }

  table td a{
    color: black;
    text-decoration: none;
  }

  table tbody td{
    height: 50px;
  }

  table tbody tr:nth-child(even){
    background-color: #42b983;
  }

  .ajoutCategorie{
    font-size: 25px;
    text-decoration: none;
    color: black;
  }
</style>