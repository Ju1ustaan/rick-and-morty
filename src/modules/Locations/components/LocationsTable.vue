<template>
    <table class="table">
        <thead class="table__head">
            <tr>
                <th>#</th>
                <th>Название</th>
                <th>Тип</th>
            </tr>
        </thead>
        <tbody class="table__body">
            <tr v-for="episode in item" :key="episode.id" @click="openModal(episode.id)">
                <td>{{ episode.id }}</td>
                <td>{{ episode.name }}</td>
                <td>{{ episode.type }}</td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LocationsTable',
    props: {
        item: {
            type: Array,
            required: true
        }
    },
    emits: ['open-modal'],
    setup(props, { emit }) {

        const openModal = (id) => {
            emit('open-modal', id)
        }

        return { openModal }

    }
})
</script>
<style scoped>
.table {
    width: 100%;
    margin-bottom: 20px;
    padding: 20px;
    background-color: #71d1cf;
    border-radius: 5px;
    clip-path: polygon(5% 0%, 100% 0%, 100% 90%, 95% 100%, 0% 100%, 0% 10%);
    text-align: center;
}

.table__head {
    line-height: 2em;
}

.table__body td {
    line-height: 2em;
    border-top: 1px solid black;
}

.table__body tr {
    cursor: pointer;
}

.table__body tr:hover {
    background-color: #ffffff7c;
}
</style>