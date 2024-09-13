<template>
    <div class="header">
        <ul class="menu">
            <li class="menu__item">
                <darkmodeIcon />
            </li>
            <li class="menu__item has-notification">
                <bellIcon />
            </li>
            <li class="menu__item has-notification">
                <messageIcon />
            </li>
            <li class="menu__item session">
                <userIcon />
                <optionIcon class="rotate" />
            </li>
        </ul>
    </div>
</template>

<script>
const userIcon = () => import('../icons/userIcon.vue')
const optionIcon = () => import('../icons/optionsIcon.vue')
const darkmodeIcon = () => import('../icons/darkmodeIcon.vue')
const bellIcon = () => import('../icons/bellIcon.vue')
const messageIcon = () => import('../icons/messageIcon.vue')

export default {
    components: {
        userIcon,
        optionIcon,
        darkmodeIcon,
        bellIcon,
        messageIcon
    }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 6rem;
    background-color: #ffffff;
}

.menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    height: 100%;
    padding: 0 2rem;
}

.menu__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    background-color: #eaeaea;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    /* Necesario para posicionar el pseudo-elemento */
}

.menu__item::after {
    content: '';
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 0.8rem;
    height: 0.8rem;
    background-color: red;
    border-radius: 50%;
    display: none;
    /* Oculto por defecto */
}

.menu__item.has-notification::after {
    display: block;
    /* Muestra el punto de notificación solo para los elementos con clase 'has-notification' */
}

.session {
    width: 5rem;
    border-radius: 1rem;
    gap: 0.5rem;
    padding: 0 0.5rem;
}

.icon {
    width: 100%;
    height: 100%;
}

.svg {
    fill: #a1a1a1;
    width: 3rem;
    height: 3rem;
}

.rotate {
    width: 2rem;
    height: 2rem;
    transform: rotate(90deg);
}
</style>
