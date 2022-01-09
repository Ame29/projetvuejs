<template>
  <div class="about">
    <h1>Liste des messages</h1>
    <router-link to="nouveau-message" class="ajoutMessage"> + Ajouter un message + </router-link>
    <div>
      <p>Vous vous trouvez ici sur la page permettant de gérer les messages du forum, ajoutez, modifiez ou supprimer des messages comme il vous plaît.</p>
    </div>
    <table id="tabMessages">
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
      <tr v-for="message in messages" :key="message.id">
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
</template>

<script>
import {getMessages, removeMessage} from '../api/message'
import {getCategorie} from "@/api/categorie";
import moment from "moment";
export default {
  name: 'Messages',
  data () {
    return {
      messages: null
    }
  },
  async mounted () {
    this.messages = await getMessages().then((response) => {
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
    async deleteMessage(id){
      await removeMessage(id).then((reponse) => {
        console.log(reponse);
        this.confirm = true;
        location.reload();
      })
    }
  }
}
</script>

<style>
  .ajoutMessage{
    font-size: 25px;
    text-decoration: none;
    color: black;
  }
</style>