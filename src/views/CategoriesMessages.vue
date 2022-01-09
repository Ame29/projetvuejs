<template>
  <div class="about">
    <h1>Liste des messages de la catégorie : {{ categorie.libelle }}</h1>
    <table v-if="categorie.messages.length>0" id="tabMessages">
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
      <tr v-for="message in categorie.messages" :key="message.id">
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
    <h2 v-else>Pas de messages dans cette catégorie</h2>
  </div>

</template>

<script>

import {getCategorie} from '../api/categorie'
import {removeMessage} from '../api/message'
import moment from 'moment'

export default {
  name: 'CategoriesMessages',
  data () {
    return {
      categorie: {}
    }
  },
  watch: {
    $route () {
      this.actualiseCategorie()
    }
  },
  async mounted () {
    this.actualiseCategorie()
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
  #tabMessages td{
    max-width: 400px;
  }
</style>