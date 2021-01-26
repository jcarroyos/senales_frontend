<template>
    <div :v-for="dataInicio in dataInicio" :key="dataInicio.id">
        <div>     
            <full-page v-bind:options="options"  id="fondoinicio" v-bind:style="{ backgroundImage:(dataInicio.ImageFondo)?('url('+urlservior + dataInicio.ImageFondo.url):''+')' }">
              <div class="section">
                <div id="redeshome" class="container">
                    <ul id="social">
                        <li v-for="(rsoacial, index) in dataSocial" :key="index">
                          <a v-bind:href="rsoacial.url_redsocial"  target = "_blank" v-bind:title="rsoacial.red_social">  
                              <img v-bind:src="urlservior+ rsoacial.img_social_red.url" class="img-fluid">                  
                          </a>                  
                        </li>
                    </ul>
                  </div>
                  
                  <div id="nav" style="display:none">
                      <router-link to="/">Home</router-link> |
                      <router-link to="/galeria">galeria</router-link>
                  </div>

                  <div class="container" id="slierscontent"> 
                    <carousel  :autoplay="false" :nav="false" :items="1" :loop="true" :autoplayTimeout="5000">                           
                              <div class="carousel-inner" v-for="(data, index) in dataSlider" :key="index" >
                                 <div class="" v-if="data.video != null">
                                   <div class="video">
                                        <video  controls :src="urlservior+data.video.url"></video>                 
                                    </div>   
                                  </div> 
                                  
                                  <div class="" v-else>
                                    <div class="imgfondo" v-bind:style="{ backgroundImage:(data.imagen)&&(data.imagen != null)?('url('+urlservior+ data.imagen.url):''+')' }">  
                                      <h2 class="titulsliersld">{{data?data.titulo:''}}</h2>
                                      <h2 class="subtitulosld">{{data?data.subtitulo:''}}</h2>
                                      <p class="subtitulosld">{{data?data.descripccion:''}}</p>
                                  </div>  
                          </div>
                        </div>   
                           
                          
                         
                         
                          
                    </carousel>
                  </div>
              </div>
              <div class="section" v-bind:id="category.alias" v-for="(category, index) in dataSeccion" :key="index">

               <div class="container category" id="">
                <div  class="row">           
                   <div class="col-xs-12 col-sm-8 col-md-8 posisicion">    
                    <h2 class="titulosec">{{category.titulo_seccion}}</h2>
                    <h2 class="subtitulosec">{{category.subtitulo_seccion}}</h2>
                      <div class="botonseccion">
                        <a v-bind:href="category.boton_seccion.url_boton"  target = "_blank" v-bind:title="category.boton_seccion.nombre_boton">  
                          {{category.boton_seccion.nombre_boton}}
                        </a>                         
                      </div>    
                    </div>     
                </div>
             
             </div>
              </div>
              <div class="section">

               
              </div>
            </full-page>
        </div>
        <router-view/>  
    </div>
</template>
<script>

import axios from 'axios'
import carousel from 'vue-owl-carousel'
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;

export default {
  name: 'inicio',
  components: { 
   carousel,
  
  },
 

   data() {   
      return {
        urlservior:RUTA_SERVIDOR,
        loading: false,
        tag: '',
        dataInicio: [],
        dataSlider:[],
        dataSocial:[],
        dataSeccion:[],
       options: {
                fluid: true,
                techOrder: ["html5"],
                controls: true,
                loop: this.loop,
                autoplay: 'play',
                preload: 'auto',
                language: this.language
            },
        
      }
    },

    methods: {

    },
    mounted(){     
      console.log('RUTA_SERVIDOR')
      console.log(RUTA_SERVIDOR)
      
    
      let vueHome = this;
      let slider = this;
      let social = this;
      let secciones = this;
      
      axios.get(RUTA_SERVIDOR+'/inicio-home') 
      .then(function (response){
        vueHome.dataInicio = response.data;
        slider.dataSlider = response.data.Rotador[0].slider;
        social.dataSocial = response.data.header;
        secciones.dataSeccion = response.data.categorias;
        //console.log(vueHome.dataInicio);  
       // console.log(slider.dataInicio.Rotador[0].slider);  
        //console.log(secciones.dataSeccion); 
         console.log('redes sociales'); 
           console.log(social.dataSocial); 
        // console.log(vueHome.dataInicio.imagen_inicio[0].url );  
      })
    },
    
    
}
</script>

<style lang="less">
   @import '~@/scss/inicio.less';  

@media (min-width: 768px) and (max-width: 991px){
    #fondoinicio div#slierscontent h2.titulsliersld {    
      font-size: 43px;    
    }
    #fondoinicio div#slierscontent h2.subtitulosld {    
      font-size: 30px;
      line-height: 1;
    }
  
    #fondoinicio .imgfondo {      
       height: 386px;
    }
    .carousel-inner .video video {
         width: 100% !important;
      }


      #fondoinicio div.category .posisicion {
        margin-top: 62px;
          flex: 100% !important;
        max-width: 100%!important;
        position: relative !important;
    }
    #fondoinicio div.category h2.subtitulosec {   
     font-size: 50px;        
    }

     #fondoinicio .video {
      height: auto;
      position: relative;
  }
  #fondoinicio div.category .botonseccion {    
        font-size: 16px;
    }
   
}

@media (min-width: 576px) and (max-width: 767px){
    #fondoinicio div#slierscontent h2.titulsliersld {    
      font-size: 55px;
      margin-top: 35px;  
    }
    #fondoinicio div#slierscontent h2.subtitulosld {    
      font-size: 30px;
      line-height: 1;
    }
  
  #fondoinicio div#slierscontent p.subtitulosld {       
        display: none;
    }
    #fondoinicio .imgfondo {      
       height: 288px;
    }
    .carousel-inner .video video {
         width: 100% !important;
      }


      #fondoinicio div.category .posisicion {
        margin-top: 62px;
        flex: 100% !important;
        max-width: 100%!important;
        position: relative !important;
    }
    #fondoinicio div.category h2.subtitulosec {   
     font-size: 38px;        
    }

    .owl-theme .owl-nav.disabled + .owl-dots {
        margin-top: auto;
        position: relative;
            top: 23px;

    }

     #fondoinicio .video {
      height: auto;
      position: relative;
  }
  #fondoinicio div.category .botonseccion {    
        font-size: 16px;
    }

    #fondoinicio div.category .botonseccion {    
        font-size: 14px;
    }
}

@media (min-width: 480px) and (max-width: 575px){
  #fondoinicio div#slierscontent h2.titulsliersld {    
      font-size: 44px;
      margin-top: 35px;
      letter-spacing: 7px;
    }
    #fondoinicio div#slierscontent h2.subtitulosld {    
      font-size: 24px;
      line-height: 1;
    }
  
  #fondoinicio div#slierscontent p.subtitulosld {       
        display: none;
    }
    #fondoinicio .imgfondo {      
       height: 253px;
    }
    .carousel-inner .video video {
         width: 100% !important;
      }


      #fondoinicio div.category .posisicion {
        margin-top: 62px;
        flex: 100% !important;
        max-width: 100%!important;
        position: relative !important;
    }
    #fondoinicio div.category h2.subtitulosec {   
     font-size: 38px;        
    }

    .owl-theme .owl-nav.disabled + .owl-dots {
        margin-top: auto;
        position: relative;
            top: 23px;

    }

     #fondoinicio .video {
      height: auto;
      position: relative;
  }
   #fondoinicio div.category .botonseccion {    
        font-size: 14px;
    }

}

@media (min-width: 320px) and (max-width: 479px){
  #fondoinicio div#slierscontent h2.titulsliersld {    
      font-size: 42px;
      margin-top: 35px;
      letter-spacing: 7px;
    }
    #fondoinicio div#slierscontent h2.subtitulosld {    
      font-size: 21px;
      line-height: 1;
    }
  
  #fondoinicio div#slierscontent p.subtitulosld {       
        display: none;
    }
    #fondoinicio .imgfondo {      
       height: 253px;
    }
    .carousel-inner .video video {
         width: 100% !important;
      }


      #fondoinicio div.category .posisicion {
        margin-top: 62px;
        flex: 100% !important;
        max-width: 100%!important;
        position: relative !important;
    }
    #fondoinicio div.category h2.subtitulosec {   
     font-size: 38px;        
    }

    .owl-theme .owl-nav.disabled + .owl-dots {
        margin-top: auto;
        position: relative;
        top: -20px;
    }

   #fondoinicio .video {
      height: auto;
      position: relative;
  }
   #fondoinicio div.category .botonseccion {    
        font-size: 14px;
    }
}

</style>

