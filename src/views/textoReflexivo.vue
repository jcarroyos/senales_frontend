<template>
    <div>
      <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/galeria">galeria</router-link>|
      <router-link to="/mapa">Mapa</router-link>|
      <router-link to="/texto-reflexivo">Texto reflexivo</router-link>
    </div>
            <div class="section">

               <div class="container category" id="">
                <div  class="row">           
                   <div class="col-xs-12 col-sm-8 col-md-8 html">    
                        <h2 class="titulosec">{{dataSeccion.titulo}}</h2>
                        <div v-html="dataSeccion.cuerpo"></div>
                    </div>     
                </div>
             
             </div>
            </div>
        <router-view/>  
    </div>
</template>

<script>


import axios from 'axios'
export const RUTA_SERVIDOR = process.env.VUE_APP_RUTA_API;



export default {
  name: 'texto',
  components: { 

  },
 

   data() {   
      return {
        urlservior:RUTA_SERVIDOR,
        loading: false,
        tag: '',
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

      let secciones = this;
      
      axios.get(RUTA_SERVIDOR+'/texto-reflexivo') 
      .then(function (response){
        secciones.dataSeccion = response.data;
           console.log(secciones.dataSeccion); 
      })
    },
    
    
}
</script>

<style lang="less">
.html{
    text-align: left;
}
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

