<template>
  <div class="Galerias" id="pagegaleria">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/galeria">galeria</router-link>|
      <router-link to="/mapa">Mapa</router-link>|
      <router-link to="/texto-reflexivo">Texto reflexivo</router-link>
    </div>
    <router-view />

    <div id="redeshome" class="container" >
      <ul id="social">
        <li v-for="(rsoacial, index) in dataSocial" :key="index">
          <a
            v-bind:href="rsoacial.url_redsocial"
            target="_blank"
            v-bind:title="rsoacial.red_social"
          >
            <img
              v-bind:src="urlservior+ rsoacial.img_social_red.url"
              class="img-fluid"
            />
          </a>
        </li>
      </ul>
    </div>
    <div id="contenidoInicio" class="container contenttitulo">
      <div class="row">
        <div class="centertitle col-md-12">
          <h2 class="subtitulo">{{this.listcategorias.subtitulo}}</h2>
        </div>
      </div>
      <div class="row">
        <div class="centertitle col-md-12">
          <h1 class="titulo">{{this.listcategorias.titulo}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-5 contentparrafo">
          <p class="parrafo">{{this.listcategorias.descripccionUna}}</p>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-2"></div>
        <div class="col-xs-12 col-sm-6 col-md-5 contentparrafo">
          <p class="parrafo">{{this.listcategorias.descripccionDos}}</p>
        </div>
      </div>
      <div class="row">
        <div class="infobusqueda col-xs-12 col-sm-7 col-md-7">
          <span class="info">{{this.listcategorias.InfoBusqueda}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 seccionbuscar">
          <form>
            <div class="row">
              <div class="col-md-12">
                <div class="contentformulario">
                  <input v-model="categoria" type="text" />
                  <button type="submit" class="go-button" @click.prevent="searchcategoria">Buscar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="grid" id="initgrid">
        <masonry :cols="{default: 5, 1000: 4, 700: 2, 400: 1}"   :gutter="{default: '10px', 700: '10px'}" data-masonry-options='{ "columnWidth": 200}'> >
          <div class="grid-item" v-for="posts in searchcategoria" :key="posts.id">
            <div class="contenedor-img galery">
              <div class="mascara">
                <img v-bind:src=" (posts.imagen)?(posts.imagen.url):'/'" class="img-fluid" />
                <div class="imfoImagen">
                  <h2>{{(posts.lista_category != null)?(posts.lista_category.nombre):''}}</h2>
                  <p>{{posts.titulo}}</p>
                  <div v-if="posts.Videosenal != null">
                    <a class="link" v-bind:href="'/detalle-galeria?id='+posts.id">Ver Imagen</a>   
                    <a class="link" v-bind:href="'/detalle-galeria-video?id='+posts.id"><img alt="Vue logo" src="../assets/play.svg"></a> 

                  </div>
                   <div v-else>
                      <a class="link" v-bind:href="'/detalle-galeria?id='+posts.id">Ver Imagen</a>
                       
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </masonry>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;
export default {
  name: "galaria",
  data() {
    return {
      urlservior:RUTA_SERVIDOR,
      loading: false,
      categoria: "",
      reflejo: "",
      images: [],      
      listcategorias: [],
      dataSocial: [],
      dataInicio: [],
      selected: "",    
     
      options: {
        //licenseKey: 'YOUR_KEY_HERE',
        afterLoad: this.afterLoad,

        navigation: false
      }
    };
  },

  mounted() {
    this.getImges();
    this.getInicioGaleria();
    
    let social = this;

     //axios.get("https://senales.herokuapp.com/inicio-home").then(function(response) {
      axios.get(RUTA_SERVIDOR).then(function(response) {
      social.dataSocial = response.data.header;
      console.log(social.dataSocial);
    });
  },

  methods: {
    getImges() {
      var senales = RUTA_SERVIDOR+"/senales";
      axios.get(senales).then(response => {
        this.images = response.data;  
        this.contentreflejos =  response.data;   
        console.log("señales");  
        console.log(this.images);
       
       
      });
    },

    getInicioGaleria() {
      var ini =RUTA_SERVIDOR+"/contenido-galeria";
      axios.get(ini).then(response => {
        this.listcategorias = response.data;
        console.log(this.listcategorias);
        console.log("esto es el inicio");
        
      });
    },

    search: function() {
      this.loading = true;
      var senales = RUTA_SERVIDOR+"/senales";
      axios.get(senales).then(response => {
        this.images = response.data;
        this.loading = false;
      });
    }
  },
  computed: {      
    searchcategoria: function() {
      //var searchString;
      var photos = this.images;
      var categoria = this.categoria;

      if (!categoria) {
        return photos;
      }

      categoria = categoria.trim().toLowerCase();

      photos = photos.filter(function(item) {
       if (item.lista_category != null){
            if (
          item.lista_category.nombre.toLowerCase().indexOf(categoria) !== -1 ||
          item.descripccion.toLowerCase().indexOf(categoria) !== -1 ||
          item.titulo.toLowerCase().indexOf(categoria) !== -1
        ) { 
          return item;
        }
      }
          
        
        if (
          //item.lista_category.nombre.toLowerCase().indexOf(categoria) !== -1 ||
          item.descripccion.toLowerCase().indexOf(categoria) !== -1 ||
          item.titulo.toLowerCase().indexOf(categoria) !== -1
        ) { 
          return item;
        }
      });

      return photos;
    }
  }
};
</script>

<style lang="less">
@import "~@/scss/galeria.less";


@media  (max-width: 991px){

  #nav {
    position: relative!important;
    transform: rotate(0deg)!important;
    top: 20px !important;
    z-index: 10 !important;
    margin-bottom: 27px!important;
    text-align: center;
}

  div#pagegaleria div#contenidoInicio, 
  div#pagegaleria #contenidoIniciodetalle {
    width: 100% !important;
    margin: 0 auto;
}
  div#pagegaleria div#contenidoInicio p.parrafo,
  div#pagegaleria #contenidoIniciodetalle p.parrafo,
  div#pagegaleria div#contenidoInicio label.parrafo,
  div#pagegaleria #contenidoIniciodetalle label.parrafo {
  text-align: left;    
  font-size: 17px !important;    
  }
  div#contenidoInicio .contentparrafo {
    flex: 100%;
    max-width: 100%;
}
.infobusqueda{
    flex: 100%;
    max-width: 100%;
}
.infobusqueda span{
    font-size: 15px;
}
.seccionbuscar {
    flex: 0 0 90% !important;    
    max-width: 90% !important;    
}
div#pagegaleria div#contenidoInicio .contentformulario button.go-button, 
div#pagegaleria #contenidoIniciodetalle .contentformulario button.go-button {
    position: absolute;
    right: 0 !important;
}
div#pagegaleria div#contenidoInicio .contentformulario input, 
div#pagegaleria #contenidoIniciodetalle .contentformulario input {
   
    width: 100% !important;
}
}

</style>

