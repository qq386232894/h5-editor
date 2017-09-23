<style lang="scss">
    .checkbox-component {
        > input {
            opacity: 0;
            position: absolute;
            cursor: pointer;

            + label > .input-box {
                display: inline-block;
                border: 2px solid #CCD5DB;
                border-radius: 14%;
                margin: 0;
                padding: 0;
                width: 14px;
                height: 14px;
                background: #fff;
                overflow: hidden;
                vertical-align: -5%;
                user-select: none;
                background: #FFFFFF;
                float: left;
                > .input-box-tick {
                    width: 100%;
                    height: 100%;

                    > path {
                        opacity: 0;
                        stroke: #000;
                        stroke-width: 2.3px;
                        stroke-dashoffset: 20;
                        stroke-dasharray: 20;
                        transition: stroke-dashoffset 0.15s ease-in;
                    }
                }
            }

            +label >.checkbox-text{
              float: left;
              margin-left: 8px;
              height: 18px;
              line-height: 18px;
            }

            &:hover{
              + label > .input-box {
                border-color: #44CB83;
              }
            }

            &:checked + label > .input-box > .input-box-tick > path {
                opacity: 1;
                stroke-dashoffset: 0;
                background-color: #44CB83;
                stroke: #FFFFFF;
            }
            &:checked + label > .input-box{
              border-color: #44CB83;
              background-color: #44CB83;
            }

            /*&:focus + label > .input-box {*/
                /*box-shadow: 0 0 2px 3px rgba(115, 185, 255, 0.69);*/
            /*}*/
        }
    }
</style>

<template>
    <div class="checkbox-component">
        <input type="checkbox"
               :id="id"
               :name="name"
               :value="value"
               :class="className"
               :required="required"
               @change="onChange"
               :checked="state">
        <label :for="id">
            <slot name="input-box">
                <span class="input-box">
                    <svg class="input-box-tick" viewBox="0 0 16 16">
                        <path fill="none" d="M1.7,7.8l3.8,3.4l9-8.8"></path>
                    </svg>
                </span>
            </slot>
            <span class="checkbox-text">
              <slot></slot>
            </span>
        </label>
    </div>
</template>

<script>
    export default {
        model: {
            prop: 'modelValue',
            event: 'input'
        },

        props: {
            id: {
                type: String,
                default: function () {
                    return 'checkbox-id-' + this._uid;
                },
            },
            name: {
                type: String,
                default: null,
            },
            value: {
                type: [String, Boolean],
                default: null,
            },
            modelValue: {
                type: [String, Boolean, Array],
                default: undefined,
            },
            className: {
                type: String,
                default: null,
            },
            checked: {
                type: Boolean,
                default: false,
            },
            required: {
                type: Boolean,
                default: false,
            },
            model: {}
        },

        computed: {
            state () {
                if (this.modelValue === undefined) {
                    return this.checked;
                }

                if (Array.isArray(this.modelValue)) {
                    return this.modelValue.indexOf(this.value) > -1;
                }

                return !!this.modelValue;
            }
        },

        methods: {
            onChange() {
                this.toggle();
            },

            toggle() {
                let value;

                if (Array.isArray(this.modelValue)) {
                    value = this.modelValue.slice(0);

                    if (this.state) {
                        value.splice(value.indexOf(this.value), 1);
                    } else {
                        value.push(this.value);
                    }
                } else {
                    value = !this.state;
                }

                this.$emit('input', value);
            }
        },

        watch: {
            checked(newValue) {
                if (newValue !== this.state) {
                    this.toggle();
                }
            }
        },

        mounted() {
            if (this.checked && !this.state) {
                this.toggle();
            }
        },
    };
</script>
