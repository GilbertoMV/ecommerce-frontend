<template>
    <label class="switch">
        <input type="checkbox" :checked="isDarkMode" @change="toggleDarkMode">
        <span class="slider"></span>
    </label>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'toggleButton',
    computed: {
        ...mapGetters(['isDarkMode'])
    },
    methods: {
        ...mapActions(['toggleDarkMode'])
    }
}
</script>
<style scoped>
/* The switch - the box around the slider    */
.switch {
    font-size: 1.7rem;
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
}

/* Hide default HTML checkbox    */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider    */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(182, 182, 182);
    transition: .4s;
    border-radius: 1rem;
}

.slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 8px;
    left: 0.3em;
    bottom: 0.3em;
    transform: rotate(270deg);
    background-color: rgb(255, 255, 255);
    transition: .4s;
}

.switch input:checked+.slider {
    background-color: var(--primary-color);
}

.switch input:focus+.slider {
    box-shadow: 0 0 .1rem #2196F3;
}

.switch input:checked+.slider:before {
    transform: translateX(1.5em);
}

@media (width <=768px) {
    .switch {
        font-size: 1rem;
    }
}
</style>