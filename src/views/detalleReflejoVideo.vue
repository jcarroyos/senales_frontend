<template>
  <div class="Galerias" id="pagegaleria">  
     <full-page v-bind:options="options">
      <!--<div class="section fondodetalle"  v-bind:style="{backgroundImage: 'url('+'https://senales.herokuapp.com' + this.images[0].Multimedia.url + ')' }">-->
      <div  class="section fondodetalle">
      
        <video-background  v-bind:src="((this.images.length>0)&&(this.images.videoReflejo == undefined)&&(this.images[0].videoReflejo!=null))?(urlservior+this.images[0].videoReflejo.url):''"  style="max-height: 1000px; height: 100vh;" overlay="linear-gradient(45deg,#2a4ae430,#fb949e6b)" >
          
       </video-background>
       <div id="nav">
        <router-link to="/">Home</router-link>|
        <router-link to="/galeria">galeria</router-link>|
        <router-link to="/mapa">Mapa</router-link>
        </div>
        <router-view />
      
      </div>
      <div class="section">
        <div id="contenidoIniciodetalle" class="container contenttitulo">
          <div class="row">
            <div class="col-md-12">
              
            </div>
          </div>
          <div class="row">            
            <div class="centertitle col-md-12">
              <a  v-bind:href="'/galeria'" title="Volver" class="btn btn-defalult" >
                <img alt="Vue logo" src="../assets/leftarrow.svg">
              </a>
            <h1 class="titulo">{{this.images.length>0?this.images[0].Nombre:''}}</h1>
             
            </div>
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-5">
              <p class="parrafo">{{this.images.length>0?this.images[0].Descripcion:''}}</p>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-2"></div>
            <div class="col-xs-12 col-sm-6 col-md-5">              
               
               <p class="parrafo"><strong><label class="detallecategoria">Municipio:</label> </strong>{{((this.images.length>0)&&(this.images.lugars == undefined)&&(this.images[0].lugars!=null)&&(this.images[0].lugars.length>0))?(this.images[0].lugars[0].Municipio):''}}</p>
               <p class="parrafo"><strong><label class="detallecategoria">Lugar:</label> </strong>{{((this.images.length>0)&&(this.images.lugars == undefined)&&(this.images[0].lugars!=null)&&(this.images[0].lugars.length>0))?(this.images[0].lugars[0].Nombre):''}}</p>
             </div>
          </div> 
           <div class="row">
                <div class="infobusqueda col-xs-12 col-sm-7 col-md-7">
                <span class="info">Señal asociada</span>
                </div>
            </div>                  
          <div class="row">
        <div class="container-fluid">
              <div class="grid" id="detallereflejos">
               
                <masonry :cols="{default: 5, 1000: 4, 700: 2, 400: 1}"   :gutter="{default: '10px', 700: '10px'}" data-masonry-options='{ "columnWidth": 200}'> >
                  <div class="grid-item">
                    <div class="contenedor-img galery">
                      <div class="mascara">
                            <img v-bind:src="(this.images.length>0)?(urlservior+this.images[0].senale.imagen.url):'/'" class="img-fluid" />
                            <div class="imfoImagen">  
                                <p>{{this.images[0]?this.images[0].senale.titulo:''}} </p>    

                                <div v-if="this.images[0].senale.Videosenal != null">  
                                    <a class="link" v-bind:href="+this.images.length>0?'/detalle-galeria?id='+this.images[0].senale.id:''">Ver Imagen</a> 
                                    <a class="link" v-bind:href="this.images.length>0?'/detalle-galeria-video?id='+this.images[0].senale.id:''"><img alt="Vue logo" src="../assets/play.svg"></a> 

                                  </div> 
                                  <div v-else>                               
                                    <a class="link" v-bind:href="+this.images.length>0?'/detalle-galeria?id='+this.images[0].senale.id:''">Ver Imagen</a>   
                                  </div> 
                            </div>
                        </div>
                    </div>
                  </div>
                </masonry>
              </div>
            </div>
          </div>
        </div>
      </div>
    </full-page>
    
   
 
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
      images: [],      
      listcategorias: [],      
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
    console.log(this.$route.query.id) 
  },

  methods: {
    getImges() {        
        console.log(this.$route.query.id) 
        var idparametro = this.$route.query.id
        //var senales = "https://senales.herokuapp.com/reflejos?id="+idparametro;
        var senales =RUTA_SERVIDOR+"/reflejos?id="+idparametro;
        axios.get(senales).then(response => {
        this.images = response.data;            
        console.log("señales objeto referencia");  
        console.log(this.images);  
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
        debugger;
        if (
          item.lista_category.nombre.toLowerCase().indexOf(categoria) !== -1 ||
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
</style>

