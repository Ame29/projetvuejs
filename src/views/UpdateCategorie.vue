<template>
  <div class="about">
    <div>
      <h1>Modifier la catégorie "{{categorie.libelle}}"</h1>
      <div v-if="confirm">
        La catégorie a été  modifiée avec succès !
      </div>
      <div>
        <label for="newlibelle" >Nouveau libelle :</label>
        <input name="newlibelle" id="newlibelle" type="text" v-model="newLibelle" required>
      </div>
      <div>
        <label for="newcouleur">Nouvelle couleur :</label>
        <input name="newcouleur" id="newcouleur" type="text" v-model="newCouleur" required>
      </div>
      <button @click="modifierCategorie">Modifier la catégorie</button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {getCategorie, updateCategorie} from '../api/categorie'
export default {
  name: 'UpdateCategorie',
  data () {
    return {
      categorie:{},
      confirm: false,
      newLibelle:'',
      newCouleur:''
    }
  },
  async mounted () {
    this.actualiseCategorie()
  },
  methods: {
    async actualiseCategorie () {
      console.log(this.$route.params.id)
      this.categorie = await getCategorie(this.$route.params.id).then((response) => {
        this.newLibelle = response.data.libelle;
        this.newCouleur = response.data.couleur;
        return response.data
      })
    },
    async modifierCategorie() {
      await updateCategorie(this.$route.params.id,{
        libelle:this.newLibelle,
        couleur:this.newCouleur
      }).then((reponse) => {
        console.log(reponse)
        this.confirm = true //activation d'un bandeau de confirmation
        this.$router.push('/categories') //redirection
      })
    }
  }
}
</script>