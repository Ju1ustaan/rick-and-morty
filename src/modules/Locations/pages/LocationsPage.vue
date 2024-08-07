<template>
    <div class="locations">
        <div class="container">
            <h2 class="locations__titlte">Локации</h2>
            <Loader  v-if="loading"/>
            <div v-else-if="error">{{ error }}</div>
            <LocationsTable :item="locations" @open-modal="openModal"/>
            
            <Detail :category="route.path" :id="episodeId" :isVisible="showModal" @close="showModal = false">
                <template #location="{ detail }">
                    <table>
                        <table class="detail-taible">
                            <thead class="">
                                <tr>
                                    <th>Измерение</th>
                                    <th>Название</th>
                                    <th>Тип</th>
                                    <th>Персонажи</th>
                                    <th>Персонажи</th>
                                </tr>
                            </thead>
                            <tbody class="">
                                <tr>
                                    <td>{{ detail.dimension }}</td>
                                    <td>{{ detail.name }}</td>
                                    <td>{{ detail.type}}</td>
                                    
                                    <td style="display: flex; flex-wrap: wrap; column-gap: 10px;">
                                    <div v-for="character in residents" :key="character.id">
                                        {{ `${character.name},` }}
                                    </div>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </table>
                </template>
            </Detail>
        </div>
        <Pagination :next="next" :pages="pages" :prev="prev" :currentPage="currentPage"
            @page-changed="fetchLocations" />
    </div>
</template>
<script>
import { ref, onMounted, defineComponent, watch } from 'vue'
import { useRoute } from 'vue-router';
import { getDataList, getCharacters, getLocationById } from '../api';

import LocationsTable from '../components/LocationsTable.vue';
import Detail from '@/shared/components/Detail.vue';
import Pagination from '@/shared/components/Pagination.vue';
import Loader from '@/shared/components/Loader.vue';

export default defineComponent({
    name: 'LocationsPage',
    components: {
        LocationsTable,
        Detail,
        Pagination,
        Loader
    },
    setup() {
        const route = useRoute()
        const locations = ref([]);
        const loading = ref(true);
        const error = ref(null);
        const next = ref(null);
        const prev = ref(null);
        const pages = ref(1);
        const currentPage = ref(1);
        const showModal = ref(false)
        const episodeId = ref(0)
        const residents = ref([])

        const fetchLocations = async (page) => {
            try {
                const data = await getDataList(page);
                locations.value = data.results;
                next.value = data.info.next;
                prev.value = data.info.prev;
                pages.value = data.info.pages;
            } catch (err) {
                error.value = 'Failed to load locations';
            } finally {
                loading.value = false;
            }
        };
        
        const fetchCharacters = async (urls) => {
            try {
                const results = await Promise.all(urls.map(url => getCharacters(url)));
                residents.value = results.flat();
            } catch (err) {
                error.value = 'Failed to load episodes';
            } finally {
                loading.value = false;
            }
        }
        
        const openModal = (id) => {
            showModal.value = true
            episodeId.value = id
        }

        onMounted(() => {
            fetchLocations();
        });
        

        watch(showModal, async (newVal) => {            
            if (newVal && episodeId.value) {
                const episodeDetail = await getLocationById(episodeId.value);
                if (episodeDetail.residents) {
                    await fetchCharacters(episodeDetail.residents);
                }
            }
        });
        
        return {
            locations,
            loading,
            error,
            next,
            prev,
            pages,
            currentPage,
            route,
            showModal,
            episodeId,
            residents,
            openModal,
            fetchLocations
        };
    }
})
</script>
<style scoped>
.locations {
    padding: 100px 0;
    background-color: #212838;
    min-height: 100vh;
}

.locations__titlte {
    font-size: clamp(16px, 5vw, 36px);
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
}
</style>