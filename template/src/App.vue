<template>
  <div id="app">
    {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
  </div>
</template>

<script>
import TestService from '@/common/services/TestService'
{{#unless router}}
import HelloWorld from './common/components/HelloWorld'

{{/unless}}
export default {
  name: 'App'{{#router}}{{else}},
  components: {
    HelloWorld
  },{{/router}}
    created() {
        TestService.testAxios()
    }
}
</script>

