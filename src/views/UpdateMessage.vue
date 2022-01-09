<template>
  <div class="about">
    <div>
      <h1>Modifier le message</h1>
      <div v-if="confirm">
        Le message a été  modifié avec succès !
      </div>
      <div>
        <label for="newTitre" >Nouveau titre :</label>
        <input name="newTitre" id="newTitre" type="text" v-model="newTitre" required>
      </div>
      <div>
        <label>Nouveau contenu du message :</label>
        <textarea id="newTexte" v-model="newTexte"></textarea>
      </div>
      <button @click="modifierMessage">Modifier le message</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {getMessage, updateMessage} from "@/api/message";

export default {
  name: 'UpdateMessage',
  data () {
    return {
      message:{},
      confirm: false,
      newTitre:'',
      newTexte:'',
      dateActuelle:'',
      categorieActuelle:''
    }
  },
  async mounted () {
    this.actualiseMessage()
  },
  methods: {
    async actualiseMessage () {
      console.log(this.$route.params.id)
      this.message = await getMessage(this.$route.params.id).then((response) => {
        this.newTitre = response.data.titre;
        this.newTexte = response.data.message;
        this.categorieActuelle = response.data.categorie,
        this.dateActuelle = response.data.datepublication
        return response.data
      })
    },
    async modifierMessage() {
      await updateMessage(this.$route.params.id,{
        message:this.newTexte,
        titre:this.newTitre,
        datepublication:this.dateActuelle,
        categorie:this.categorieActuelle
      }).then((reponse) => {
        console.log(reponse)
        this.confirm = true //activation d'un bandeau de confirmation
        this.$router.push('/messages') //redirection
      })
    }
  }
}
</script>