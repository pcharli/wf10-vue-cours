const { ref, computed } = Vue

        const Card = {
            name: "card",
            props: {
                qui: {
                    type: Object,
                    default: {}
                }
            },
            setup(props, context) {
                let textAlt = computed(() => {
                    return 'Image de ' + props.qui.prenom
                })
                const updateFavorite = () => {
                    context.emit('update_favorite', props.qui.key)
                }
                return {textAlt, updateFavorite}
                
            },
            template: `
    <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img :src="qui.urlImg" :alt="textAlt">
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">{{ qui.prenom }} {{ qui.nom }}</p>
              <p class="subtitle is-6">{{ qui.email }}</p>
            </div>
          </div>
      
          <div class="content">
            {{ qui.description }}
            <br>
            <time :datetime="qui.engagment">{{ qui.engagment }}</time>
            <div class="favorite">
                <i class="fa-solid fa-heart" v-if="qui.favorite" @click="updateFavorite"></i>
                <i class="fa-regular fa-heart" v-else @click="updateFavorite"></i>
            </div>
          </div>
        </div>
      </div>
 
            `
        }
        const App = Vue.createApp({
            name: "team",
            setup() {
                let team = ref([
                    {
                        nom: "Charlier",
                        prenom: "Pierre",
                        email: "pcepegra@gmail.com",
                        urlImg: "https://picsum.photos/id/237/800/600",
                        description: "lorem pierre",
                        engagment: "2014-12-01",
                        favorite: true
                    },
                    {
                        nom: "Charlier",
                        prenom: "Benoit",
                        email: "bcharliera@gmail.com",
                        urlImg: "https://picsum.photos/id/147/800/600",
                        description: "lorem benoit",
                        engagment: "2013-12-01",
                        favorite: false
                    }
                ])
                let active = ref(false)
                const switchPerson = (key) => {
                    //alert(key)
                    active.value = team.value[key]
                    active.value.key = key
                }
                const updateFavorite = (key) => {
                    //alert(key)
                    team.value[key].favorite = !team.value[key].favorite
                }
                return {team, active, switchPerson, updateFavorite}
            },
            components: {
                card: Card
            }
        })
        const vm = App.mount('#app')