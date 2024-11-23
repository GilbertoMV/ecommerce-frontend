<template>
    <div class="form-group">
        <label class="form__label" :for="name">{{ label }} <span class="form__required">*</span></label>
        <input class="form__input" :type="type" :id="name" :name="name" :value="value" :placeholder="label"
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
    display: flex;
    flex-direction: column;
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