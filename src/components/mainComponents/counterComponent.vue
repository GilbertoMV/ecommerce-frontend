<template>
    <div class="counter">
        <button @click="decrease" class="btn">-</button>
        <span class="value">{{ count }}</span>
        <button @click="increase" class="btn">+</button>
    </div>
</template>

<script>
export default {
    name: 'counterComponent',
    props: {
        initialCount: {
            type: Number,
            default: 1,
        },
        min: {
            type: Number,
            default: 1,
        },
        max: {
            type: Number,
            default: Infinity,
        }
    },
    data() {
        return {
            count: this.initialCount,
        };
    },
    methods: {
        increase() {
            if (this.count < this.max) {
                this.count++;
                this.$emit("update:count", this.count);
            }
        },
        decrease() {
            if (this.count > this.min) {
                this.count--;
                this.$emit("update:count", this.count);
            }
        },
    },
};
</script>

<style scoped>
.counter {
    display: flex;
    align-items: center;
    border: .1rem solid var(--border-color);
    border-radius: .5rem;
    padding: .5rem;
    width: fit-content;
}

.btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0 1rem;
    font-size: var(--font-size-medium);
    color: var(--text-color-body);
}

.value {
    margin: 0 1rem;
    font-size: var(--font-size-medium);
    color: var(--text-color-body);
    width: 1rem;
    text-align: center;
}
</style>