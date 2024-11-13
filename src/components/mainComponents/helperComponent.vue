<template>
    <button type="button" class="helper" @click="helperShow">
        <helperIcon />
    </button>
</template>

<script>
import helperIcon from '../icons/helperIcon.vue';
import Swal from 'sweetalert2';

export default {
    name: 'helperComponent',
    components: {
        helperIcon
    },
    props: {
        text: {
            type: String,
            required: true
        }
    },
    methods: {
        helperShow() {
            Swal.fire({
                icon: "info",
                html: this.text,
                width: "40%",
                showConfirmButton: true,
                showCancelButton: false,
                confirmButtonColor: '#62ab18'
            });
        }
    }
}
</script>

<style scoped>
.helper {
    padding: 0;
    margin: 0;
    border: none;
    box-sizing: border-box;
    background-color: transparent;
    color: var(--text-color-body);
    cursor: pointer;
}
</style>
