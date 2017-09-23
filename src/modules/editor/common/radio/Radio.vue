<style lang="scss">
    .radio-component {
      display: inline-block;
        > input {
            opacity: 0;
            position: absolute;
          cursor: pointer;

            + label > .input-box {
                display: inline-block;
                border: 2px solid #CCD5DB;
                border-radius: 50%;
                margin: 0;
                padding: 0;
                width: 12px;
                height: 12px;
                background: #fff;
                overflow: hidden;
                vertical-align: -5%;
                user-select: none;
                float: left;
                margin-top: 1px;

                > .input-box-circle {
                    display: block;
                    margin: 50%;
                    width: 0%;
                    height: 0%;
                    background: #44CB83;;
                    border-radius: 50%;
                    opacity: 0;
                    transition: width 0.15s ease-in, height 0.15s ease-in, margin 0.15s ease-in;
                }
            }

          &:checked + label > .input-box{
            border-color: #44CB83;
          }

            &:checked + label > .input-box > .input-box-circle {
                opacity: 1;
                margin: 3px;
                width: 6px;
                height: 6px;
            }

            /*&:focus + label > .input-box {*/
                /*box-shadow: 0 0 2px 3px #73b9ff;*/
            /*}*/

            +label >.radio-text{
              float: left;
              margin-left: 8px;
              height: 18px;
              line-height: 18px;
            }
        }
    }
</style>

<template>
    <div class="radio-component">
        <input type="radio"
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
                    <span class="input-box-circle"></span>
                </span>
            </slot>
           <span class="radio-text">
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
                    return 'radio-id-' + this._uid;
                },
            },
            name: {
                type: String,
                default: null,
            },
            value: {
                type: [String, Boolean],
                default: '',
            },
            modelValue: {
                type: [String, Boolean],
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

                return this.modelValue === this.value;
            }
        },

        methods: {
            onChange() {
                this.toggle();
            },

            toggle() {
                this.$emit('input', this.state ? '' : this.value);
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
    }
</script>
