<template>
  <div id="app">
    <img id="humboldt-badge" src="./assets/humboldt_badge.png" alt="Humboldt">
    <div class="container">
      <h1>DDoSX ACL Control</h1>
      
      <md-field>
        <label>API Key</label>
        <md-input id="apiKey" type="password"></md-input>
      </md-field>

      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-40">
          <md-field>
            <label>Add Domain</label>
            <md-input id="apiKey" type="text" v-model="newDomain"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-10">
          <md-button  class="md-layout-item md-raised" @click="addDomain()">Add</md-button>
        </div>        
      </div>
      
      <div id="global-controls" class="md-layout md-gutter md-alignment-center-right">
        <div class="md-layout-item md-layout md-size-50">            
          <md-button  class="md-layout-item md-raised" @click="blockAll()">Block All</md-button>
          <md-button  class="md-layout-item md-raised" @click="deployAll()">Deploy All</md-button>
          <md-button  class="md-layout-item md-raised" @click="allowAll()">Allow All</md-button>
        </div>  
      </div>
      
      <md-content v-for="domain in domains" v-bind:key="domain.name" class="md-elevation-5">
        <div class="md-layout md-gutter md-alignment-center-space-between">
          <div class="md-layout-item">
            <h2>{{ domain.name }}</h2>
            <small>{{ domain.blockAclId }}</small>
          </div>
          <div class="md-layout-item md-layout">            
            <md-button :disabled="domain.blockButtonDisabled" class="md-layout-item md-raised md-primary" @click="domain.blockAccess()">{{ domain.blockButtonText }}</md-button>
            <md-button :disabled="domain.deployButtonDisabled" class="md-layout-item md-raised md-accent" @click="domain.deployChanges()">{{ domain.deployButtonText }}</md-button>
            <md-button :disabled="domain.allowButtonDisabled" class="md-layout-item md-raised md-accent" @click="domain.allowAccess()">{{ domain.allowButtonText }}</md-button>
          </div>
        </div>       
      </md-content>

    </div>
  </div>
</template>

<script>
import { DdosxAclClient } from './ddosClient'
import SRCDOMAINS from './domains.json'

export default {
  name: 'App',
  data() {
    return {
      domains: [],
      newDomain: ""
    }
  },
  created() {
    // Create ddos acl client for each domain
    SRCDOMAINS.forEach((domainName) => {
      this.domains.push(new DdosxAclClient(domainName));
    })
  },
  methods: {
    addDomain() {
      this.domains.push(new DdosxAclClient(this.newDomain));
    },
    blockAll() {
      this.domains.forEach((domain) => {
        domain.blockAccess();
      })
    },
    deployAll() {
      this.domains.forEach((domain) => {
        domain.deployChanges();
      })
    },
    allowAll() {
      this.domains.forEach((domain) => {
        domain.allowAccess();
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  justify-content: center;
}
.md-content {
  padding: 16px;
  margin-bottom: 16px;
}
#global-controls {
  padding: 16px;
}
.container {
  width: 800px;
}
#humboldt-badge {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>
