<template>
    <div class="form-group">
        <label :for="name">{{ label }}</label>
        <input :type="type" :id="name" :name="name" :value="value" :placeholder="label"
            @input="updateValue($event.target.value)" />
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        type: {
            type: String,
            default: 'text',
        },
        label: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            default: ''
        }
    },
    methods: {
        updateValue(value) {
            this.$emit('input', value);
        }
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 1.5rem;
}

label {
    color: var(--text-color-body);
    display: block;
    margin-bottom: .5rem;
}

input {
    width: 100%;
    padding: .8rem;
    box-sizing: border-box;
    border: solid .1rem var(--primary-color);
    border-radius: .5rem;
    background-color: var(--tertiary-color);
    font-size: var(--font-size-base);
}

input:focus {
    box-shadow: 0 0 .5rem rgba(98, 171, 24, 0.5);
    outline: none;
}

@media (width <=390px) {
    label {
        font-size: var(--font-size-small);
    }

    input {
        padding: .5rem;
        box-sizing: border-box;
        border: solid .1rem;
        font-size: var(--font-size-smallest);
    }
}
</style>