<template lang="pug">
  .containera
    #login(v-show="!scatter")
      h1.display_mobile| {{$t('Content1')}} （<a href="https://get-scatter.com/" style="" target="_blank">{{$t('Content2')}}</a>，<a href="https://nano.EOS.io/index_cn.html" style="" target="_blank"> Token Pocket</a>）
      h3.display_mobile| {{$t('Content3')}}
    #draw(v-show="scatter")
            section.hero.head
              .hero-body
                  .container
                      h1.title| {{$t('H1Title1')}}
                      el-form(:inline="true" :model="null" class="demo-form-inline")
                        el-form-item(label="购买金额")
                          el-input-number(v-model="amount" label="EOS" :precision="4" :step="0.0001") | EOS
                        el-form-item()
                          el-button(type="danger" @click="draw")| 梭哈
                      //- h2.subtitle| {{$t('H2Title1')}} {{getCardsLeft}} {{$t('H2Title2')}}
                      //- h2.subtitle| {{$t('H2Title3')}}
                      //- h1.title| {{ getPrice }} NAS / {{$t('CardUnit')}}
            .container
                .buttons(style="width: 18rem")
                  //- a.button.is-primary(@click="draw")|
                  //- a.button.is-primary(@click="setQty(3)")|{{$t('Draw')}} 3 {{$t('CardUnit')}}
                  //- a.button.is-primary(@click="setQty(6)")|{{$t('Draw')}} 6 {{$t('CardUnit')}}
                  //- a.button.is-primary(@click="setQty(9)")|{{$t('Draw')}} 9 {{$t('CardUnit')}}
                  //- a.button.is-primary(@click="setQty(12)")|{{$t('Draw')}} 12 {{$t('CardUnit')}}
                  //- a.button.is-primary(@click="setQty(16)")|{{$t('Draw')}} 16 {{$t('CardUnit')}}
                  //- a.button.is-primary(@click="setQty(32)")|{{$t('Draw')}} 32 {{$t('CardUnit')}}
                  //- a.button.is-primary(@click="setQty(64)")|{{$t('Draw')}} 64 {{$t('CardUnit')}}
                  //- a.button.is-primary(@click="setQty(128)")|{{$t('Draw')}} 128 {{$t('CardUnit')}}
                  //- a.button.is-primary(@click="setQty(1024)")|{{$t('Draw')}} 1024 {{$t('CardUnit')}}
                  <br>


</template>

<script>
import Cookie from 'js-cookie';
import Contract from '@/contract/cryptohero';
import { BigNumber } from 'bignumber.js';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      amount: 0.0001,
    };
  },
  asyncComputed: {
    // async getCardsLeft() {
    //   const contract = new Contract();
    //   console.log(contract);
    //   const result = await contract.getDrawCardsLeft();
    //   return result;
    // },
    // async getPrice() {
    //   const contract = new Contract();
    //   const result = await contract.getDrawPrice();
    //   return new BigNumber(result).div(1000000000000000000).toString();
    // },
  },
  computed: {
    ...mapState(['me', 'scatter']),
    ...mapGetters({
      eosClient: 'eos',
      account: 'account',
    }),
    // displayCount() {
    //   return `${this.count} 张`;
    // },
    // getDisplayTotal() {
    //   // return new BigNumber(this.getPrice).times(this.count).toNumber();
    //   const d = new BigNumber(0.00001); // for mainnet
    //   //       const d = new BigNumber(0.0000000000000000000000000000000000000001); // for testnet
    //   const a0 = new BigNumber(this.getPrice);
    //   const n = new BigNumber(this.count);
    //   return a0.times(n).plus((n.minus(1)).times(n).times(d).div(2));
    // },
  },
  methods: {
    async draw() {
      const referrer = Cookie.get('referrer') || '';
      const { account, amount } = this;
      try {
        if (amount <= 0) {
          throw new Error('Invalid Amount of EOS');
        }
        await this.eosClient.transfer(
          account.name,
          'cryptoherooo',
          `${amount} EOS`,
          'draw',
        );
        alert('购买抽卡福袋成功');
      } catch (err) {
        console.error(JSON.stringify(err));
        switch (err.type) {
          case 'signature_rejected': alert('You canceled the transfer'); break;
          default: alert('购买失败');
        }
      }

      // if (result != 'cancel') {
      //   setTimeout(async () => {
      //     const result1 = await contract.checkSerialNumber(result);
      //     if (JSON.parse(result1).data.status == 1) {
      //       if (referrer) {
      //         const formData = new FormData();
      //         formData.append('address', this.$store.state.me);
      //         // formData.append('address', referrer);
      //         formData.append('inviteaddress', referrer);// this.$route.params.address);
      //         formData.append('cardnum', this.count);
      //         formData.append('price', this.getPrice);
      //         formData.append('witchnet', this.$store.getters.getContractNet);// "test");
      //         formData.append('sn', result);
      //         this.$http
      //           .post(`${this.$store.getters.getServerURL}inviteshuihuadd.php`, formData)
      //           .then((response) => {
      //             const res = response.body;
      //             console.log(res);
      //             alert('抽卡成功，到我的收藏里看看吧');
      //           });
      //       } else {
      //         alert('抽卡成功，到我的收藏里看看吧');
      //       }
      //     }
      //     // console.log("crytpresp:"+JSON.parse(result1)["msg"]);
      //   }, 20000);
      // }
    },

    async airdrop() {
      const contract = new Contract();
      const referrer = Cookie.get('referrer') || '';

      console.log(`crytpresp:${referrer}`);
      const result = await contract.airdrop(referrer, this.getDisplayTotal);
      console.log(`crytpresp00:${result}`);

      // if (result != 'cancel') {
      //   setTimeout(async () => {
      //     const result1 = await contract.checkSerialNumber(result);
      //     if (JSON.parse(result1).data.status == 1) {
      //       if (referrer) {
      //         const formData = new FormData();
      //         formData.append('address', this.$store.state.me);
      //         // formData.append('address', referrer);
      //         formData.append('inviteaddress', referrer);// this.$route.params.address);
      //         formData.append('cardnum', this.count);
      //         formData.append('price', this.getPrice);
      //         formData.append('witchnet', this.$store.getters.getContractNet);// "test");
      //         formData.append('sn', result);
      //         this.$http
      //           .post(`${this.$store.getters.getServerURL}inviteshuihuadd.php`, formData)
      //           .then((response) => {
      //             const res = response.body;
      //             console.log(res);
      //             alert('抽卡成功，到我的收藏里看看吧');
      //           });
      //       } else {
      //         alert('抽卡成功，到我的收藏里看看吧');
      //       }
      //     }
      //     console.log(`crytpresp:${JSON.parse(result1).msg}`);
      //   }, 20000);
      // }
    },
  },
};
</script>

<style scoped>
#draw {
  background: #ecdaa8;
  border-radius: 8px;
}
.buttons {
  margin: 1rem;
}

#login {
  width: 100%;
  height: 93px;
  padding: 22px;
  background-color: #ecdaa8;
  font-size: 20px;
  margin-bottom: 27px;
  border-radius: 8px;
}
#login a {
  color: brown;
}
</style>
