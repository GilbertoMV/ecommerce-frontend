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
    display: block;
    margin-bottom: .5rem;
}

input {
    width: 100%;
    padding: .8rem;
    box-sizing: border-box;
    border: solid .1rem;
}

input:focus {
    border-color: #62ab18;
    box-shadow: 0 0 .5rem rgba(98, 171, 24, 0.5);
    outline: none;
}
</style>