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
                      h2.subtitle| 一般人我都不告诉他：金额越高卡牌越多哦
                      el-form(:inline="true" :model="null" class="demo-form-inline")
                        el-form-item(label="购买金额")
                          el-input-number(v-model="amount" label="EOS" :precision="4" :step="0.0001")
                          span| EOS
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
import { Notification } from 'element-ui';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      amount: 1,
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
      const { account, amount, createHexRandom } = this;
      const toFixedAmount = `${amount.toFixed(4)} EOS`
      try {
        if (amount <= 0) {
          throw new Error('Invalid Amount of EOS');
        }
        var txCommand = `draw ${createHexRandom()}`
        if (referrer !== '') { txCommand += ` inviter${referrer}` }
        await this.eosClient.transfer(
          account.name,
          'cryptoherooo',
          toFixedAmount,
          txCommand,
        );
        Notification.success({
          title: '购买交易成功',
          message: '系统稍后将会揭晓抽奖结果',
          duration: 0,
        });
      } catch (err) {
        switch (err.type) {
          case 'signature_rejected':
            Notification.error({
              title: '购买失败',
              message: '你拒绝了交易签名',
              duration: 0,
            });
            break;
          default: {
            Notification.error({
              title: '购买失败',
              message: err.message || JSON.stringify(err),
              duration: 0,
            });
          }
        }
      }
    },
    createHexRandom() {
            var num = '';
            for (let i = 0; i < 64; i++) {
                var tmp = Math.floor(Math.random() * 16);
                if (tmp > 9) {
                    switch (tmp) {
                        case (10):
                            num += 'a';
                            break;
                        case (11):
                            num += 'b';
                            break;
                        case (12):
                            num += 'c';
                            break;
                        case (13):
                            num += 'd';
                            break;
                        case (14):
                            num += 'e';
                            break;
                        case (15):
                            num += 'f';
                            break;
                    }
                } else {
                    num += tmp;
                }
            }
            return num;
        }
  },
};
</script>

<style scoped>
#draw {
  background: #ecdaa8;
  border-radius: 8px;
  text-align: center;
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
