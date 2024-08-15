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
    border: solid .1rem #62ab18;
    border-radius: .5rem;
    background-color: #d8f0c8;
}

input:focus {
    border-color: #62ab18;
    box-shadow: 0 0 .5rem rgba(98, 171, 24, 0.5);
    outline: none;
}

.dark-mode input {
    background-color: var(--txtc-darkmode-1);
}

.dark-mode label {
    color: var(--txtc-darkmode-1);
}

@media (width <=390px) {
    label {
        font-size: 1.4rem;
    }

    input {
        padding: .5rem;
        box-sizing: border-box;
        border: solid .1rem;
        font-size: 1.3rem;
    }
}
</style>