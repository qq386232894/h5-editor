<template>
  <div class="icon-label">
    <div :class="'iconfont icon-' + icon"></div>
    <div class="label">{{label}}</div>
  </div>
</template>

<script>
  export default {
    name: 'gls-icon-label',
    props: {
      icon:String,
      label:String
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped>
  .icon-label{
    color: #fff;
    opacity: 1;
    width:60px;
    height:50px;
    padding-top: 7px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
  }
  .icon-label:hover{
    background-color: #484d64;
  }

  .label{
    font-size: 12px;
  }


  @font-face {font-family: "iconfont";
    src: url('iconfont.eot?t=1504946759497'); /* IE9*/
    src: url('iconfont.eot?t=1504946759497#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAgUAAsAAAAAC2QAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAAQwAAAFZW70otY21hcAAAAYAAAACIAAAB3m3boUNnbHlmAAACCAAAA94AAAS8ngJE3GhlYWQAAAXoAAAAMQAAADYPntqKaGhlYQAABhwAAAAeAAAAJAirBFNobXR4AAAGPAAAABwAAAAcHO7//2xvY2EAAAZYAAAAEAAAABADzgSYbWF4cAAABmgAAAAfAAAAIAEcAIhuYW1lAAAGiAAAAUUAAAJtPlT+fXBvc3QAAAfQAAAAQwAAAFULrnv9eJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkUWKcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGBwYKl5IMjf8b2CIYW5gaAQKM4LkAOBLC7MAeJzFkcEJwzAMRZ8T15RSes8hG3SFbJFDR8gIOfbUITKgyBbplxUI7QL55hn+B0tGAi5AK54iQ/qQcL2Vppq33GqeGeUfXGkozNbbYJMta7dtyv/9oaQ3x3HfqGtW3SJTOE3pvNa/utf7tTufyLyjL1ofaGrYEPjWbAp8a7YEvsm1CyhfZNwhHHicVVJPbNtUGH/fe4mdxIkTO46d/4ljx06XLEttx1nTkVaMS8fGhjg0vQy1ouzEKiGgmgqsEioa0ihI0ANXhATiyglp03ZBk1BBHFoOIEATOyDx78iB+IXnFhhYz9/zJ3+/973v9/uhKELT++QWyaMsaqFZ9Bi6hBBwbWiIuAK67XVxG3J6NKcpIrENW+eNRpc8AlqDU1TH9yyN47k0iFAFV3d8u4tt6HsjPA+OWgEolIpPyc2yTN6GRN6u7tBz+H3I1YxyenSSLnUWFKeejW0mZbkgyzdjXDQawziSFuE5TY1H4wmOfhBNF3O3ajO4BsmCXTy/kqqX5NUb3tVKU4sDbG9DtlQXP1yQihJbLxfVrFzgM6lYvpgyTAU2Hwj5bLJi/YjYg9msr5PfyTVURzqbMtrgeMmyReCr4PgDqSlZxr+JZ9mz5E5wg8wQs31uDeO1d1nIG52l8PudNVxSyLXdXCl4NQHgt1q+34I/XqQvCX8n+OtcERDiWM/tCJBt1l1BHrqInkZbrDfvNiVF1fQRDKQuGHqONdasU2DwItgNq+/5CzDCThVqoCoc4xxscLQR45ZVM21yiuo6gy5mhS5hWOmY/354b6LwVVYgAgOFUMz0cNlROfy9e4W+Z5bhsGQCmCV6l4UgSjI3pbiYSSkRbpUTlIqSjDwjKGIsGYsGP2uDTLo0W9escuZMN6skzVQy9tMxHA7LpllebImNpCipFcl0Zx49qWmdUct/ogVob4/efVi4xz4nidiJdkEGOcmlU7+kJEGQ4r8VNDmaSGDNknr11rCSqc9WR2djMSkR5wVYD2/ZDtsc3Zl+9eSpuBSPcylIyMlUvrv4+GIn377oI5hOp9cjc4znLGNXl0RoWLakd8HzB3oVFI48oLvQW+oB3TV7PZO8xSI+DNBRgo7+hCH0SajZ9cgX7Kw0qjGvzKAOOoNQlgkWcnwsGPMO044drbFevB7qY4TO8awGB8aApb5TY85wNODjYF9IC2QqiACiMAEhfQHm22TaGQLbJ9CZw+A+C8PlIVuguUX6Qh901VdHcFbtq3DJo5/QN6+S4mQ/kRYF4gmiKLQZeNie7B/v+EonBA/pxyr99TRIWXkAFVmm+6ehRz9dRQKbaYf8SbbYTDJSURFVUQNZ6ATqIgf1Q86OXfSPJaGvuXYfXHj4Dv6XuVrfdsnBZJxRAdQM+ehon2ysj29DbUzfgC/HwTf4+XHgE31u8tll/F2wtYI7tLMMr9BvL9/b2CBbDPdf/GRlff32Gr0Pm8vUwdb5YBd/vjz5oUbmA2OMd4KDMRzQ18bQvDfeQOgvDLrpFQAAeJxjYGRgYABivfiWqfH8Nl8ZuFkYQODqzdPuMPr////1LGeZG4BcDgYmkCgAX20NsQAAAHicY2BkYGBu+N/AEMNy5j8QsJxlAIqgAHYAw9YIBQAABAAAAAPpAAAEAAAABAEAAAQ4//8EzAAABAAAAAAAAAAAdgCwAWQBigH0Al54nGNgZGBgYGeoYeBmAAEmIOYCQgaG/2A+AwAWIAGlAHicZY9NTsMwEIVf+gekEqqoYIfkBWIBKP0Rq25YVGr3XXTfpk6bKokjx63UA3AejsAJOALcgDvwSCebNpbH37x5Y08A3OAHHo7fLfeRPVwyO3INF7gXrlN/EG6QX4SbaONVuEX9TdjHM6bCbXRheYPXuGL2hHdhDx18CNdwjU/hOvUv4Qb5W7iJO/wKt9Dx6sI+5l5XuI1HL/bHVi+cXqnlQcWhySKTOb+CmV7vkoWt0uqca1vEJlODoF9JU51pW91T7NdD5yIVWZOqCas6SYzKrdnq0AUb5/JRrxeJHoQm5Vhj/rbGAo5xBYUlDowxQhhkiMro6DtVZvSvsUPCXntWPc3ndFsU1P9zhQEC9M9cU7qy0nk6T4E9XxtSdXQrbsuelDSRXs1JErJCXta2VELqATZlV44RelzRiT8oZ0j/AAlabsgAAAB4nG3BwQqAIBAFwPfUzfAvzWSRsCA1/PwOXZuBwSfgn6ehpaNwoecKTqmjlWTbo67n2aXUqDlsMR16X+PcgRfoPwwrAA==') format('woff'),
    url('iconfont.ttf?t=1504946759497') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
    url('iconfont.svg?t=1504946759497#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-music:before { content: "\e61d"; }

  .icon-svg:before { content: "\e69a"; }

  .icon-text:before { content: "\e668"; }

  .icon-image:before { content: "\e63d"; }

  .icon-background:before { content: "\e819"; }


</style>
