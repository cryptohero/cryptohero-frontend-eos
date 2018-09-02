<template>
<div>
<section>
  <div class="userContainer">
      <div class="userPanel">
        <h2 class="title" style="color: aliceblue"> {{username}} {{$t('Collect')}} </h2>
        <p class="useraddress">
          {{$t('Content4')}} {{total}} / 108 {{$t('CardUnit')}} | {{$t('ownerCards')}}：{{totalCards}} {{$t('CardUnit')}}
          <el-button id="btn" type="success" round @click.native="claim()">{{$t('Finished')}}</el-button> </p>
      </div>
    </div>
    </section>
  <section>
      <div class="columns is-multiline is-mobile section2div">
        <!-- <pulse-loader v-if="loading" /> -->
        <div class="column is-3-desktop is-4-tablet is-12-mobile cardItem card-image"
            v-for="item in cardlist"  :key="item.id"
            @click="gotoCoinProfile(item)" style="margin-top: 18px;">
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardBack()">
            </div>
            <div class="smallcardcharas">
              <img class="charaimg" v-lazy="getCardLightBack()">
            </div>
          <img class="cardItemImg imageborder8 image is-5by4" alt="" :src="item.front"/>
          <div class="imageborder3">
            <span>
            <a  class="name" :style="{ lineHeight: '10px', color: item.textcolor, paddingLeft: '30px' }">
              {{item.nickname}} · {{item.name}}</a>
          </span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination layout="prev, pager, next" :total="1000" />
      </div>
    </section>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import CardItem from '@/components/CardItem';
import PulseLoader from 'vue-spinner/src/PulseLoader';
import Paginate from 'vuejs-paginate';
import { Message } from 'element-ui';
import network from "../config/network";
import superagent from "superagent";
import hero from "../config/cards.json";

export default {
  name: 'UserCollectionPage',
  data: () => ({
    loading: true,
    cardlist: [],
  }),
  components: {
    Message,
    CardItem,
    PulseLoader,
    Paginate,
  },
  asyncComputed: {
    
  },
  methods: {
    async fetchCardsList() {
      const {host, protocol} = network
      const {body} = await superagent.post(`${protocol}://${host}/v1/chain/get_table_rows`, {
        json: true,
        "scope": "cryptoherooo",
        "code": "cryptoherooo",
        "table": "card",
        "limit": 10000
      })
      const tokens = body.rows.filter(record => record.owner === this.username)
      console.log(tokens)

      this.cardlist = tokens.map(token => {
      const cardImage = {
        // code: id,
        front: `http://test.cdn.hackx.org/heros_new/${token.type}.jpeg`,
        back: `http://test.cdn.hackx.org/backs_new/${token.type}.jpeg`,
      }
        return Object.assign(token, hero[token.type], cardImage)
      })
      this.loading = false
    },
    gotoCoinProfile(em) {
      if (this.actionFlag) {
        this.$router.push({ path: `/item/${em.tokenId}/${em.code}` });
      } else {
        Message.warning({
          message: '请到首页购买，或抽牌，谢谢!',
          type: 'warning',
        });
      }
    },
    getCardBack() {
      return `http://test.cdn.hackx.org/cardback/cardback_light.png`;
    },
    getCardLightBack() {
      return `http://test.cdn.hackx.org/cardback/cardback.png`;
    }
  },
  async created() {
    await this.fetchCardsList()
  },
  computed: {
    ...mapGetters(['eos']),
    totalCards() {
      return this.cardlist.length
    },
    total() {
      const heros = {}
      var acc = 0
      for (const curCard of this.cardlist) {
        if (!(heros[curCard.type])) {
            heros[curCard.type] = true
            acc += 1;
        }
      }
      return acc
    },
    username() {
      return this.$route.params.address
    }
  },
};
</script>

<style type="text/css">
@media (max-width: 800px) {
  .pageitem {
    padding-right: 10px;
    padding-left: 10px;
  }
}
.pageitema {
  color: #9a7039;
}
</style>

<style scoped>
/*
  section 1
*/
.userContainer {
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  /*padding-top: 43.5%;*/
  padding-top: 3%;
  position: relative;
  text-align: center;
}
.usericon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* padding-top: 60px; */
}
.iconimg{
  border-radius: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.usercontent {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;

}
.usercontent h2{
  padding-top: 15%;
  color: blanchedalmond;
}
.useraddress {

   color: blanchedalmond;
}
.name {

   color: blanchedalmond;
}
.title11{
  width: 100%;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  color: blanchedalmond;
  font-size: 24px;
}
/*
  section 2
*/
.section2div {
  padding-right: 50px;
  padding-left: 50px;
  padding-top: 30px;
  padding-bottom: 50px;
}
.cardItemImg{
  vertical-align:bottom;
  cursor: pointer;
  /* border: 8px solid #ecdaa8;
    border-radius: 8px; */
}
.priceSpan {
  float:right;
  padding-right: 20px;
}
.imageborder8{
  border-top: 36px solid #00000000;
  border-left: 36px solid #00000000;
  border-bottom: 34px solid #00000000;
  border-right: 22px solid #00000000;
}
.smallcardcharas {
  position: absolute;
}
.charaimg{
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}
.pagination {
  width: 50vw;
  background-color: #fdefac;
  margin-left: auto;
  margin-right: auto;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
  border-radius: 30px;
  border: 3px #9a7039 solid;
}

.button-search{
  display: flex;
  display: -webkit-flex;
}
.btn-item{
  margin: 10px;
}
.button-search{
    width: 100%;
    height: 77px;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
.navbar-item{
  display: none;
}
@media (max-width: 800px) {
  .cardContainer {
    background-size: cover;
    padding-top: 60%;
  }
  .charaimg{
    width: 100%;
  }
  .btnContainer {
    padding-top: 50%;
  }

  .section2div {
    padding-top: 22px;
  }
  .cardItemImg{
    width: 100%;
  }

  .pagination {
    width: 90vw;
  }
}
.price{
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.price1{
 border-radius: 8px;
    width: 300px;
    height: 50px;
    background-color: rgba(249, 137, 137, 0.55);
    margin: 20px;
    text-align: center;
    border: 1px solid #ffd67a;
}
.price1 b{
  color: #f7ad89;
    line-height: 50px;
    font-size: 18px;
}
@media (max-width: 420px) {
  .select select {
    background-color: #fff1ba;
    color: #606266;
}
  .navbar-item{
      margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.button-search{
  display:none;
}
  .usercontent{
    padding-top: 27%;
}
}
.pagination {
  background: white;
}
</style>

