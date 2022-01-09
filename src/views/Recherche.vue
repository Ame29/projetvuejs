<template>
  <div class="panel panel-default">
    <h1>Tous les messages</h1>
    <div class="row">
      <div class="search-wrapper panel-heading col-sm-12">
        <input class="form-control" type="text" v-model="searchQueryMessages" placeholder="Rechercher un message via son titre" />
      </div>
    </div>
    <div class="panel-body">
      <table v-if="messages.length" class="table">
        <thead>
        <tr>
          <td>Titre du message</td>
          <td>Contenu du message</td>
          <td>Date de publication</td>
          <td>Modifier le message</td>
          <td>Supprimer la message</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="message in filteredResourcesMessages" :key="message.id">
          <td>{{ message.titre }}</td>
          <td>{{ message.message }}</td>
          <td>{{ format_date(message.datepublication) }}</td>
          <td>
            <router-link :to="{name:'modifier_message', params: {id: message.id}}">Modifier</router-link>
          </td>
          <td>
            <button @click="deleteMessage(message.id)">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <h1>Toutes les catégories</h1>
    <div class="row">
      <div class="search-wrapper panel-heading col-sm-12">
        <input class="form-control" type="text" v-model="searchQueryCategories" placeholder="Rechercher un categorie via son libbelé" />
      </div>
    </div>
    <div class="panel-body">
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
        <tr v-for="categorie in filteredResourcesCategories" :key="categorie.id">
          <td>
              {{categorie.libelle}}
          </td>
          <td>{{ categorie.couleur }}</td>
          <td>
              {{ categorie.messages.length }} messages
          </td>
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

</template>


<script>
import {getMessages, removeMessage} from "@/api/message";
import {getCategorie, getCategories, removeCategorie} from "@/api/categorie";
import moment from "moment";

export default {
  name: 'Recherche',
  data() {
    return {
      searchQueryMessages:'',
      messages:[],
      searchQueryCategories:'',
      categories:[]
    };
  },
  computed: {
    filteredResourcesMessages (){
      if(this.searchQueryMessages){
        return this.messages.filter((message)=>{
          return message.titre.startsWith(this.searchQueryMessages);
        })
      }else{
        return this.messages;
      }
    },
    filteredResourcesCategories (){
      if(this.searchQueryCategories){
        return this.categories.filter((categorie)=>{
          return this.searchQueryCategories.toLowerCase().split(' ').every(v => categorie.libelle.toLowerCase().includes(v))
          || this.searchQueryCategories.toLowerCase().split(' ').every(v => categorie.couleur.toLowerCase().includes(v))
        })
      }else{
        return this.categories;
      }
    }
  },
  async mounted () {
    this.messages = await getMessages().then((response) => {
      return response.data['hydra:member']
    });
    this.categories = await getCategories().then((response) => {
      return response.data['hydra:member']
    })
  },
  methods: {
    async actualiseCategorie () {
      console.log(this.$route.params.id)
      this.categorie = await getCategorie(this.$route.params.id).then((response) => {
        return response.data
      })
    },
    format_date(value){
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY à hh:mm')
      }
    },
    async deleteCategorie(id) {
      await removeCategorie(id).then((reponse) => {
        console.log(reponse);
        this.confirm = true;
        location.reload();
      })
    },
    async deleteMessage(){
      await removeMessage(this.$route.params.id).then((reponse) => {
        console.log(reponse);
        this.confirm = true;
        location.reload();
      })
    }
  }
}
</script>

<style>
input {
  width:300px}
</style>