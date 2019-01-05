<template>
  <div class="container">
    <h1>Current ETH price : {{currentValue}} USD</h1>
    <h1>{{loading}}</h1>
    <button class="button is-primary" @click="setValue">Update Price</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import Web3 from "web3";
const MyContract = require("../../../build/contracts/EthPrice.json");
@Component
export default class HelloWorld extends Vue {
  contractValue: string = "";
  currentValue: string = "";
  loading: string = "";
  isValueUpdated: boolean = false;
  async setValue() {
   const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
    let myContract = new web3.eth.Contract(
      MyContract.abi,
      "0x345ca3e014aaf5dca488057592ee47305d9b3e10"
    );

    let setValue = await myContract.methods.update().send({from: '0x627306090abab3a6e1400e9345bc60c78a8bef57' , gas: '900000', value: '500000000000000000'})
    if(setValue)
    {
        this.isValueUpdated = true
        console.log(setValue)
    }
    
  }
  async getCurrentValue() {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));
    let myContract = new web3.eth.Contract(
      MyContract.abi,
      "0x345ca3e014aaf5dca488057592ee47305d9b3e10"
    );

    let getValue = await myContract.methods.ethPriceUsd().call().then(result => {
        this.currentValue = result
    })

  }
  @Watch("isValueUpdated")
  onPropertyChanged(newValue: boolean, oldValue: boolean) {
    if (newValue == true) {
      window.location.reload(true);
    }
  }
  mounted() {
    this.getCurrentValue();
  }
}
</script>

<style scoped lang="scss">
</style>