<template>
  <footer class="footer">
    <div class="container">
      <div class="columns">
        <div class="column is-4">
          <div class="content">
            <router-link class="navbar-item"
                         :to="{ name: 'Home'}">
              {{$t('Home')}}
            </router-link>
            <router-link class="navbar-item"
                         :to="{ name: 'FAQ'}">
              {{$t('FAQs')}}
            </router-link>
          </div>
        </div>
        <div class="column is-4">
          <div class="content">
            <router-link class="navbar-item"
                         :to="{ name: 'Term'}">
              {{$t('Terms of Service')}}
            </router-link>
            <router-link class="navbar-item"
                         :to="{ name: 'Privacy'}">
              {{$t('Privacy Policy')}}
            </router-link>
          </div>
        </div>
        <div class="column is-4">
          <div class="content">
            <span> {{$t('Contact Us')}}</span>
            <p>
            <a href="https://t.me/joinchat/HnyfLBIu5MLCbzGcUvny3g"
               target="_blank">
              <i class="iconfont icon-telegram"></i>
            </a>
            <a href="https://discord.gg/xmgnpsV"
               target="_blank">
              <i class="iconfont icon-Discord"></i>
            </a></p>
            <p>Wechat Group: add wechat friend "X71tel"</p>
          </div>
        </div>
      </div>
      <div class="content has-text-centered">
        <p>
          <small>
            All rights reserved. <br>
            &copy; Copyright 2018
            <strong>CryptoHero.pro</strong>
          </small>
        </p>
      </div>
    </div>
  </footer>
</template>
<style scoped>
@import url("https://at.alicdn.com/t/font_814713_rk2ayl74l9q.css");
.footer {
    background-color: #000;
    color: #ecdaa8;
}
.navbar-item {
  color: #ecdaa8;
}
.iconfont {
  font-size: 2rem;
}
.icon-Discord {
  color: #7289da
}
</style>
