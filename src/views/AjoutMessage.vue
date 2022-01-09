<template>
  <div class="about">
    <h1>Ajouter un nouveau message</h1>
    <div class="descriptionFormAjout">
      <p>Afin d'ajouter un nouveau message dans le forum, veuillez remplir les champs ci-dessous </p>
      <p>Attention, si vous souhaitez créer un message dans une nouvelle catégorie, pensez à d'abord créer cette catégorie dans la partie "Catégorie"</p>
    </div>
    <div v-if="confirm">
      Message ajoutée avec succès !
    </div>
    <div class="formAjout">
      <div class="DivFormAjout">
        <label for="titre">Titre :</label>
        <input type="text" name="titre" v-model="titre"  id="titre"/>
      </div>
      <div class="DivFormAjout">
        <label for="date">Date :</label>
        <input type="datetime-local" name="date" v-model="date"  id="date"/>
      </div>
      <div class="DivFormAjout">
        <label for="message">Message :</label>
        <input type="text" name="message" v-model="message"  id="message"/>
      </div>
      <div class="DivFormAjout">
        <label>Associer le message à une catégorie : </label>
        <select v-model="idCategorieMessage">
          <option v-for="category in categories" :key="category.id" :value="category.id">{{category.libelle}}</option>
        </select>
      </div>
      <div class="DivFormAjout">
        <button @click="ajoutMessage">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script>
import {postMessage} from '../api/message'
import {getCategories} from '../api/categorie'

export default {
  name: 'NouveauMessage',
  data () {
    return {
      categories:{},
      titre: '',
      date: '',
      message: '',
      confirm: false,
      idCategorieMessage:'',
    }
  },
  async mounted () {
    this.categories = await getCategories().then((response) => {
      return response.data['hydra:member']
    })
    console.log(this.categories)
  },
  methods: {
    async ajoutMessage() {
      await postMessage({
        titre: this.titre,
        message: this.message,
        datepublication: this.date,
        categorie: "/td2vuejs/public/api/categories/" + this.idCategorieMessage
      }).then((reponse) => {
        console.log(reponse)
        //this.confirm = true //activation d'un bandeau de confirmation
        this.$router.push('/messages') //redirection
      })
    }
  }
}

</script>

<style>
  .DivFormAjout{
    margin-bottom: 20px;
  }

  .formAjout{
    border: black solid 1px;
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 30px;
    margin-bottom: 27.8vh;
  }

  .DivFormAjout label{
    margin-right: 20px;
  }

  .descriptionFormAjout{
    margin-bottom: 30px
  }
</style>



