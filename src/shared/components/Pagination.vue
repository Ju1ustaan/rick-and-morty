<template>
    <div class="pagination">
        <button @click="changePage(prev)" :disabled="!prev">Предыдущая</button>
        <button @click="changePage(next)" :disabled="!next">Следующая</button>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'PaginationPages',
    props: {
        next: {
            type: String,
            default: null
        },
        pages: {
            type: Number,
            required: true
        },
        prev: {
            type: String,
            default: null
        },
        currentPage: {
            type: Number,
            required: true
        }
    },
    emits: ['page-changed'],
    setup(props, { emit }) {
        const changePage = (page) => {
            if (typeof page === 'string') {
                const url = new URL(page);
                const pageNumber = url.searchParams.get('page');
                emit('page-changed', Number(pageNumber));
            } else {
                emit('page-changed', page);
            }
        };

        return {
            changePage
        };
    }

})
</script>
<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
}

button {
    font-family: inherit;
    padding: 8px 12px;
    cursor: pointer;
    background-color: #71d1cf;
    border-radius: 5px;
    clip-path: polygon(10% 0%, 100% 0%, 100% 60%, 90% 100%, 0% 100%, 0% 40%);
}

button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

button.active {
    background-color: #007bff;
    color: #fff;
    border-color: #007bff;
}
</style>