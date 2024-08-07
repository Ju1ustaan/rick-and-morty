import { createRouter, createWebHashHistory } from "vue-router";

import CharactersPage from "./modules/Characters/pages/CharactersPage.vue";
import EpisodePage from "./modules/Episode/pages/EpisodePage.vue";
import LocationsPage from "./modules/Locations/pages/LocationsPage.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/character', component: CharactersPage, alias: '/' },
        { path: '/episode', component: EpisodePage },
        { path: '/location', component: LocationsPage }
    ]
})